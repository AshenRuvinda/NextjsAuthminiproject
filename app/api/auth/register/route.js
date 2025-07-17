import { registerUser } from '../../../../controllers/authController';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Register API received:', body);
    const result = await registerUser(body);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Register API error:', error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}