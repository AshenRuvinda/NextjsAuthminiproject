'use client';

import { motion } from 'framer-motion';

export default function FormButton({ label, isLoading }) {
  return (
    <motion.button
      type="submit"
      disabled={isLoading}
      style={{
        width: '100%',
        padding: '14px',
        background: 'linear-gradient(to right, #8E44AD, #F1C40F)', // primary-purple, secondary-yellow
        color: '#2C3E50', // text-navy
        fontWeight: 600,
        fontSize: '1rem',
        borderRadius: '8px',
        boxShadow: '0 6px 16px rgba(142, 68, 173, 0.4), 0 0 8px rgba(241, 196, 15, 0.3)', // glow effect
        transition: 'all 0.3s ease',
        opacity: isLoading ? 0.5 : 1,
        cursor: isLoading ? 'not-allowed' : 'pointer',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ animation: 'slideUp', delay: 0.4 }}
      whileHover={{ scale: isLoading ? 1 : 1.05, boxShadow: '0 8px 20px rgba(142, 68, 173, 0.5), 0 0 12px rgba(241, 196, 15, 0.4)' }}
      whileTap={{ scale: isLoading ? 1 : 0.95 }}
      onMouseEnter={(e) => !isLoading && (e.target.style.background = 'linear-gradient(to right, #7B1FA2, #FBC107)')}
      onMouseLeave={(e) => !isLoading && (e.target.style.background = 'linear-gradient(to right, #8E44AD, #F1C40F)')}
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
          Processing...
        </span>
      ) : (
        label
      )}
    </motion.button>
  );
}