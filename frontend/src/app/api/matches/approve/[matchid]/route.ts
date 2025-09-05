// app/api/matches/approve/[matchId]/route.ts
import { NextRequest } from 'next/server'
import { verifyAuth, createErrorResponse, createSuccessResponse } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { matchId: string } }
) {
  try {
    const user = await verifyAuth(request)
    const matchId = parseInt(params.matchId)
    
    // This logic can be moved here from the PATCH endpoint in route.ts
    const result = await prisma.$transaction(async (tx) => {
      const existingMatch = await tx.matches.findUnique({
        where: { id: matchId },
        include: {
          organs: { include: { hospitals: true } },
          patients: { include: { hospitals: true } }
        }
      })

      if (!existingMatch) {
        throw new Error('Match not found')
      }

      // Check access permissions
      const hasAccess = user.role === 'admin' || 
        existingMatch.organs?.hospital_id === user.hospital_id ||
        existingMatch.patients?.hospital_id === user.hospital_id

      if (!hasAccess) {
        throw new Error('Access denied')
      }

      // Update match status
      const updatedMatch = await tx.matches.update({
        where: { id: matchId },
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
          id: { not: matchId }
        },
        data: { status: 'rejected' }
      })

      return { updatedMatch, existingMatch }
    })

    return createSuccessResponse(result.updatedMatch, 'Match approved successfully')
  } catch (error) {
    return createErrorResponse(error.message)
  }
}
