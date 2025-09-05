// app/api/hospitals/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth, createErrorResponse, createSuccessResponse } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const hospitalCreateSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  contact_email: z.string().email(),
  contact_phone: z.string().min(10)
})

export async function GET(request: NextRequest) {
  try {
    await verifyAuth(request)
    
    const hospitals = await prisma.hospitals.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        contact_email: true,
        contact_phone: true,
        _count: {
          select: {
            users: true,
            patients: true,
            organs: true
          }
        }
      }
    })

    return createSuccessResponse(hospitals)
  } catch (error) {
    return createErrorResponse(error.message)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    
    // Only admin users can create hospitals
    if (user.role !== 'admin') {
      return createErrorResponse('Only admin users can create hospitals', 403)
    }

    const body = await request.json()
    const validatedData = hospitalCreateSchema.parse(body)
    
    const hospital = await prisma.hospitals.create({
      data: validatedData
    })

    return createSuccessResponse(hospital, 'Hospital created successfully')
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
