import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp } from 'lucide-react';


type FAQItem = {
  question: string;
  answer: string | string[];
};

type FAQSection = {
  title: string;
  intro?: string;
  items: FAQItem[];
};

const ANSWER_PREVIEW_LENGTH = 260;

const getAnswerText = (answer: FAQItem['answer']) =>
  Array.isArray(answer) ? answer.join(' ') : answer;

const truncateAnswer = (text: string) => {
  if (text.length <= ANSWER_PREVIEW_LENGTH) return text;
  return `${text.slice(0, ANSWER_PREVIEW_LENGTH).trimEnd()}…`;
};

const FAQ_SECTIONS: FAQSection[] = [
  {
    title: "L’Âme de l’Échappée",
    items: [
      {
        question: "Qu’est-ce qu’un Travel Planner et pourquoi passer par moi ?",
        answer:
          "C’est un architecte de voyage indépendant. Contrairement à une agence classique, je n’ai pas de catalogue imposé ni de commissions cachées. Je consacre des dizaines d’heures à concevoir un itinéraire qui n’appartient qu’à vous. Passer par moi, c’est déléguer toute la charge mentale de l’organisation pour ne garder que le plaisir du départ.",
      },
      {
        question: "Pourquoi choisir L’Échappée d’Emma en particulier ?",
        answer:
          "Parce que je sais ce que signifie avoir besoin de reprendre son souffle. Pour avoir moi-même traversé des tempêtes personnelles, j’ai compris que le voyage est parfois le seul remède pour se retrouver et marquer un nouveau départ. Je ne conçois pas seulement des itinéraires, mais de véritables parenthèses de résilience. Mon expertise du Grand Nord s’accompagne d’une écoute sincère : je dessine votre échappée avec la sensibilité de celle qui sait l’importance de se sentir à nouveau vivant, loin du bruit du monde.",
      },
      {
        question: "Qu’entendez-vous par “Tournant de vie” ?",
        answer:
          "Parce qu’un voyage à un tournant de vie soulève souvent autant de questions que d’émotions, j’ai rassemblé ici les réponses pour vous aider à préparer votre échappée en toute sérénité.",
      },
    ],
  },
  {
    title: "Tournant de vie",
    items: [
      {
        question: "Qu’est-ce qu’un tournant de vie ?",
        answer: [
          "C’est ce moment de bascule, souvent intense, où l’on ressent le besoin viscéral de marquer le coup. C’est le point de rencontre entre la fin d’un chapitre et l’incertitude du suivant. Que ce soit une transition choisie ou une épreuve imposée par la vie, c’est l’instant où l’on a besoin de clore une page pour pouvoir enfin en écrire une nouvelle, avec plus de clarté et de sérénité.",
          "Ces moments où le besoin de souffle se fait sentir : renouveau après la maladie ; nouveau départ professionnel (burn-out, reconversion, retraite) ; transition personnelle (séparation, deuil, syndrome du nid vide) ; changement de cap à un âge symbolique ; urgence de vivre après une épreuve.",
          "Si ce texte résonne en vous, c’est que vous êtes au bon endroit. Mon rôle est de préparer le terrain pour que cette transition se fasse dans la douceur et la splendeur du Nord.",
        ],
      },
      {
        question: "Et si mon “souffle” se trouve ailleurs que dans le Grand Nord ?",
        answer: [
          "Mon approche de la sérénité n’a pas de frontières. Je peux aussi vous accompagner sur des destinations que j’ai moi-même parcourues : Polynésie, Réunion, Thaïlande, Algarve, Lisbonne, Croatie, Bretagne, Côte d’Opale et Baie de Somme.",
          "Sur ces terres, je ne prétends pas être une experte locale : je les ai foulées en tant que voyageuse. En revanche, j’y applique la même rigueur de recherche, la même quête de pépites et la même attention à votre rythme.",
          "Pour toute destination que je n’ai jamais visitée, un supplément de recherche pourra être appliqué afin de garantir un niveau de personnalisation à la hauteur de vos attentes.",
        ],
      },
    ],
  },
  {
    title: "Mes Offres & Votre Accompagnement",
    items: [
      {
        question: "Qu’est-ce que la Parenthèse Inspiration ?",
        answer:
          "C’est une heure de visio-conseil pour ceux qui ont déjà organisé une partie de leur voyage ou qui veulent garder une part d’improvisation (notamment en van). Je valide votre projet et réponds à vos questions techniques. Vous repartez avec un PDF Boussole incluant mes cartes mémos.",
      },
      {
        question: "Qu’est-ce que la Parenthèse Sérénité ?",
        answer:
          "C’est la création de votre itinéraire de A à Z. Je conçois un programme sur-mesure et vous fournis un carnet de voyage PDF détaillé avec votre programme jour par jour et tous vos liens de réservation.",
      },
      {
        question: "Est-il possible de ne déléguer qu’une partie du voyage ?",
        answer:
          "Oui. Si vous avez déjà vos vols, je peux intervenir uniquement sur la recherche des hébergements et des activités pour compléter votre Parenthèse Sérénité.",
      },
      {
        question: "Combien de modifications puis-je demander sur mon projet ?",
        answer:
          "Après notre appel découverte et votre questionnaire d’exploration, je crée votre proposition initiale. Nous pouvons effectuer jusqu’à deux ajustements, tant qu’ils restent cohérents avec vos besoins de départ.",
      },
    ],
  },
  {
    title: "Logistique & Sérénité",
    items: [
      {
        question: "Comment se passe la réservation ?",
        answer:
          "Le métier de Travel Planner est encadré par des règles précises. Contrairement à une agence de voyage classique, je ne réserve pas les prestations à votre place. Je vous transmets les liens directs et vous gardez la main sur vos paiements, assurances et conditions.",
      },
      {
        question: "Pourquoi est-ce un avantage précieux pour vous ?",
        answer:
          "Transparence absolue, zéro catalogue imposé et vrai cousu-main : vous payez le prix réel des prestataires, sans commission cachée, et chaque choix est guidé uniquement par vos besoins.",
      },
      {
        question: "Le budget pour le Grand Nord est-il accessible ?",
        answer:
          "Oui. La réputation de destination coûteuse est réelle, mais il existe des solutions pour chaque budget. Mon rôle est d’optimiser vos dépenses pour que le rêve reste accessible sans sacrifier votre confort.",
      },
      {
        question: "J’ai peur d’avoir froid ou d’être bloqué par la météo, est-ce une barrière ?",
        answer:
          "La météo fait partie de la magie du Nord. Dans votre carnet, je vous explique l’équipement (règle des 3 couches) et je vous donne les sites et applications officiels pour suivre météo et routes en temps réel afin d’ajuster vos journées en sécurité.",
      },
      {
        question: "Pour un séjour en van, ai-je besoin d’un Travel Planner ?",
        answer:
          "Tout dépend de votre besoin de cadre. Pour une première expérience, déléguer la logistique (ferries, spots, gabarit) est rassurant. Si vous voulez conserver un maximum de liberté, la Parenthèse Inspiration est souvent le meilleur compromis.",
      },
      {
        question: "Proposez-vous des voyages de dernière minute ou des grands week-ends ?",
        answer:
          "Oui, selon mes disponibilités. Pour la dernière minute, un supplément tarifaire peut s’appliquer car l’organisation express mobilise beaucoup de recherche en peu de temps.",
      },
      {
        question: "Combien de temps à l’avance dois-je vous solliciter ?",
        answer:
          "Idéalement 6 à 12 mois pour les périodes très demandées (Noël, aurores boréales) et 4 à 6 mois pour les autres projets. Les demandes urgentes restent possibles selon mes disponibilités.",
      },
      {
        question: "Je ne parle pas anglais, est-ce un problème ?",
        answer:
          "Pas du tout. Je fournis les phrases clés, des applications simples et un carnet très détaillé. Je privilégie aussi, dès que possible, des hôtes ou guides francophones.",
      },
      {
        question: "Y a-t-il une assistance sur place pendant mon voyage ?",
        answer:
          "Je ne peux pas assurer un support 24h/24 comme une agence, mais je prépare un carnet-boussole très complet (urgences, contacts, procédures, conseils) pour que vous soyez autonome et serein face aux imprévus.",
      },
      {
        question: "Et si un problème de santé survient pendant mon voyage ?",
        answer:
          "Nous abordons ce sujet dès l’appel découverte. Je peux adapter l’itinéraire, référencer les infrastructures médicales utiles et vous orienter vers des assurances spécialisées (Chapka, ACS) si nécessaire.",
      },
      {
        question: "Jusqu’à combien de personnes pouvez-vous organiser un voyage ?",
        answer:
          "J’accompagne surtout les voyageurs solo, couples et petites familles jusqu’à 5 personnes. À partir de 6, c’est possible avec une organisation dédiée et un interlocuteur référent unique.",
      },
      {
        question: "Puis-je offrir une Échappée en cadeau ?",
        answer:
          "Oui. Vous choisissez la formule, puis je vous envoie une carte cadeau personnalisée (numérique ou papier). Le bénéficiaire a 1 an pour activer son échappée et définir son projet avec moi.",
      },
      {
        question: "Vous n’avez pas trouvé la réponse à votre question ?",
        answer: [
          "Je suis à votre écoute pour répondre à vos doutes et construire votre échappée.",
          "Téléphone : 06 78 21 88 23",
          "Email : hello-lechappeedemma@gmail.com",
          "Instagram : @lechappee_demma",
        ],
      },
    ],
  },
];


