// app/api/auth/login/route.js
import { loginUser } from '../../../../controllers/authController';

export async function POST(request) {
  try {
    console.log('=== API LOGIN START ===');
    
    const body = await request.json();
    console.log('Request body received:', body);
    
    const { identifier, password } = body;
    
    // Validate input
    if (!identifier || !password) {
      console.log('❌ Missing identifier or password');
      return Response.json(
        { message: 'Identifier and password are required' }, 
        { status: 400 }
      );
    }
    
    console.log('Calling loginUser with:', { identifier, passwordLength: password.length });
    
    const result = await loginUser({ identifier, password });
    
    console.log('✅ Login successful:', result);
    console.log('=== API LOGIN END ===');
    
    return Response.json(result);
    
  } catch (error) {
    console.error('❌ Login API error:', error.message);
    console.error('Error stack:', error.stack);
    console.log('=== API LOGIN END (ERROR) ===');
    
    return Response.json(
      { message: error.message || 'Login failed' }, 
      { status: 400 }
    );
  }
}