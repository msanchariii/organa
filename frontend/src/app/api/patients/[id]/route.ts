// app/api/patients/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth, createErrorResponse, createSuccessResponse } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const patientUpdateSchema = z.object({
  priority_status: z.number().min(0).max(10).optional(),
  status: z.enum(['waiting', 'matched', 'transplanted', 'deceased']).optional(),
  medical_history: z.string().optional(),
  current_medications: z.string().optional(),
  comorbidities: z.string().optional()
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request)
    const patientId = parseInt(params.id)
    
    const patient = await prisma.patients.findUnique({
      where: { id: patientId },
      include: {
        hospitals: true,
        matches: {
          include: {
            organs: true,
            users: {
              select: { email: true, role: true }
            }
          }
        }
      }
    })

    if (!patient) {
      return createErrorResponse('Patient not found', 404)
    }

    // Check access permissions
    if (user.role !== 'admin' && patient.hospital_id !== user.hospital_id) {
      return createErrorResponse('Access denied', 403)
    }

    return createSuccessResponse(patient)
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
    const patientId = parseInt(params.id)
    const body = await request.json()
    
    const validatedData = patientUpdateSchema.parse(body)
    
    // Check if patient exists and user has access
    const existingPatient = await prisma.patients.findUnique({
      where: { id: patientId }
    })

    if (!existingPatient) {
      return createErrorResponse('Patient not found', 404)
    }

    if (user.role !== 'admin' && existingPatient.hospital_id !== user.hospital_id) {
      return createErrorResponse('Access denied', 403)
    }

    const updatedPatient = await prisma.patients.update({
      where: { id: patientId },
      data: validatedData,
      include: {
        hospitals: {
          select: { name: true, location: true }
        }
      }
    })

    return createSuccessResponse(updatedPatient, 'Patient updated successfully')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors, success: false },
        { status: 400 }
      )
    }
    return createErrorResponse(error.message)
  }
}
