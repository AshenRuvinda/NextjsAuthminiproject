'use client';

  import { motion } from 'framer-motion';

  export default function AnimatedBackground() {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[200%] h-[200%] bg-gradient-to-r from-blue-500 to-purple-600"
          animate={{
            x: ['0%', '-100%'],
            y: ['0%', '-100%'],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          }}
        />
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>
    );
  }