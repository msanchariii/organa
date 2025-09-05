// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth, createErrorResponse, createSuccessResponse } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    
    // Get full user details
    const fullUser = await prisma.users.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        role: true,
        staff_id: true,
        created_at: true,
        hospitals: {
          select: {
            id: true,
            name: true,
            location: true,
            contact_email: true,
            contact_phone: true
          }
        }
      }
    })

    return createSuccessResponse(fullUser)
  } catch (error) {
    return createErrorResponse(error.message)
  }
}
