import mongoose from 'mongoose';

  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    termsAccepted: { type: Boolean, required: true },
  });

  export default mongoose.models.User || mongoose.model('User', userSchema);