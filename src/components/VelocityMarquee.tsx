import { useRef, type ReactNode } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';

// Ramène v dans l'intervalle [min, max[ pour une boucle infinie sans couture
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const COPIES = 4;

interface VelocityMarqueeProps {
  children: ReactNode;
  /** Vitesse de base en % par seconde. Négatif = vers la gauche, positif = vers la droite. */
  baseVelocity?: number;
  className?: string;
}

/**
 * Bandeau qui défile tout seul en boucle, accélère avec le scroll
 * et change de sens quand on remonte la page.
 * Respecte le réglage "réduire les animations" du système.
 */
const VelocityMarquee = ({ children, baseVelocity = -2, className = '' }: VelocityMarqueeProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);
  const direction = useRef(1);
  const prefersReducedMotion = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;

    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;

    let moveBy = direction.current * baseVelocity * (delta / 1000);
    moveBy += moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`.trim()} aria-hidden="true">
      <motion.div className="flex w-max flex-nowrap" style={{ x }}>
        {Array.from({ length: COPIES }).map((_, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default VelocityMarquee;
