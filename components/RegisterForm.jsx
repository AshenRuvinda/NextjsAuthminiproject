'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { registerSchema } from '../lib/validation';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    termsAccepted: false,
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setErrors({ ...errors, [name]: '' });
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, error } = registerSchema.safeParse(formData);

    if (!success) {
      const fieldErrors = {};
      error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setServerError(data.message);
        return;
      }

      router.push('/auth/login');
    } catch (err) {
      setServerError('Something went wrong');
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
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
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
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
      />
      <FormInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <FormInput
        label="Date of Birth"
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        error={errors.dateOfBirth}
      />
      <div className="mb-4">
        <motion.label
          className="block text-sm font-medium text-gray-300"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Gender
        </motion.label>
        <motion.select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className={`mt-1 w-full p-3 bg-gray-800 text-white border ${
            errors.gender ? 'border-red-500' : 'border-gray-600'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </motion.select>
        {errors.gender && (
          <motion.p
            className="text-red-500 text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {errors.gender}
          </motion.p>
        )}
      </div>
      <div className="mb-4">
        <motion.label
          className="flex items-center text-sm font-medium text-gray-300"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="mr-2"
          />
          I agree to the Terms and Conditions
        </motion.label>
        {errors.termsAccepted && (
          <motion.p
            className="text-red-500 text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {errors.termsAccepted}
          </motion.p>
        )}
      </div>
      <FormInput
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      <FormInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />
      <FormButton label="Register" />
      <p className="text-gray-400 text-center mt-4">
        Already have an account?{' '}
        <a href="/auth/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </motion.form>
  );
}