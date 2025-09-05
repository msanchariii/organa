// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  hospital_id: z.number(),
  staff_id: z.string(),
  role: z.enum(['staff', 'admin'])
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = registerSchema.parse(body)
    const { email, password, hospital_id, staff_id, role } = validatedData
    
    // Check if user already exists
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { email },
          { 
            AND: [
              { hospital_id },
              { staff_id }
            ]
          }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or staff ID already exists', success: false },
        { status: 400 }
      )
    }

    // Verify hospital exists
    const hospital = await prisma.hospitals.findUnique({
      where: { id: hospital_id }
    })

    if (!hospital) {
      return NextResponse.json(
        { error: 'Hospital not found', success: false },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Create user
    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        hospital_id,
        staff_id,
        role
      },
      select: {
        id: true,
        email: true,
        role: true,
        staff_id: true,
        hospitals: {
          select: {
            name: true,
            location: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        staff_id: user.staff_id,
        hospital: user.hospitals?.name
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors, success: false },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    )
  }
}
