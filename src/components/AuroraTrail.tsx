import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Trajet de l'aurore, en coordonnées relatives (0 à 1) à la largeur et à la
 * hauteur de la zone : elle serpente de gauche à droite tout au long de la page.
 */
const POINTS: number[][] = [
  [-0.04, 0.03], // départ
  [0.24, 0.0], [0.52, 0.1], [0.82, 0.08], // première courbe (C)
  [1.12, 0.17], [0.8, 0.23], // puis courbes enchaînées (S)
  [0.12, 0.3], [0.22, 0.41],
  [0.94, 0.47], [0.84, 0.57],
  [0.08, 0.65], [0.2, 0.76],
  [0.96, 0.84], [1.05, 0.99],
];

/** Hauteur de l'écran (en fraction) jusqu'où l'aurore est dévoilée */
const HEAD_VIEWPORT_RATIO = 0.55;

/** Teintes qui se succèdent le long du ruban, comme sur une vraie aurore */
const STOPS = [
  { offset: '0%', color: '--aurora-cyan' },
  { offset: '14%', color: '--aurora-blue' },
  { offset: '28%', color: '--aurora-violet' },
  { offset: '42%', color: '--aurora-green' },
  { offset: '56%', color: '--aurora-cyan' },
  { offset: '70%', color: '--aurora-pink' },
  { offset: '84%', color: '--aurora-violet' },
  { offset: '100%', color: '--aurora-green' },
];

/**
 * Filaments qui accompagnent le cœur du ruban : chacun suit le même trajet,
 * légèrement déformé, pour s'écarter et se croiser comme de la fumée.
 */
const STRANDS = [
  { seed: 1, spread: 16, width: 2.2, opacity: 0.5 },
  { seed: 2, spread: 24, width: 1.4, opacity: 0.4 },
  { seed: 3, spread: 30, width: 1, opacity: 0.32 },
];

/**
 * Construit le tracé SVG. Avec `spread`, chaque point est décalé de quelques
 * pixels (de façon régulière et reproductible) pour créer un filament voisin.
 */
const buildPath = (w: number, h: number, seed = 0, spread = 0) => {
  const pts = POINTS.map(([x, y], i) => {
    const dx = seed ? Math.sin(seed * 7.13 + i * 2.31) * spread : 0;
    const dy = seed ? Math.cos(seed * 3.71 + i * 1.87) * spread * 0.7 : 0;
    return `${(x * w + dx).toFixed(1)} ${(y * h + dy).toFixed(1)}`;
  });
  const [start, c1, c2, c3, ...rest] = pts;
  let d = `M ${start} C ${c1}, ${c2}, ${c3}`;
  for (let i = 0; i < rest.length; i += 2) d += ` S ${rest[i]}, ${rest[i + 1]}`;
  return d;
};

const Gradient = ({ id, height }: { id: string; height: number }) => (
  <linearGradient id={id} x1="0" y1="0" x2="0" y2={height} gradientUnits="userSpaceOnUse">
    {STOPS.map((stop) => (
      <stop key={stop.offset} offset={stop.offset} style={{ stopColor: `hsl(var(${stop.color}))` }} />
    ))}
  </linearGradient>
);

/**
 * Aurore boréale qui suit un chemin à travers la page : un ruban lumineux
 * (cœur très fin, filaments, voile strié et halo coloré) dévoilé au fil du défilement.
 *
 * Performance : le dessin est statique (fait une seule fois). Au défilement on
 * ne change que la hauteur de la zone visible ; le scintillement n'anime que
 * l'opacité et la position des calques, ce que la carte graphique gère seule.
 * Le parent doit avoir `relative isolate` pour que l'aurore passe derrière le contenu.
 */
