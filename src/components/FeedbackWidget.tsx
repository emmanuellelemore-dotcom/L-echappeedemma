import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import emailjs, { EMAILJS_CONFIG } from '../lib/emailjs';

const STORAGE_KEY = 'feedback_dismissed';

const emojis = [
  { icon: '😠', label: 'Très mécontent' },
  { icon: '😟', label: 'Mécontent' },
  { icon: '😕', label: 'Neutre' },
  { icon: '😊', label: 'Content' },
  { icon: '🤩', label: 'Très content' },
];

const FeedbackWidget = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setShowBubble(false);
    setShowModal(false);
  };

  const openModal = () => {
    setShowBubble(false);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (selectedEmoji === null) return;
    setSending(true);

    try {
      // Utilise le template Contact avec un format adapté pour le feedback
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_FEEDBACK,
        {
          from_name: 'Feedback visiteur',
          from_email: email || 'Non renseigné',
          phone: `Note: ${selectedEmoji + 1}/5 ${emojis[selectedEmoji].icon}`,
          subject: `Feedback client - ${emojis[selectedEmoji].label}`,
          message: comment || 'Aucun commentaire',
        }
      );
      setSent(true);
      setTimeout(() => dismiss(), 2000);
    } catch {
      // silently fail — don't block UX
      setSent(true);
      setTimeout(() => dismiss(), 2000);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating bubble — mascot */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed bottom-6 right-6 z-[60] cursor-pointer group"
            onClick={openModal}
          >
            <div className="relative bg-white rounded-2xl shadow-lg border border-accent bg-accent/10 overflow-hidden flex flex-col items-center hover:shadow-xl transition-shadow w-[130px]">
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismiss();
                }}
                className="absolute top-1 right-1 bg-white/80 backdrop-blur rounded-full p-0.5 shadow border border-gray-200 hover:bg-gray-100 transition-colors z-10"
                aria-label="Fermer"
              >
                <X size={14} />
              </button>

              {/* Image fills the entire top */}
              <div className="w-full bg-pink-50">
                <img
                  src="/chouette_avis.webp"
                  alt="Donnez votre avis"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Text below */}
              <div className="px-2 py-2">
                <span className="text-xs font-bold text-gray-800 text-center leading-tight block">
                  Votre avis nous intéresse !
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[70]"
              onClick={dismiss}
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
              <div className="flex justify-end p-3 pb-0">
                <button
                  onClick={dismiss}
                  className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
                >
                  Fermer <X size={16} />
                </button>
              </div>

              {sent ? (
                <div className="px-6 pb-8 pt-2 text-center">
                  <p className="text-lg font-bold text-gray-800">Merci pour votre retour !</p>
                  <p className="text-sm text-gray-500 mt-1">Votre avis nous aide à nous améliorer.</p>
                </div>
              ) : (
                <div className="px-6 pb-6 pt-2 space-y-5">
                  <h2 className="text-xl font-bold text-gray-900">Votre avis nous intéresse !</h2>

                  {/* Rating */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Le service L'échappée d'Emma répond-il à vos attentes ?
                    </p>
                    <div className="flex gap-2 justify-between">
                      {emojis.map((e, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedEmoji(i)}
                          className={`text-3xl p-2 rounded-xl transition-all ${
                            selectedEmoji === i
                              ? 'bg-pink-100 ring-2 ring-pink-400 scale-110'
                              : 'hover:bg-gray-100'
                          }`}
                          aria-label={e.label}
                        >
                          {e.icon}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
                      <span>Pas du tout</span>
                      <span>Tout à fait</span>
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                      Que pouvons-nous améliorer ?
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-gray-50"
                      placeholder="Vos suggestions..."
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Échangez avec nous sur votre expérience et participez aux futures évolutions !
                    </p>
                    <label className="text-sm text-gray-600 block mb-1.5">
                      Email de contact (facultatif)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ex : @email.com"
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-gray-50"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Votre email ne sera utilisé que pour échanger sur la plateforme et ses futures évolutions.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={dismiss}
                      className="px-5 py-2.5 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      Fermer sans répondre
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={selectedEmoji === null || sending}
                      className="px-5 py-2.5 text-sm font-bold bg-accent text-accent-foreground rounded-full hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sending ? 'Envoi…' : 'Envoyer'}
                    </button>
                  </div>
                </div>
              )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackWidget;
