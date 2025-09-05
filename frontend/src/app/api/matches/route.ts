// app/api/matches/route.ts - Enhanced version
import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth, createErrorResponse, createSuccessResponse } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const matchUpdateSchema = z.object({
  id: z.number(),
  status: z.enum(['pending', 'approved', 'rejected', 'expired'])
})

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'pending'
    const hospitalId = searchParams.get('hospital_id')
    const organType = searchParams.get('organ_type')

    // Build where clause
    const whereClause: any = { status }
    
    // Filter by hospital access
    if (user.role !== 'admin') {
      whereClause.OR = [
        { organs: { hospital_id: user.hospital_id } },
        { patients: { hospital_id: user.hospital_id } }
      ]
    } else if (hospitalId) {
      whereClause.OR = [
        { organs: { hospital_id: parseInt(hospitalId) } },
        { patients: { hospital_id: parseInt(hospitalId) } }
      ]
    }

    // Filter by organ type if specified
    if (organType) {
      whereClause.organs = { 
        ...whereClause.organs,
        organ_type: organType 
      }
    }

    const matches = await prisma.matches.findMany({
      where: whereClause,
      include: {
        organs: {
          include: {
            hospitals: {
              select: { name: true, location: true }
            }
          }
        },
        patients: {
          include: {
            hospitals: {
              select: { name: true, location: true }
            }
          }
        },
        users: {
          select: {
            id: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: [
        { match_score: 'desc' },
        { created_at: 'desc' }
      ]
    })

    // Calculate additional metrics
    const matchesWithMetrics = matches.map(match => ({
      ...match,
      compatibility_percentage: Math.round((match.match_score || 0) * 100 / 100),
      waiting_days: match.patients?.created_at 
        ? Math.floor((new Date().getTime() - new Date(match.patients.created_at).getTime()) / (1000 * 60 * 60 * 24))
        : 0,
      time_sensitive: match.organs?.expected_preservation_time 
        ? match.organs.expected_preservation_time < 12 
        : false
    }))

    return createSuccessResponse({
      matches: matchesWithMetrics,
      total: matches.length,
      summary: {
        pending: matches.filter(m => m.status === 'pending').length,
        approved: matches.filter(m => m.status === 'approved').length,
        high_priority: matches.filter(m => m.patients && m.patients.priority_status >= 7).length,
        time_sensitive: matchesWithMetrics.filter(m => m.time_sensitive).length
      }
    })

  } catch (error: any) {
    console.error('Get matches error:', error)
    return createErrorResponse(error.message)
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    const body = await request.json()
    
    const validatedData = matchUpdateSchema.parse(body)
    const { id, status } = validatedData

    // Check if match exists and user has access
    const existingMatch = await prisma.matches.findUnique({
      where: { id },
      include: {
        organs: { include: { hospitals: true } },
        patients: { include: { hospitals: true } }
      }
    })

    if (!existingMatch) {
      return createErrorResponse('Match not found', 404)
    }

    // Check access permissions
    const hasAccess = user.role === 'admin' || 
      existingMatch.organs?.hospital_id === user.hospital_id ||
      existingMatch.patients?.hospital_id === user.hospital_id

    if (!hasAccess) {
      return createErrorResponse('Access denied', 403)
    }

    // Handle different status updates
    if (status === 'approved') {
      // Use transaction to ensure data consistency
      const result = await prisma.$transaction(async (tx) => {
        // Update match status
        const updatedMatch = await tx.matches.update({
          where: { id },
          data: {
            status: 'approved',
            matched_by: user.id
          }
        })

        // Update organ status
        if (existingMatch.organ_id) {
          await tx.organs.update({
            where: { id: existingMatch.organ_id },
            data: { status: 'matched' }
          })
        }

        // Update patient status
        if (existingMatch.patient_id) {
          await tx.patients.update({
            where: { id: existingMatch.patient_id },
            data: { status: 'matched' }
          })
        }

        // Reject other pending matches for the same organ
        await tx.matches.updateMany({
          where: {
            organ_id: existingMatch.organ_id,
            status: 'pending',
            id: { not: id }
          },
          data: { status: 'rejected' }
        })

        return updatedMatch
      })

      // TODO: Send real-time notifications (Phase 4)
      console.log(`Match ${id} approved by user ${user.id}`)

      return createSuccessResponse(result, 'Match approved successfully')

    } else {
      // Simple status update for other cases
      const updatedMatch = await prisma.matches.update({
        where: { id },
        data: { 
          status,
          matched_by: status === 'rejected' ? user.id : undefined
        },
        include: {
          organs: true,
          patients: true,
          users: {
            select: { email: true, role: true }
          }
        }
      })

      return createSuccessResponse(updatedMatch, `Match ${status} successfully`)
    }

  } catch (error: any) {
    console.error('Update match error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors, success: false },
        { status: 400 }
      )
    }

    return createErrorResponse(error.message)
  }
}

// New POST endpoint for manual match creation
export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    const body = await request.json()
    
    const { organ_id, patient_id } = body

    if (!organ_id || !patient_id) {
      return createErrorResponse('organ_id and patient_id are required', 400)
    }

    // Verify organ and patient exist and calculate score
    const organ = await prisma.organs.findUnique({ where: { id: organ_id } })
    const patient = await prisma.patients.findUnique({ where: { id: patient_id } })

    if (!organ || !patient) {
      return createErrorResponse('Organ or patient not found', 404)
    }

    // Check access permissions
    const hasAccess = user.role === 'admin' || 
      organ.hospital_id === user.hospital_id ||
      patient.hospital_id === user.hospital_id

    if (!hasAccess) {
      return createErrorResponse('Access denied', 403)
    }

    // Calculate compatibility score (reuse logic from matching service)
    const { MatchingService } = await import('@/lib/matching')
    const score = await MatchingService.calculateMatchScore(organ_id, patient_id)

    // Create manual match
    const newMatch = await prisma.matches.create({
      data: {
        organ_id,
        patient_id,
        match_score: score,
        status: 'pending',
        matched_by: user.id
      },
      include: {
        organs: true,
        patients: true,
        users: {
          select: { email: true, role: true }
        }
      }
    })

    return createSuccessResponse(newMatch, 'Manual match created successfully')

  } catch (error: any) {
    console.error('Create match error:', error)
    return createErrorResponse(error.message)
  }
}
