import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

export interface ContainerTextFlipProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
}

const DEFAULT_FLIP_WORDS = ['Bonjour !', 'Hei !', 'Hej !', 'Hello !', 'Hae !', 'Ciao !', 'Hola !', 'Halla !', 'Olá !'];

export function ContainerTextFlip({
  words = DEFAULT_FLIP_WORDS,
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const longestWordLength = Math.max(...words.map((word) => word.length), 1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.div
      className={cn(
        'relative inline-block text-center text-3xl font-bold text-primary md:text-5xl whitespace-nowrap',
        className
      )}
      style={{ width: `${longestWordLength + 1}ch` }}
    >
      <motion.div className={cn('inline-block whitespace-nowrap', textClassName)}>
        <AnimatePresence mode="wait">
          <motion.span
            key={words[currentWordIndex]}
            className="inline-block whitespace-nowrap"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: animationDuration / 1000, ease: 'easeInOut' }}
          >
            {words[currentWordIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default ContainerTextFlip;