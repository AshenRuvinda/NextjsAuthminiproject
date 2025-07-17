import dbConnect from '../lib/mongodb';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';

export const registerUser = async (userData) => {
  await dbConnect();
  console.log('=== REGISTER USER START ===');
  console.log('Original userData:', userData);
  
  const { username, email, password, dateOfBirth, gender, termsAccepted } = userData;

  // Normalize data before checking
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();
  
  console.log('Normalized username:', normalizedUsername);
  console.log('Normalized email:', normalizedEmail);

  const existingUser = await User.findOne({ 
    $or: [
      { email: normalizedEmail }, 
      { username: normalizedUsername }
    ] 
  });
  
  if (existingUser) {
    console.log('Existing user found:', existingUser);
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Password hashed successfully');
  
  const user = new User({
    username: normalizedUsername,
    email: normalizedEmail,
    password: hashedPassword,
    dateOfBirth,
    gender,
    termsAccepted,
  });

  await user.save();
  console.log('User saved successfully:', {
    id: user._id,
    username: user.username,
    email: user.email
  });
  console.log('=== REGISTER USER END ===');
  
  return { message: 'User registered successfully' };
};

export const loginUser = async ({ identifier, password }) => {
  await dbConnect();
  console.log('=== LOGIN USER START ===');
  console.log('Raw identifier received:', JSON.stringify(identifier));
  console.log('Raw password length:', password ? password.length : 0);
  
  // Normalize identifier
  const normalizedIdentifier = identifier.trim().toLowerCase();
  console.log('Normalized identifier:', JSON.stringify(normalizedIdentifier));
  
  // Build query
  const query = {
    $or: [
      { email: normalizedIdentifier }, 
      { username: normalizedIdentifier }
    ]
  };
  console.log('Database query:', JSON.stringify(query, null, 2));
  
  // First, let's see what users exist in the database
  console.log('=== CHECKING ALL USERS ===');
  const allUsers = await User.find({}, 'username email');
  console.log('Total users in database:', allUsers.length);
  allUsers.forEach((user, index) => {
    console.log(`User ${index + 1}:`, {
      id: user._id,
      username: JSON.stringify(user.username),
      email: JSON.stringify(user.email)
    });
  });
  console.log('=== END ALL USERS ===');
  
  // Now search for the specific user
  console.log('=== SEARCHING FOR USER ===');
  const user = await User.findOne(query);
  console.log('User found:', user ? {
    id: user._id,
    username: JSON.stringify(user.username),
    email: JSON.stringify(user.email),
    hasPassword: !!user.password
  } : null);

  if (!user) {
    console.log('❌ User not found in database');
    
    // Let's try individual searches to see which field might be the issue
    console.log('=== INDIVIDUAL SEARCHES ===');
    const userByEmail = await User.findOne({ email: normalizedIdentifier });
    const userByUsername = await User.findOne({ username: normalizedIdentifier });
    
    console.log('Search by email result:', userByEmail ? 'FOUND' : 'NOT FOUND');
    console.log('Search by username result:', userByUsername ? 'FOUND' : 'NOT FOUND');
    
    // Check if any users have similar usernames/emails
    console.log('=== FUZZY SEARCH ===');
    const fuzzyUsers = await User.find({
      $or: [
        { email: { $regex: normalizedIdentifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' } },
        { username: { $regex: normalizedIdentifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' } }
      ]
    }, 'username email');
    console.log('Fuzzy search results:', fuzzyUsers.length);
    fuzzyUsers.forEach(u => console.log('Fuzzy match:', { username: u.username, email: u.email }));
    
    throw new Error('Invalid credentials');
  }

  console.log('✅ User found, checking password...');
  
  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  console.log('Password match result:', isMatch);
  
  if (!isMatch) {
    console.log('❌ Password mismatch');
    // Let's verify the password comparison
    console.log('Provided password length:', password.length);
    console.log('Stored hash length:', user.password.length);
    console.log('Hash starts with:', user.password.substring(0, 10) + '...');
    
    // Test with a simple password hash comparison
    const testHash = await bcrypt.hash(password, 10);
    console.log('Test hash created successfully');
    const testMatch = await bcrypt.compare(password, testHash);
    console.log('Test password comparison works:', testMatch);
    
    throw new Error('Invalid credentials');
  }

  console.log('✅ Login successful');
  console.log('=== LOGIN USER END ===');
  
  return { 
    message: 'Login successful', 
    user: { 
      id: user._id, 
      username: user.username, 
      email: user.email 
    } 
  };
};