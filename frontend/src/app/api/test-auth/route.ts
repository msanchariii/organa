// app/api/test-auth/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: 'Auth setup working!',
      timestamp: new Date().toISOString(),
      env_check: {
        jwt_secret: !!process.env.JWT_SECRET,
        database_url: !!process.env.DATABASE_URL,
        gemini_api: !!process.env.GEMINI_API_KEY
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Setup test failed', success: false },
      { status: 500 }
    )
  }
}
