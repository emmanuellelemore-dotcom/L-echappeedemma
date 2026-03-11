import { MessageCircle, Search, Calendar, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "L'Esquisse",
    description:
      "Je vous écoute : un temps d'échange offert pour faire connaissance et valider la faisabilité de votre projet.",
    icon: <MessageCircle size={32} />,
  },
  {
    number: 2,
    title: "L'Engagement",
    description:
      "Je formalise : signature du contrat, règlement et envoi de votre pack de bienvenue pour lancer l'aventure.",
    icon: <Search size={32} />,
  },
  {
    number: 3,
    title: "Le Socle",
    description:
      "Je bâtis : je sélectionne transports et hébergements. Vous validez vos coups de cœur puis réservez en direct, sans commission.",
    icon: <Calendar size={32} />,
  },
  {
    number: 4,
    title: "La Création",
    description:
      "Je dessine : conception de votre itinéraire sur-mesure, jour par jour, pour une itinérance fluide, rythmée par vos envies.",
    icon: <Sparkles size={32} />,
  },
  {
    number: 5,
    title: "Votre Carnet",
    description:
      "Je vous accompagne : remise de votre carnet de route digital et personnalisé. Votre échappée peut enfin commencer.",
    icon: <BookOpen size={32} />,
  },
];

const ProcessTimeline = () => {
  return (
    <div className="w-full">
      <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 lg:px-6 xl:px-8">
        {/* Timeline Container */}
        <div className="relative py-10 md:py-14 lg:py-20 xl:py-24">
          {/* Steps */}
          <div className="relative z-10 lg:px-2 xl:px-4">
            {/* Main Dotted Line - Desktop */}
            <div className="absolute left-[9%] right-[9%] top-10 hidden lg:block z-0 xl:left-[8%] xl:right-[8%] 2xl:left-[7.5%] 2xl:right-[7.5%]">
              <svg width="100%" height="2" preserveAspectRatio="none">
                <line
                  x1="0"
                  y1="1"
                  x2="100%"
                  y2="1"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  strokeDasharray="8,6"
                />
              </svg>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-y-14 lg:gap-x-6 xl:gap-x-8 relative z-10">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col items-center text-center ${
                  index === processSteps.length - 1
                    ? 'md:col-span-2 md:max-w-[320px] md:mx-auto lg:col-span-1 lg:max-w-none'
                    : ''
                }`}
              >
                {/* Step Circle - On the line */}
                <div className="relative mb-8 lg:mb-12">
                  <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-accent flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow relative z-20">
                    <span className="text-2xl xl:text-3xl font-bold text-primary">{step.number}</span>
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-4 text-primary">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl xl:text-[2rem] font-normal text-primary mb-4">{step.title}</h3>

                {/* Description */}
                <p className="text-sm md:text-base xl:text-[1.05rem] text-muted-foreground leading-relaxed max-w-[280px] xl:max-w-[300px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
