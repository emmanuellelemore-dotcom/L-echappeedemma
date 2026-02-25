import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
  recto: React.ReactNode;
  verso: React.ReactNode;
  className?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ recto, verso, className }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`relative ${className || ''}`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      tabIndex={0}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 1.2, ease: [0.4, 2, 0.6, 1] }}
        style={{ backfaceVisibility: 'hidden', zIndex: 2 }}
      >
        {recto}
      </motion.div>
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotateY: flipped ? 0 : -180 }}
        transition={{ duration: 1.2, ease: [0.4, 2, 0.6, 1] }}
        style={{ backfaceVisibility: 'hidden', zIndex: 1 }}
      >
        {verso}
      </motion.div>
    </div>
  );
};

export default FlipCard;
