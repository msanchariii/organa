// lib/auth.ts
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

export interface AuthenticatedUser {
  id: number
  email: string | null
  role: string | null
  hospital_id: number | null
  staff_id: string | null
}

export async function verifyAuth(request: NextRequest): Promise<AuthenticatedUser> {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No valid authorization token provided')
  }

  const token = authHeader.replace('Bearer ', '')
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    
    const user = await prisma.users.findUnique({
      where: { id: decoded.user_id },
      select: {
        id: true,
        email: true,
        role: true,
        hospital_id: true,
        staff_id: true
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token')
    }
    throw error
  }
}

export function createErrorResponse(message: string, status: number = 401) {
  return Response.json({ error: message, success: false }, { status })
}

export function createSuccessResponse(data: any, message?: string) {
  return Response.json({ 
    success: true, 
    data,
    ...(message && { message })
  })
}