const AuroraTrail = () => {
  const uid = useId().replace(/:/g, '');
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const { scrollY } = useScroll();
  const reveal = useMotionValue(0);
  const revealSmooth = useSpring(reveal, { stiffness: 60, damping: 22, mass: 0.7 });
  const revealHeight = useTransform(revealSmooth, (value) => `${value}px`);

  // La zone suit la taille réelle de la page
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    let timer = 0;
    const observer = new ResizeObserver(([entry]) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const { width, height } = entry.contentRect;
        setSize({ w: Math.round(width), h: Math.round(height) });
      }, 150);
    });
    observer.observe(box);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Dévoile l'aurore jusqu'au milieu de l'écran
  const update = useCallback(() => {
    const box = boxRef.current;
    if (!box || !size.h) return;
    const boxTop = box.getBoundingClientRect().top + window.scrollY;
    const head = window.scrollY + window.innerHeight * HEAD_VIEWPORT_RATIO - boxTop;
    reveal.set(Math.min(size.h, Math.max(0, head + 160)));
  }, [reveal, size.h]);

  useMotionValueEvent(scrollY, 'change', update);
  useEffect(() => {
    update();
  }, [update]);

  const { w, h } = size;
  const d = w ? buildPath(w, h) : '';
  const svgProps = { width: w, height: h, viewBox: `0 0 ${w} ${h}`, fill: 'none' as const, className: 'absolute left-0 top-0' };

  return (
    <div ref={boxRef} aria-hidden="true" className="aurora-trail pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {w > 0 && (
        // Partie déjà parcourue : son bord inférieur s'estompe, le ruban « apparaît »
        <motion.div
          className="absolute inset-x-0 top-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_calc(100%-260px),transparent)]"
          style={{ height: revealHeight }}
        >
          {/* 1. Halo coloré, très diffus */}
          <svg {...svgProps} className="aurora-glow absolute left-0 top-0">
            <defs>
              <Gradient id={`glow-${uid}`} height={h} />
            </defs>
            <g stroke={`url(#glow-${uid})`} strokeLinecap="round">
              <path d={d} strokeWidth={46} opacity={0.32} />
              <path d={d} strokeWidth={90} opacity={0.12} transform="translate(0 -40)" />
            </g>
          </svg>

          {/* 2. Voile strié qui monte au-dessus du ruban (rayons verticaux) */}
          <svg {...svgProps} className="aurora-veil absolute left-0 top-0">
            <defs>
              <Gradient id={`veil-${uid}`} height={h} />
              <pattern id={`rays-${uid}`} width="29" height="40" patternUnits="userSpaceOnUse">
                <rect x="0" width="1.5" height="40" fill="white" opacity="0.9" />
                <rect x="5" width="3" height="40" fill="white" opacity="0.45" />
                <rect x="12" width="1" height="40" fill="white" opacity="0.8" />
                <rect x="17" width="4" height="40" fill="white" opacity="0.35" />
                <rect x="24" width="1.5" height="40" fill="white" opacity="0.7" />
              </pattern>
              <filter id={`soft-${uid}`} x="-5%" y="-5%" width="110%" height="110%">
                <feGaussianBlur stdDeviation="18" />
              </filter>
              {/* Forme du voile : une bande floue juste au-dessus du ruban */}
              <mask id={`band-${uid}`} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
                <path d={d} stroke="white" strokeWidth={84} transform="translate(0 -44)" filter={`url(#soft-${uid})`} />
              </mask>
              <mask id={`raymask-${uid}`} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
                <rect width={w} height={h} fill={`url(#rays-${uid})`} />
              </mask>
            </defs>
            <g mask={`url(#band-${uid})`}>
              <rect width={w} height={h} fill={`url(#veil-${uid})`} opacity={0.16} />
              <rect width={w} height={h} fill={`url(#veil-${uid})`} mask={`url(#raymask-${uid})`} opacity={0.62} />
            </g>
          </svg>

          {/* 3. Filaments de fumée et cœur très fin */}
          <svg {...svgProps} className="aurora-strands absolute left-0 top-0">
            <defs>
              <Gradient id={`line-${uid}`} height={h} />
            </defs>
            <g stroke={`url(#line-${uid})`} strokeLinecap="round">
              {STRANDS.map((strand) => (
                <path key={strand.seed} d={buildPath(w, h, strand.seed, strand.spread)} strokeWidth={strand.width} opacity={strand.opacity} />
              ))}
              <path d={d} strokeWidth={1.1} opacity={0.85} />
            </g>
          </svg>
        </motion.div>
      )}
    </div>
  );
};

export default AuroraTrail;
