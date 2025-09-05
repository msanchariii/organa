// app/api/matches/organ/[organId]/route.ts
import { NextRequest } from 'next/server'
import { verifyAuth, createErrorResponse, createSuccessResponse } from '@/lib/auth'
import { MatchingService } from '@/lib/matching'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { organId: string } }
) {
  try {
    const user = await verifyAuth(request)
    const organId = parseInt(params.organId)
    
    // Verify organ exists and user has access
    const organ = await prisma.organs.findUnique({
      where: { id: organId },
      include: { hospitals: true }
    })

    if (!organ) {
      return createErrorResponse('Organ not found', 404)
    }

    // Check access permissions
    if (user.role !== 'admin' && organ.hospital_id !== user.hospital_id) {
      return createErrorResponse('Access denied', 403)
    }

    // Find matches using your enhanced matching service
    const matches = await MatchingService.findMatches(organId)

    return createSuccessResponse({
      organ_id: organId,
      organ_type: organ.organ_type,
      donor_blood_type: organ.donor_blood_type,
      organ_hospital: organ.hospitals?.name,
      total_matches: matches.length,
      matches: matches.map(match => ({
        patient_id: match.patient.id,
        patient_name: match.patient.name,
        compatibility_score: match.score,
        compatibility_percentage: Math.round(match.score * 100),
        priority_status: match.patient.priority_status,
        blood_type: match.patient.blood_type,
        hospital: match.patient.hospitals?.name,
        waiting_days: Math.floor(
          (new Date().getTime() - new Date(match.patient.created_at).getTime()) / (1000 * 60 * 60 * 24)
        ),
        compatibility_factors: match.compatibility_factors,
        urgency: match.patient.priority_status >= 7 ? 'High' : 
                match.patient.priority_status >= 4 ? 'Medium' : 'Low'
      }))
    })
  } catch (error) {
    return createErrorResponse(error.message)
  }
}
