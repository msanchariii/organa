// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const loginSchema = z.object({
  hospital_id: z.number(),
  staff_id: z.string(),
  password: z.string().min(1)
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = loginSchema.parse(body)
    const { hospital_id, staff_id, password } = validatedData
    
    // Find user with hospital_id and staff_id
    const user = await prisma.users.findFirst({
      where: {
        hospital_id,
        staff_id
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

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid hospital ID or staff ID', success: false },
        { status: 403 }
      )
    }

    // Verify password
    if (!user.password || !await bcrypt.compare(password, user.password)) {
      return NextResponse.json(
        { error: 'Invalid password', success: false },
        { status: 403 }
      )
    }

    // Create JWT token
    const tokenPayload = {
      user_id: user.id,
      role: user.role,
      hospital_id: user.hospital_id
    }

    const accessToken = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET!,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_MINUTES || '1440m' }
    )

    return NextResponse.json({
      success: true,
      access_token: accessToken,
      token_type: 'bearer',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        hospital: user.hospitals?.name,
        location: user.hospitals?.location
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    
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
