import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';

interface Source {
  src: string;
  caption: string;
}

interface Data {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface InfiniteGridProps {
  sources: Source[];
  data: Data[];
  originalSize: { w: number; h: number };
  basePath: string;
}

interface Item {
  el: HTMLDivElement;
  img: HTMLImageElement;
  x: number;
  y: number;
  extraX: number;
  extraY: number;
  rect: DOMRect;
  ease: number;
}

/** Au-delà de ce déplacement (px), un geste est un glisser et non un clic */
const DRAG_THRESHOLD = 6;

const loadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // une image manquante ne bloque pas la galerie
    img.src = src;
  });

/**
 * Grille de photos infinie : on la fait glisser (souris, doigt ou molette),
 * les photos suivent légèrement le curseur, un clic ouvre la photo en grand.
 */
const InfiniteGrid: React.FC<InfiniteGridProps> = ({ sources, data, originalSize, basePath }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [popup, setPopup] = useState<{ src: string; caption: string } | null>(null);
  const popupImageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Animation d'ouverture + fermeture avec Échap
  useEffect(() => {
    if (!popup) return;
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    }
    if (popupImageRef.current) {
      gsap.fromTo(popupImageRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPopup(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [popup]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    let rafId = 0;
    let teardown: (() => void) | null = null;

    const initialize = () => {
      if (cancelled) return;

      const winW = window.innerWidth;
      const winH = window.innerHeight;
      // Sur mobile, on garde une tuile plus large que l'écran pour que les photos restent lisibles
      const tileW = Math.max(winW, 1100);
      const tileSize = { w: tileW, h: tileW * (originalSize.h / originalSize.w) };

      const scroll = {
        ease: 0.06,
        current: { x: -winW * 0.1, y: -winH * 0.1 },
        target: { x: -winW * 0.1, y: -winH * 0.1 },
        last: { x: -winW * 0.1, y: -winH * 0.1 },
        delta: { x: { c: 0, t: 0 }, y: { c: 0, t: 0 } },
      };
      const mouse = { x: { t: 0.5, c: 0.5 }, y: { t: 0.5, c: 0.5 }, press: { t: 0, c: 0 } };
      const drag = { active: false, moved: false, startX: 0, startY: 0, scrollX: 0, scrollY: 0 };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.target.classList.toggle('visible', entry.isIntersecting));
      });

      const scaleX = tileSize.w / originalSize.w;
      const scaleY = tileSize.h / originalSize.h;
      const baseItems = data.map((d, i) => ({
        src: sources[i % sources.length].src,
        caption: sources[i % sources.length].caption,
        x: d.x * scaleX,
        y: d.y * scaleY,
        w: d.w * scaleX,
        h: d.h * scaleY,
      }));

      const repsX = [0, tileSize.w];
      const repsY = [0, tileSize.h];
      const items: Item[] = [];
      el.innerHTML = '';

      Promise.all(baseItems.map((base) => loadImage(`${basePath}/${base.src}`))).then(() => {
        if (cancelled) return;

        baseItems.forEach((base) => {
          repsX.forEach((offsetX) => {
            repsY.forEach((offsetY) => {
              const itemEl = document.createElement('div');
              itemEl.className = 'item absolute top-0 left-0';
              itemEl.style.width = `${base.w}px`;

              const wrapper = document.createElement('div');
              wrapper.className = 'item-wrapper will-change-transform';

              const itemImage = document.createElement('div');
              itemImage.className = 'item-image overflow-hidden';
              itemImage.style.width = `${base.w}px`;
              itemImage.style.height = `${base.h}px`;

              const img = new Image();
              img.src = `${basePath}/${base.src}`;
              img.alt = base.caption;
              img.draggable = false;
              img.className = 'w-full h-full object-cover will-change-transform custom-shadow opacity-0';
              img.addEventListener('click', () => {
                if (drag.moved) return; // fin d'un glisser : on n'ouvre pas la photo
                setPopup({ src: base.src, caption: base.caption });
              });

              itemImage.appendChild(img);
              wrapper.appendChild(itemImage);

              const caption = document.createElement('small');
              caption.className = 'caption';
              caption.textContent = base.caption;
              wrapper.appendChild(caption);

              itemEl.appendChild(wrapper);
              el.appendChild(itemEl);

              gsap.to(img, { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 + Math.random() * 0.4 });
              observer.observe(caption);

              items.push({
                el: itemEl,
                img,
                x: base.x + offsetX,
                y: base.y + offsetY,
                extraX: 0,
                extraY: 0,
                rect: itemEl.getBoundingClientRect(),
                ease: Math.random() * 0.5 + 0.5,
              });
            });
          });
        });
      });

      tileSize.w *= 2;
      tileSize.h *= 2;

      const startDrag = (x: number, y: number) => {
        drag.active = true;
        drag.moved = false;
        drag.startX = x;
        drag.startY = y;
        drag.scrollX = scroll.target.x;
        drag.scrollY = scroll.target.y;
        mouse.press.t = 1;
        el.classList.add('dragging');
      };

      const moveDrag = (x: number, y: number) => {
        if (!drag.active) return;
        const dx = x - drag.startX;
        const dy = y - drag.startY;
        if (Math.hypot(dx, dy) > DRAG_THRESHOLD) drag.moved = true;
        scroll.target.x = drag.scrollX + dx;
        scroll.target.y = drag.scrollY + dy;
      };

      const endDrag = () => {
        drag.active = false;
        mouse.press.t = 0;
        el.classList.remove('dragging');
      };

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        scroll.target.x -= e.deltaX * 0.4;
        scroll.target.y -= e.deltaY * 0.4;
      };
      const onMouseDown = (e: MouseEvent) => {
        if (e.button !== 0) return;
        e.preventDefault(); // évite la sélection de texte et le fantôme de l'image pendant le glisser
        startDrag(e.clientX, e.clientY);
      };
      const onMouseMove = (e: MouseEvent) => {
        mouse.x.t = e.clientX / winW;
        mouse.y.t = e.clientY / winH;
        moveDrag(e.clientX, e.clientY);
      };
      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length !== 1) return;
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      };
      const onTouchMove = (e: TouchEvent) => {
        if (!drag.active || e.touches.length !== 1) return;
        e.preventDefault();
        moveDrag(e.touches[0].clientX, e.touches[0].clientY);
      };

      // Le glisser ne démarre que sur la grille : les boutons et l'encart restent cliquables
      el.addEventListener('wheel', onWheel, { passive: false });
      el.addEventListener('mousedown', onMouseDown);
      el.addEventListener('touchstart', onTouchStart, { passive: true });
      el.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', endDrag);
      window.addEventListener('touchend', endDrag);
      window.addEventListener('touchcancel', endDrag);

      const render = () => {
        scroll.current.x += (scroll.target.x - scroll.current.x) * scroll.ease;
        scroll.current.y += (scroll.target.y - scroll.current.y) * scroll.ease;
        scroll.delta.x.t = scroll.current.x - scroll.last.x;
        scroll.delta.y.t = scroll.current.y - scroll.last.y;
        scroll.delta.x.c += (scroll.delta.x.t - scroll.delta.x.c) * 0.04;
        scroll.delta.y.c += (scroll.delta.y.t - scroll.delta.y.c) * 0.04;
        mouse.x.c += (mouse.x.t - mouse.x.c) * 0.04;
        mouse.y.c += (mouse.y.t - mouse.y.c) * 0.04;
        mouse.press.c += (mouse.press.t - mouse.press.c) * 0.04;

        const dirX = scroll.current.x > scroll.last.x ? 'right' : 'left';
        const dirY = scroll.current.y > scroll.last.y ? 'down' : 'up';

        items.forEach((item) => {
          // Parallaxe douce : assez faible pour que les photos ne se recouvrent pas
          const newX = 5 * scroll.delta.x.c * item.ease + (mouse.x.c - 0.5) * item.rect.width * 0.25;
          const newY = 5 * scroll.delta.y.c * item.ease + (mouse.y.c - 0.5) * item.rect.height * 0.25;
          const posX = item.x + scroll.current.x + item.extraX + newX;
          const posY = item.y + scroll.current.y + item.extraY + newY;

          if (dirX === 'right' && posX > winW) item.extraX -= tileSize.w;
          if (dirX === 'left' && posX + item.rect.width < 0) item.extraX += tileSize.w;
          if (dirY === 'down' && posY > winH) item.extraY -= tileSize.h;
          if (dirY === 'up' && posY + item.rect.height < 0) item.extraY += tileSize.h;

          const fx = item.x + scroll.current.x + item.extraX + newX;
          const fy = item.y + scroll.current.y + item.extraY + newY;
          item.el.style.transform = `translate(${fx}px, ${fy}px)`;
          item.img.style.transform = `scale(${1.2 + 0.2 * mouse.press.c * item.ease}) translate(${-mouse.x.c * item.ease * 10}%, ${-mouse.y.c * item.ease * 10}%)`;
        });

        scroll.last.x = scroll.current.x;
        scroll.last.y = scroll.current.y;
        rafId = requestAnimationFrame(render);
      };
      rafId = requestAnimationFrame(render);

      teardown = () => {
        cancelAnimationFrame(rafId);
        el.removeEventListener('wheel', onWheel);
        el.removeEventListener('mousedown', onMouseDown);
        el.removeEventListener('touchstart', onTouchStart);
        el.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', endDrag);
        window.removeEventListener('touchend', endDrag);
        window.removeEventListener('touchcancel', endDrag);
        observer.disconnect();
        gsap.killTweensOf(items.map((item) => item.img));
        el.innerHTML = '';
      };
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(initialize);
    } else {
      initialize();
    }

    // Nettoyage complet en quittant la galerie (sinon les écouteurs restent actifs sur tout le site)
    return () => {
      cancelled = true;
      teardown?.();
    };
  }, [sources, data, originalSize, basePath]);

  return (
    <>
      <div id="images" ref={containerRef} className="relative inline-block h-full w-full whitespace-nowrap" />
      {popup && (
        <div
          ref={overlayRef}
          onClick={() => setPopup(null)}
          role="dialog"
          aria-modal="true"
          aria-label={popup.caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/80 backdrop-blur-xl"
          style={{ cursor: "url('/star_brillante.webp') 0 0, pointer" }}
        >
          <button
            type="button"
            onClick={() => setPopup(null)}
            className="btn-light btn-sm absolute right-4 top-4 md:right-8 md:top-8"
            aria-label="Fermer la photo"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Fermer
          </button>
          <figure className="gallery-popup" onClick={(e) => e.stopPropagation()}>
            <img
              ref={popupImageRef}
              src={popup.src.startsWith('/') ? popup.src : `${basePath}/${popup.src}`}
              alt={popup.caption}
              className="gallery-popup-image"
            />
            <figcaption className="gallery-popup-caption">{popup.caption}</figcaption>
          </figure>
        </div>
      )}
    </>
  );
};

export default InfiniteGrid;
