import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

interface DestinationInfoProps {
  title: string;
  description: string;
  highlights: string[];
  cta?: string;
  ctaLink?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export const DestinationInfo = ({ title, description, highlights, cta, ctaLink }: DestinationInfoProps) => {
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(true);
  // Bouton flottant pour réafficher
  if (!visible) {
    return (
      <button
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-accent text-accent-foreground font-bold px-6 py-3 rounded-full shadow-lg text-lg hover:bg-accent/80 transition"
        onClick={() => setVisible(true)}
      >Afficher l'encart client</button>
    );
  }
  return (
    <motion.section
      className="relative z-30 max-w-2xl mx-auto bg-background/80 rounded-3xl shadow-xl px-8 py-6 mb-10 mt-8 backdrop-blur-lg border border-border"
      initial="hidden"
      animate="show"
      variants={fadeUp}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-4xl md:text-5xl font-serif font-extrabold text-[#1e3a5f] text-center block w-full">{title}</span>
        <button
          className="text-sm px-3 py-1 rounded-full bg-muted-foreground/10 hover:bg-muted-foreground/20 text-muted-foreground font-semibold ml-2"
          onClick={() => setVisible(false)}
        >Masquer</button>
      </div>
      {open && (
        <div>
          <p className="text-lg text-muted-foreground mb-6 text-center">{description}</p>
          <ul className="mb-6 space-y-2">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-2 text-base text-foreground">
                <span className="inline-block w-2 h-2 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
          {cta && ctaLink && (
            <div className="flex justify-center">
              <Link
                to={ctaLink}
                className="bg-accent hover:bg-accent/80 text-accent-foreground font-bold py-3 px-8 rounded-full text-lg shadow transition"
              >
                {cta}
              </Link>
            </div>
          )}
        </div>
      )}
    </motion.section>
  );
};
