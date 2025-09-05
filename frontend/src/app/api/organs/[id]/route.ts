// app/api/organs/[id]/route.ts
import { NextRequest } from 'next/server'
import { verifyAuth, createErrorResponse, createSuccessResponse } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const organUpdateSchema = z.object({
  status: z.enum(['available', 'in_transit', 'transplanted']).optional(),
  current_location: z.string().optional(),
  transport_arrangements: z.string().optional()
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request)
    const organId = parseInt(params.id)
    
    const organ = await prisma.organs.findUnique({
      where: { id: organId },
      include: {
        hospitals: true,
        matches: {
          include: {
            patients: true,
            users: {
              select: { email: true, role: true }
            }
          }
        }
      }
    })

    if (!organ) {
      return createErrorResponse('Organ not found', 404)
    }

    // Check access permissions
    if (user.role !== 'admin' && organ.hospital_id !== user.hospital_id) {
      return createErrorResponse('Access denied', 403)
    }

    return createSuccessResponse(organ)
  } catch (error) {
    return createErrorResponse(error.message)
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request)
    const organId = parseInt(params.id)
    const body = await request.json()
    
    const validatedData = organUpdateSchema.parse(body)
    
    const existingOrgan = await prisma.organs.findUnique({
      where: { id: organId }
    })

    if (!existingOrgan) {
      return createErrorResponse('Organ not found', 404)
    }

    if (user.role !== 'admin' && existingOrgan.hospital_id !== user.hospital_id) {
      return createErrorResponse('Access denied', 403)
    }

    const updatedOrgan = await prisma.organs.update({
      where: { id: organId },
      data: validatedData,
      include: {
        hospitals: {
          select: { name: true, location: true }
        }
      }
    })

    return createSuccessResponse(updatedOrgan, 'Organ updated successfully')
  } catch (error) {
    return createErrorResponse(error.message)
  }
}
