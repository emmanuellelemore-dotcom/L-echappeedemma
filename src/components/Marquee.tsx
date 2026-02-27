import React, { useRef, useEffect } from "react";

interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text, speed = 40, className = "" }) => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    let animationId: number;
    let offset = 0;
    const step = () => {
      offset -= 1;
      // Boucle continue
      if (offset < -marquee.scrollWidth) {
        offset = 0;
      }
      marquee.style.transform = `translateX(${offset}px)`;
      animationId = requestAnimationFrame(step);
    };
    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Répéter la phrase plusieurs fois pour un effet continu
  const repeated = Array(6).fill(text).join("   ");
  return (
    <div className={`overflow-hidden whitespace-nowrap w-full ${className}`} style={{ height: "2.5rem" }}>
      <div ref={marqueeRef} className="inline-block text-primary text-2xl font-serif">
        {repeated}
      </div>
    </div>
  );
};

export default Marquee;
