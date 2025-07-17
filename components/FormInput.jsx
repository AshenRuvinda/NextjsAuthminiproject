'use client';

  import { motion } from 'framer-motion';

  export default function FormInput({ label, type, name, value, onChange, error }) {
    return (
      <div className="mb-4">
        <motion.label
          className="block text-sm font-medium text-gray-300"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.label>
        <motion.input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`mt-1 w-full p-3 bg-gray-800 text-white border ${
            error ? 'border-red-500' : 'border-gray-600'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        {error && (
          <motion.p
            className="text-red-500 text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }