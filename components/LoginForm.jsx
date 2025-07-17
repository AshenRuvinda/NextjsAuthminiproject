'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginForm() {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = { push: (path) => (window.location.href = path) }; // Mock router

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedData = {
      identifier: formData.identifier.trim(),
      password: formData.password.trim(),
    };

    const fieldErrors = {};
    if (!trimmedData.identifier) fieldErrors.identifier = 'Username or email is required';
    if (!trimmedData.password) fieldErrors.password = 'Password is required';
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setServerError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      style={{
        position: 'relative',
        zIndex: 20,
        width: '100%',
        maxWidth: '28rem', // Increased from max-w-md (448px) to max-w-lg (512px)
        background: '#FCFBF7', // bg-cream
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(45deg, rgba(142, 68, 173, 0.1), rgba(241, 196, 15, 0.1))', // primary-purple/10, secondary-yellow/10
          borderRadius: '12px',
        }}
      />
      <form
        onSubmit={handleSubmit}
        style={{ position: 'relative', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      >
        <motion.div
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ animation: 'slideUp' }}
        >
          <motion.div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              background: 'linear-gradient(to right, #8E44AD, #F1C40F)', // primary-purple, secondary-yellow
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(142, 68, 173, 0.3)',
            }}
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <svg style={{ width: '28px', height: '28px', stroke: '#2C3E50' }} fill="none" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </motion.div>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#2C3E50', // text-navy
              background: 'linear-gradient(to right, #8E44AD, #F1C40F)', // primary-purple, secondary-yellow
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome Back
          </h2>
          <p style={{ color: '#2C3E50', fontSize: '0.875rem', opacity: 0.8 }}>Sign in to your cozy space</p>
        </motion.div>

        <AnimatePresence>
          {serverError && (
            <motion.div
              style={{
                background: 'rgba(211, 84, 0, 0.1)', // accent-orange/10
                border: '1px solid #D35400', // accent-orange
                color: '#D35400',
                padding: '1rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <svg style={{ width: '20px', height: '20px', stroke: '#D35400' }} fill="none" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p style={{ fontSize: '0.875rem' }}>{serverError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ animation: 'fadeIn', delay: 0.2 }}
        >
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#2C3E50', // text-navy
                marginBottom: '8px',
              }}
            >
              Username or Email
            </label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#FCFBF7', // bg-cream
                border: `1px solid ${errors.identifier ? '#D35400' : '#D35400'}` , // accent-orange
                borderRadius: '8px',
                color: '#2C3E50', // text-navy
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
              placeholder="Enter your username or email"
              aria-invalid={!!errors.identifier}
              aria-describedby={errors.identifier ? 'identifier-error' : undefined}
              onFocus={(e) => (e.target.style.borderColor = '#F1C40F')} // secondary-yellow
              onBlur={(e) => (e.target.style.borderColor = errors.identifier ? '#D35400' : '#D35400')}
            />
            {errors.identifier && (
              <p
                id="identifier-error"
                style={{ color: '#D35400', fontSize: '0.75rem', marginTop: '6px' }}
              >
                {errors.identifier}
              </p>
            )}
          </div>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#2C3E50', // text-navy
                marginBottom: '8px',
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#FCFBF7', // bg-cream
                border: `1px solid ${errors.password ? '#D35400' : '#D35400'}` , // accent-orange
                borderRadius: '8px',
                color: '#2C3E50', // text-navy
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
              placeholder="Enter your password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              onFocus={(e) => (e.target.style.borderColor = '#F1C40F')} // secondary-yellow
              onBlur={(e) => (e.target.style.borderColor = errors.password ? '#D35400' : '#D35400')}
            />
            {errors.password && (
              <p
                id="password-error"
                style={{ color: '#D35400', fontSize: '0.75rem', marginTop: '6px' }}
              >
                {errors.password}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          style={{ textAlign: 'right', marginTop: '1rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ animation: 'fadeIn', delay: 0.3 }}
        >
          <a
            href="/auth/forgot-password"
            style={{
              fontSize: '0.875rem',
              color: '#8E44AD', // primary-purple
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#F1C40F')} // secondary-yellow
            onMouseLeave={(e) => (e.target.style.color = '#8E44AD')}
          >
            Forgot your password?
          </a>
        </motion.div>

        <motion.button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(to right,rgb(237, 231, 240), #F1C40F)', // primary-purple, secondary-yellow
            color: '#2C3E50', // text-navy
            fontWeight: 500,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            opacity: isLoading ? 0.5 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ animation: 'slideUp', delay: 0.4 }}
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
          onMouseEnter={(e) => !isLoading && (e.target.style.background = 'linear-gradient(to right,rgb(215, 201, 221), #FBC107)')} // darker shades
          onMouseLeave={(e) => !isLoading && (e.target.style.background = 'linear-gradient(to right,rgb(188, 171, 196), #F1C40F)')}
        >
          {isLoading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg
                style={{ height: '20px', width: '20px', marginRight: '8px' }}
                className="animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="#2C3E50" strokeWidth="4" />
                <path style={{ opacity: 0.75 }} fill="#2C3E50" d="M4 12a8 8 0 018-8V0" />
              </svg>
              Signing in...
            </span>
          ) : (
            'Sign In'
          )}
        </motion.button>

        <motion.div
          style={{ position: 'relative', marginTop: '1.5rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ animation: 'fadeIn', delay: 0.5 }}
        >
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100%', borderTop: '1px solid #D35400' }} />
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', fontSize: '0.875rem' }}>
            <span
              style={{
                padding: '0 12px',
                background: '#FCFBF7', // bg-cream
                color: '#2C3E50', // text-navy
                opacity: 0.8,
              }}
            >
              or continue with
            </span>
          </div>
        </motion.div>

        <motion.div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '1rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ animation: 'slideUp', delay: 0.6 }}
        >
          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              background: '#FCFBF7', // bg-cream
              border: '1px solid #D35400', // accent-orange
              borderRadius: '8px',
              color: '#2C3E50', // text-navy
              fontSize: '0.875rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#F1C40F')} // secondary-yellow
            onMouseLeave={(e) => (e.target.style.background = '#FCFBF7')}
          >
            <svg style={{ width: '20px', height: '20px', marginRight: '8px', fill: '#2C3E50' }} viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              background: '#FCFBF7', // bg-cream
              border: '1px solid #D35400', // accent-orange
              borderRadius: '8px',
              color: '#2C3E50', // text-navy
              fontSize: '0.875rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#F1C40F')} // secondary-yellow
            onMouseLeave={(e) => (e.target.style.background = '#FCFBF7')}
          >
            <svg style={{ width: '20px', height: '20px', marginRight: '8px', fill: '#2C3E50' }} viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
            Twitter
          </button>
        </motion.div>

        <motion.div
          style={{ textAlign: 'center', marginTop: '1rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ animation: 'fadeIn', delay: 0.7 }}
        >
          <p style={{ color: '#2C3E50', fontSize: '0.875rem', opacity: 0.8 }}>
            Don’t have an account?{' '}
            <a
              href="/auth/register"
              style={{
                color: '#8E44AD', // primary-purple
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#F1C40F')} // secondary-yellow
              onMouseLeave={(e) => (e.target.style.color = '#8E44AD')}
            >
              Create one here
            </a>
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
}