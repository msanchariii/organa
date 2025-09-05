// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Since JWT is stateless, logout is handled client-side
  // You could implement token blacklisting here if needed
  return NextResponse.json({
    success: true,
    message: 'Logout successful'
  })
}
