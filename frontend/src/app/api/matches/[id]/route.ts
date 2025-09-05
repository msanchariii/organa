// app/api/matches/[id]/route.ts
import { NextRequest } from 'next/server'
import { verifyAuth, createErrorResponse, createSuccessResponse } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request)
    const matchId = parseInt(params.id)
    
    const match = await prisma.matches.findUnique({
      where: { id: matchId },
      include: {
        organs: {
          include: {
            hospitals: true
          }
        },
        patients: {
          include: {
            hospitals: true
          }
        },
        users: {
          select: {
            id: true,
            email: true,
            role: true,
            staff_id: true
          }
        }
      }
    })

    if (!match) {
      return createErrorResponse('Match not found', 404)
    }

    // Check access permissions
    const hasAccess = user.role === 'admin' || 
      match.organs?.hospital_id === user.hospital_id ||
      match.patients?.hospital_id === user.hospital_id

    if (!hasAccess) {
      return createErrorResponse('Access denied', 403)
    }

    // Add computed fields
    const enrichedMatch = {
      ...match,
      compatibility_percentage: Math.round((match.match_score || 0)),
      waiting_time_days: match.patients?.created_at 
        ? Math.floor((new Date().getTime() - new Date(match.patients.created_at).getTime()) / (1000 * 60 * 60 * 24))
        : 0,
      urgency_level: match.patients?.priority_status >= 8 ? 'Critical' : 
                     match.patients?.priority_status >= 6 ? 'High' :
                     match.patients?.priority_status >= 4 ? 'Medium' : 'Low',
      time_remaining: match.organs?.expected_preservation_time 
        ? `${match.organs.expected_preservation_time} hours`
        : 'N/A'
    }

    return createSuccessResponse(enrichedMatch)
  } catch (error) {
    return createErrorResponse(error.message)
  }
}
