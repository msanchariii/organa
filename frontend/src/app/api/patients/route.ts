// app/api/patients/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth, createErrorResponse, createSuccessResponse } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const patientCreateSchema = z.object({
  name: z.string().min(1),
  hospital_id: z.number(),
  blood_type: z.string(),
  organ_needed: z.string(),
  priority_status: z.number().min(0).max(10),
  location: z.string(),
  zip_code: z.number(),
  medical_history: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: z.string(),
  weight_in_kg: z.number().optional(),
  height_in_cm: z.number().optional(),
  email: z.string().email(),
  phone_number: z.string(),
  primary_diagnosis: z.string(),
  hla_test: z.object({
    hlaA: z.string().optional(),
    hlaB: z.string().optional(),
    hlaC: z.string().optional(),
    hlaDRB1: z.string().optional(),
    hlaDQB1: z.string().optional()
  }).optional(),
  pra_score: z.number().optional(),
  previous_transplant: z.number().default(0),
  comorbidities: z.string().optional(),
  current_medications: z.string().optional(),
  treating_in_hospital: z.string().optional(),
  insurance_details: z.string().optional()
})

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    
    const { searchParams } = new URL(request.url)
    const hospitalId = searchParams.get('hospital_id')
    const status = searchParams.get('status')
    const organNeeded = searchParams.get('organ_needed')

    const whereClause: any = {}
    
    // Filter by hospital if user is not admin
    if (user.role !== 'admin') {
      whereClause.hospital_id = user.hospital_id
    } else if (hospitalId) {
      whereClause.hospital_id = parseInt(hospitalId)
    }

    if (status) whereClause.status = status
    if (organNeeded) whereClause.organ_needed = organNeeded

    const patients = await prisma.patients.findMany({
      where: whereClause,
      include: {
        hospitals: {
          select: {
            name: true,
            location: true
          }
        }
      },
      orderBy: [
        { priority_status: 'desc' },
        { created_at: 'asc' }
      ]
    })

    return createSuccessResponse(patients)
  } catch (error) {
    return createErrorResponse(error.message)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    const body = await request.json()
    
    const validatedData = patientCreateSchema.parse(body)
    
    // Ensure user can only create patients for their hospital (unless admin)
    if (user.role !== 'admin' && validatedData.hospital_id !== user.hospital_id) {
      return createErrorResponse('Cannot create patient for different hospital', 403)
    }

    const patient = await prisma.patients.create({
      data: {
        ...validatedData,
        date_of_birth: validatedData.date_of_birth ? new Date(validatedData.date_of_birth) : null,
        status: 'waiting'
      },
      include: {
        hospitals: {
          select: {
            name: true,
            location: true
          }
        }
      }
    })

    return createSuccessResponse(patient, 'Patient created successfully')
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
