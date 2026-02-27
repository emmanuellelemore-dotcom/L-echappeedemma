import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp } from 'lucide-react';


const FAQ = [
  {
    question: "Qu'est-ce qu'une travel planner ?",
    answer: "Une travel planner indépendante comme moi conçoit des voyages sur mesure selon VOS envies, votre budget et vos contraintes. Je m'occupe de la recherche, de la planification et je vous propose un itinéraire personnalisé, unique et flexible.",
  },
  {
    question: "Pourquoi choisir une travel planner indépendante plutôt qu'une agence de voyage classique ?",
    answer: "En tant que travel planner indépendante, je vous offre un service sur-mesure, sans commission cachée, avec une vraie écoute et une flexibilité totale. Je sélectionne chaque prestation pour vous, sans catalogue imposé.",
  },
  {
    question: "Proposes-tu des voyages dernière minute ou week-end ?",
    answer: "Oui, j'organise aussi bien des voyages dernière minute que des week-ends sur mesure, selon les disponibilités et vos souhaits. Contactez-moi pour une proposition rapide !",
  },
  {
    question: "Quels sont les avantages de passer par L'échappée d'Emma ?",
    answer: "Vous bénéficiez d'un accompagnement 100% personnalisé, d'itinéraires uniques, d'une expertise sur le Grand Nord, et d'une organisation sans stress, même pour les courts séjours. Je suis à votre écoute à chaque étape.",
  },
  {
    question: "Comment réserver un voyage sur mesure ?",
    answer: "Contactez-moi via le formulaire du site ou par email. Nous échangerons sur vos envies avant que je vous propose un devis personnalisé. Je m'occupe de tout, vous n'avez plus qu'à profiter !",
  },
  {
    question: "Peux-tu organiser un voyage dans le Grand Nord ?",
    answer: "Oui, je suis spécialisée dans les destinations nordiques : Islande, Norvège, Suède, Finlande, Lofoten... Je crée des itinéraires adaptés à vos envies d'aventure, de nature ou de déconnexion.",
  },
  {
    question: "Quels mots-clés décrivent le mieux ton activité ?",
    answer: "Travel planner, voyage dernière minute, agence travel, simply voyage, l'échappée, grand nord, voyage weekend dernière minute, l'échappée d'emma, Sucy-en-brie, voyage sur mesure, Islande, Norvège, Suède, Finlande, voyage nordique, aurore boréale, fjord... N'hésitez pas à me contacter pour toute demande spécifique !",
  },
];


const FeedbackWidget = () => {

  const [showBubble, setShowBubble] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const location = useLocation();
  const hasShownBubble = useRef(false);

  useEffect(() => {
    // Affiche la bulle d'accueil uniquement à la première visite (pas à chaque navigation)
    if (!hasShownBubble.current) {
      setShowBubble(false);
      setShowModal(false);
      setMinimized(false);
      const timer = setTimeout(() => {
        setShowBubble(true);
        hasShownBubble.current = true;
      }, 5000);
      return () => clearTimeout(timer);
    }
    // Si la bulle a déjà été affichée et n'a pas été fermée, on la laisse visible sur toutes les pages
    // Si l'utilisateur a fermé (minimized), on garde l'étiquette FAQ
    // Donc on ne touche pas à l'état si la bulle est encore ouverte
    // eslint-disable-next-line
  }, [location.pathname]);

  const dismiss = (fromModal = false) => {
    setShowBubble(false);
    setShowModal(false);
    setMinimized(true);
  };

  const openModal = () => {
    setShowBubble(false);
    setShowModal(true);
    setMinimized(false);
  };

  return (
    <>
      {/* Floating bubble — mascot */}
      <AnimatePresence>
        {showBubble && !minimized && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed bottom-6 right-6 z-[60] cursor-pointer group"
            onClick={openModal}
          >
            <div className="relative bg-white rounded-2xl shadow-lg border border-[#1e3a5f] bg-[#1e3a5f]/10 overflow-hidden flex flex-col items-center hover:shadow-xl transition-shadow w-[130px]">
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismiss(false);
                }}
                className="absolute top-1 right-1 bg-white/80 backdrop-blur rounded-full p-0.5 shadow border border-gray-200 hover:bg-gray-100 transition-colors z-10"
                aria-label="Fermer"
              >
                <X size={14} />
              </button>

              {/* Image fills the entire top */}
              <div className="w-full bg-[#1e3a5f]/10">
                <img
                  src="/chouette_avis.webp"
                  alt="Donnez votre avis"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Text below */}
              <div className="w-full bg-white px-2 py-2 rounded-b-2xl shadow flex items-center justify-center">
                <span className="text-xs font-bold text-gray-800 text-center leading-tight">
                  La FAQ la plus chouette du coin
                </span>
              </div>
            </div>
          </motion.div>
        )}
        {/* Etiquette FAQ minimisée */}
        {minimized && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed bottom-10 right-0 z-[60] cursor-pointer group"
            style={{ pointerEvents: 'auto' }}
            onClick={() => { setShowModal(true); setMinimized(false); }}
          >
            <div className="bg-[#1e3a5f] font-serif font-bold px-2 py-2 rounded-l-2xl shadow-lg border border-[#1e3a5f] text-base tracking-wide hover:bg-[#25406e] transition-all flex flex-col items-center select-none" style={{letterSpacing: 0}}>
              <span className="text-accent" style={{lineHeight: '1.1'}}>F</span>
              <span className="text-accent" style={{lineHeight: '1.1'}}>A</span>
              <span className="text-accent" style={{lineHeight: '1.1'}}>Q</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[70]"
              onClick={() => dismiss(true)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="fixed inset-0 z-[80] flex items-center justify-center pointer-events-none"
            >
              <div className="w-[90vw] max-w-md bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto pointer-events-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-3 pb-0">
                  <h2 className="text-xl font-bold text-pink-500">FAQ</h2>
                  <button
                    onClick={() => dismiss(true)}
                    className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
                  >
                    Fermer <X size={16} />
                  </button>
                </div>
                <div className="px-6 pb-6 pt-2 space-y-3">
                  {FAQ.map((item, idx) => (
                    <div key={idx} className="border-b border-gray-200 py-2">
                      <button
                        className="w-full flex justify-between items-center text-left font-semibold text-gray-800 focus:outline-none focus:text-pink-600 transition-colors"
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        aria-expanded={openIndex === idx}
                        aria-controls={`faq-panel-${idx}`}
                      >
                        <span>{item.question}</span>
                        {openIndex === idx ? <ChevronUp size={18} className="min-w-[18px] flex-shrink-0" /> : <ChevronDown size={18} className="min-w-[18px] flex-shrink-0" />}
                      </button>
                      <AnimatePresence initial={false}>
                        {openIndex === idx && (
                          <motion.div
                            id={`faq-panel-${idx}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-gray-600 text-sm mt-2 pl-1 pr-2"
                          >
                            {item.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackWidget;
