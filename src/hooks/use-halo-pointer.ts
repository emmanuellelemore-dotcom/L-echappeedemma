import { useState, type MouseEvent as ReactMouseEvent } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * Halo lumineux qui suit le curseur à l'intérieur d'une carte.
 * Brancher enterPointer / updatePointer / hidePointer sur la carte,
 * puis positionner un élément avec style={{ x, y }}.
 */
export const useHaloPointer = (haloSize: number) => {
  const [active, setActive] = useState(false);
  const pointerX = useMotionValue(-haloSize);
  const pointerY = useMotionValue(-haloSize);
  const x = useSpring(pointerX, { stiffness: 240, damping: 30, mass: 0.18 });
  const y = useSpring(pointerY, { stiffness: 240, damping: 30, mass: 0.18 });

  const getPointerPosition = (event: ReactMouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();

    return {
      x: event.clientX - bounds.left - haloSize / 2,
      y: event.clientY - bounds.top - haloSize / 2,
    };
  };

  const enterPointer = (event: ReactMouseEvent<HTMLElement>) => {
    const nextPointer = getPointerPosition(event);

    pointerX.jump(nextPointer.x);
    pointerY.jump(nextPointer.y);
    x.jump(nextPointer.x);
    y.jump(nextPointer.y);
    setActive(true);
  };

  const updatePointer = (event: ReactMouseEvent<HTMLElement>) => {
    const nextPointer = getPointerPosition(event);

    pointerX.set(nextPointer.x);
    pointerY.set(nextPointer.y);

    if (!active) {
      setActive(true);
    }
  };

  const hidePointer = () => setActive(false);

  return { active, x, y, enterPointer, updatePointer, hidePointer };
};
