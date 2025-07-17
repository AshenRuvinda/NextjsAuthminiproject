'use client';

import { motion } from 'framer-motion';

export default function FormInput({ label, type, name, value, onChange, error }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <motion.label
        style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#2C3E50', // text-navy
          marginBottom: '8px',
        }}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ animation: 'slideUp', duration: 0.3 }}
      >
        {label}
      </motion.label>
      <motion.input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '12px 16px',
          background: '#FCFBF7', // bg-cream
          border: `1px solid ${error ? '#D35400' : '#D35400'}`, // accent-orange
          borderRadius: '8px',
          color: '#2C3E50', // text-navy
          fontSize: '1rem',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ animation: 'fadeIn', duration: 0.3 }}
        onFocus={(e) => (e.target.style.borderColor = '#F1C40F')} // secondary-yellow
        onBlur={(e) => (e.target.style.borderColor = error ? '#D35400' : '#D35400')}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <motion.p
          style={{
            color: '#D35400', // accent-orange
            fontSize: '0.75rem',
            marginTop: '6px',
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          id={`${name}-error`}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}