'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
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
      setServerError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      style={{
        position: 'relative',
        margin: 'auto',
        width: '100%',
        maxWidth: '24rem', // Slimmer container for focused design
        minHeight: 'auto',
        background: '#FFFDF9', // Warmer cream background
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1), 0 0 8px rgba(107, 45, 135, 0.2)',
        border: '2px solid #E67E22', // Vibrant orange border
        overflow: 'hidden',
        padding: '1.5rem',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      role="region"
      aria-labelledby="register-title"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(107, 45, 135, 0.1), rgba(244, 208, 63, 0.1)), url("data:image/svg+xml,%3Csvg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h30v30H0z\" fill=\"none\"/%3E%3Ccircle cx=\"15\" cy=\"15\" r=\"2\" fill=\"%23E67E22\" fill-opacity=\"0.15\"/%3E%3Cpath d=\"M10 20l5-5 5 5\" stroke=\"%236B2D87\" stroke-opacity=\"0.2\" stroke-width=\"1.2\"/%3E%3C/svg%3E")',
          borderRadius: '12px',
          opacity: 0.85,
        }}
      />
      <form
        onSubmit={handleSubmit}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          padding: '1.25rem',
        }}
        noValidate
      >
        <motion.div
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #6B2D87, #F4D03F)', // Deep purple to soft gold
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(107, 45, 135, 0.25)',
              margin: '0 auto',
              border: '2px solid #E67E22',
            }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            whileHover={{ scale: 1.05 }}
            role="img"
            aria-label="Registration icon"
          >
            <svg
              style={{ width: '20px', height: '20px', stroke: '#1A2533' }}
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 6.05l-1.414-1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>
          </motion.div>
          <h2
            id="register-title"
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#1A2533',
              background: 'linear-gradient(to right, #6B2D87, #F4D03F)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Sign Up
          </h2>
          <p style={{ color: '#1A2533', fontSize: '0.75rem', opacity: 0.7 }}>
            Join our community in a few simple steps
          </p>
        </motion.div>

        <AnimatePresence>
          {serverError && (
            <motion.div
              style={{
                background: 'rgba(231, 76, 60, 0.1)', // Muted coral for errors
                border: '1px solid #E74C3C',
                color: '#E74C3C',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              role="alert"
            >
              <svg
                style={{ width: '16px', height: '16px', stroke: '#E74C3C' }}
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p style={{ fontSize: '0.75rem', fontWeight: 500 }}>{serverError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          <FormInput
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            placeholder="Choose a username"
            required
            aria-required="true"
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: `1px solid ${errors.username ? '#E74C3C' : '#E67E22'}`,
              background: 'rgba(255, 253, 249, 0.9)',
              boxShadow: 'inset 0 0 4px rgba(107, 45, 135, 0.1)',
            }}
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter your email"
            required
            aria-required="true"
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: `1px solid ${errors.email ? '#E74C3C' : '#E67E22'}`,
              background: 'rgba(255, 253, 249, 0.9)',
              boxShadow: 'inset 0 0 4px rgba(107, 45, 135, 0.1)',
            }}
          />
          <FormInput
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            error={errors.dateOfBirth}
            required
            aria-required="true"
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: `1px solid ${errors.dateOfBirth ? '#E74C3C' : '#E67E22'}`,
              background: 'rgba(255, 253, 249, 0.9)',
              boxShadow: 'inset 0 0 4px rgba(107, 45, 135, 0.1)',
            }}
          />
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.label
              htmlFor="gender"
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#1A2533',
              }}
            >
              Gender
            </motion.label>
            <motion.select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={{
                padding: '0.75rem',
                background: 'rgba(255, 253, 249, 0.9)',
                border: `1px solid ${errors.gender ? '#E74C3C' : '#E67E22'}`,
                borderRadius: '8px',
                color: '#1A2533',
                fontSize: '0.875rem',
                boxShadow: 'inset 0 0 4px rgba(107, 45, 135, 0.1)',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onFocus={(e) => {
                e.target.style.borderColor = '#F4D03F';
                e.target.style.boxShadow = '0 0 6px rgba(244, 208, 63, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.gender ? '#E74C3C' : '#E67E22';
                e.target.style.boxShadow = 'inset 0 0 4px rgba(107, 45, 135, 0.1)';
              }}
              aria-invalid={!!errors.gender}
              aria-describedby={errors.gender ? 'gender-error' : undefined}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </motion.select>
            {errors.gender && (
              <motion.p
                style={{
                  color: '#E74C3C',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                id="gender-error"
              >
                {errors.gender}
              </motion.p>
            )}
          </motion.div>
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#6B2D87',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
              }}
              onFocus={(e) => (e.target.style.boxShadow = '0 0 6px rgba(107, 45, 135, 0.3)')}
              onBlur={(e) => (e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)')}
              aria-describedby={errors.termsAccepted ? 'termsAccepted-error' : undefined}
              required
            />
            <motion.label
              htmlFor="termsAccepted"
              style={{
                fontSize: '0.75rem',
                color: '#1A2533',
                cursor: 'pointer',
              }}
            >
              I agree to the{' '}
              <a
                href="/terms"
                style={{
                  color: '#6B2D87',
                  textDecoration: 'underline',
                  textDecorationColor: 'rgba(107, 45, 135, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#F4D03F';
                  e.target.style.textDecorationColor = 'rgba(244, 208, 63, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#6B2D87';
                  e.target.style.textDecorationColor = 'rgba(107, 45, 135, 0.4)';
                }}
              >
                Terms and Conditions
              </a>
            </motion.label>
            {errors.termsAccepted && (
              <motion.p
                style={{
                  color: '#E74C3C',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                  gridColumn: '1 / -1',
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                id="termsAccepted-error"
              >
                {errors.termsAccepted}
              </motion.p>
            )}
          </motion.div>
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Create a password"
            required
            aria-required="true"
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: `1px solid ${errors.password ? '#E74C3C' : '#E67E22'}`,
              background: 'rgba(255, 253, 249, 0.9)',
              boxShadow: 'inset 0 0 4px rgba(107, 45, 135, 0.1)',
            }}
          />
          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
            required
            aria-required="true"
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: `1px solid ${errors.confirmPassword ? '#E74C3C' : '#E67E22'}`,
              background: 'rgba(255, 253, 249, 0.9)',
              boxShadow: 'inset 0 0 4px rgba(107, 45, 135, 0.1)',
            }}
          />
        </motion.div>

        <motion.div
          style={{
            margin: '1.25rem 0',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              borderTop: '2px dashed #E67E22',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
          <span
            style={{
              background: '#FFFDF9',
              padding: '0 0.75rem',
              color: '#1A2533',
              fontSize: '0.75rem',
              fontWeight: 500,
              border: '1px solid #E67E22',
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
              zIndex: 1,
            }}
          >
            Continue
          </span>
        </motion.div>

        <FormButton
          label="Create Account"
          isLoading={isLoading}
          disabled={isLoading}
          style={{
            background: 'linear-gradient(135deg, #6B2D87, #F4D03F)',
            color: '#1A2533',
            fontWeight: 600,
            padding: '0.75rem',
            borderRadius: '8px',
            border: '2px solid #E67E22',
            boxShadow: '0 4px 10px rgba(107, 45, 135, 0.25)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          whileHover={{ scale: 1.03, boxShadow: '0 6px 12px rgba(107, 45, 135, 0.3)' }}
          whileTap={{ scale: 0.97 }}
        />

        <motion.div
          style={{ textAlign: 'center', marginTop: '0.75rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p style={{ color: '#1A2533', fontSize: '0.75rem', opacity: 0.7 }}>
            Already have an account?{' '}
            <a
              href="/auth/login"
              style={{
                color: '#6B2D87',
                fontWeight: 500,
                textDecoration: 'underline',
                textDecorationColor: 'rgba(107, 45, 135, 0.4)',
                transition: 'color 0.3s ease, text-decoration-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#F4D03F';
                e.target.style.textDecorationColor = 'rgba(244, 208, 63, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#6B2D87';
                e.target.style.textDecorationColor = 'rgba(107, 45, 135, 0.4)';
              }}
            >
              Sign In
            </a>
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
}