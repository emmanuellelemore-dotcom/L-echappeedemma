import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
  recto: React.ReactNode;
  verso: React.ReactNode;
  className?: string;
}


const FlipCard: React.FC<FlipCardProps> = ({ recto, verso, className }) => {
  const [flipped, setFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = () => {
    if (isMobile) setFlipped((prev) => !prev);
  };

  return (
    <div
      className={`relative ${className || ''}`}
      onMouseEnter={!isMobile ? () => setFlipped(true) : undefined}
      onMouseLeave={!isMobile ? () => setFlipped(false) : undefined}
      tabIndex={0}
      onFocus={!isMobile ? () => setFlipped(true) : undefined}
      onBlur={!isMobile ? () => setFlipped(false) : undefined}
      onClick={handleClick}
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
