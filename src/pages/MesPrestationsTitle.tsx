import { TextRoll } from '../components/core/text-roll';
import React, { useState } from 'react';

export const MesPrestationsTitle = () => {
  const [key, setKey] = useState(0);
  const handleHover = () => {
    setKey((k) => k + 1);
  };
  return (
    <h1
      className="text-4xl font-serif text-center mb-10"
      onMouseEnter={handleHover}
      style={{ cursor: 'pointer' }}
    >
      <TextRoll
        key={key}
        className="overflow-clip text-4xl text-black dark:text-white"
        variants={{
          enter: {
            initial: { rotateX: 0 },
            animate: { rotateX: 90 },
          },
          exit: {
            initial: { rotateX: 90 },
            animate: { rotateX: 0 },
          },
        }}
        duration={0.5}
        getEnterDelay={(i) => i * 0.1}
        getExitDelay={(i) => i * 0.1 + 0.2}
        transition={{
          ease: 'easeIn',
        }}
      >
        Mes Prestations
      </TextRoll>
    </h1>
  );
};