'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { loginSchema } from '../lib/validation';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Trim the form data before validation and submission
    const trimmedData = {
      identifier: formData.identifier.trim(),
      password: formData.password.trim(),
    };

    const { success, error } = loginSchema.safeParse(trimmedData);

    if (!success) {
      const fieldErrors = {};
      error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmedData), // Use trimmed data
      });

      const data = await res.json();
      if (!res.ok) {
        setServerError(data.message);
        return;
      }

      // Optional: Store user data in localStorage or context
      // localStorage.setItem('user', JSON.stringify(data.user));
      
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setServerError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
      {serverError && (
        <motion.p
          className="text-red-500 text-sm mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {serverError}
        </motion.p>
      )}
      <FormInput
        label="Username or Email"
        type="text"
        name="identifier"
        value={formData.identifier}
        onChange={handleChange}
        error={errors.identifier}
        disabled={isLoading}
      />
      <FormInput
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        disabled={isLoading}
      />
      <FormButton label={isLoading ? "Logging in..." : "Login"} disabled={isLoading} />
      <p className="text-gray-400 text-center mt-4">
        Don't have an account?{' '}
        <a href="/auth/register" className="text-blue-500 hover:underline">
          Register
        </a>
      </p>
    </motion.form>
  );
}