const FeedbackWidget = () => {

  const [showBubble, setShowBubble] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [expandedAnswers, setExpandedAnswers] = useState<Record<string, boolean>>({});
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

  useEffect(() => {
    if (!showModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showModal]);

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
              <div className="w-[92vw] max-w-3xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto pointer-events-auto">
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
                <div className="px-6 pb-6 pt-2 space-y-6">
                  {FAQ_SECTIONS.map((section, sectionIndex) => (
                    <div key={section.title} className="space-y-2">
                      <h3 className="text-lg font-bold text-[#1e3a5f]">{section.title}</h3>
                      {section.intro && <p className="text-sm text-gray-600">{section.intro}</p>}

                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => {
                          const itemId = `${sectionIndex}-${itemIndex}`;
                          const isOpen = openId === itemId;
                          const isExpanded = !!expandedAnswers[itemId];
                          const fullAnswerText = getAnswerText(item.answer);
                          const isLongAnswer = fullAnswerText.length > ANSWER_PREVIEW_LENGTH;
                          const previewText = truncateAnswer(fullAnswerText);

                          return (
                            <div key={itemId} className="border-b border-gray-200 py-2">
                              <button
                                className="w-full flex justify-between items-center text-left font-semibold text-gray-800 focus:outline-none focus:text-pink-600 transition-colors"
                                onClick={() => setOpenId(isOpen ? null : itemId)}
                                aria-expanded={isOpen}
                                aria-controls={`faq-panel-${itemId}`}
                              >
                                <span>{item.question}</span>
                                {isOpen ? <ChevronUp size={18} className="min-w-[18px] flex-shrink-0" /> : <ChevronDown size={18} className="min-w-[18px] flex-shrink-0" />}
                              </button>

                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    id={`faq-panel-${itemId}`}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-gray-600 text-sm mt-2 pl-1 pr-2 space-y-2"
                                  >
                                    {isExpanded ? (
                                      Array.isArray(item.answer) ? (
                                        item.answer.map((paragraph, paragraphIndex) => (
                                          <p key={paragraphIndex}>{paragraph}</p>
                                        ))
                                      ) : (
                                        <p>{item.answer}</p>
                                      )
                                    ) : (
                                      <p>{previewText}</p>
                                    )}

                                    {isLongAnswer && (
                                      <button
                                        type="button"
                                        className="text-pink-600 font-semibold hover:text-pink-700 transition-colors"
                                        onClick={() =>
                                          setExpandedAnswers((prev) => ({
                                            ...prev,
                                            [itemId]: !isExpanded,
                                          }))
                                        }
                                      >
                                        {isExpanded ? 'Voir moins' : 'Lire la suite'}
                                      </button>
                                    )}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
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
