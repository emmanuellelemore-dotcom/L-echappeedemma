import { useRef } from 'react';
import { Star } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

interface ReviewCardProps {
  user: string;
  text: string;
  rating: number;
  index: number;
}

const ReviewCard = ({ user, text, rating, index }: ReviewCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, { amount: 0.35 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="bg-background p-6 rounded-2xl shadow-sm border-l-4 border-accent"
    >
      <p className="italic text-muted-foreground mb-4 leading-relaxed">"{text}"</p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-foreground">{user}</span>
        <div className="flex gap-0.5">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} size={14} fill="hsl(var(--gold))" color="hsl(var(--gold))" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
