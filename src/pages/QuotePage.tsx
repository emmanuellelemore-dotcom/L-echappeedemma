import { useRef, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, PenLine, Plane, Heart } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import emailjs, { EMAILJS_CONFIG } from '../lib/emailjs';

const offerOptions = [
  { value: '', label: 'Choisir une offre...' },
  { value: 'je_ne_sais_pas', label: 'Je ne sais pas encore (Je me laisse guider)' },
  { value: 'etincelle', label: "L'Étincelle (Visio-conseil 1h)" },
  { value: 'escale', label: "L'Escale (Séjour court 4-5 jours)" },
  { value: 'ancrage', label: "L'Ancrage (7 à 10 jours – Je pose mes valises)" },
  { value: 'trace', label: 'Le Tracé (Itinéraire Vanlife)' },
  { value: 'traversee', label: 'La Traversée (Itinérance 10 j ou plus)' },
  { value: 'boreal', label: 'Le Boréal (Séjour thématique hiver/aurores)' },
];

const QuotePage = () => {
  const [budget, setBudget] = useState(3000);
  const budgetInputRef = useRef<HTMLInputElement | null>(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [duration, setDuration] = useState(7);
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [departPreference, setDepartPreference] = useState<'unknown' | 'flexible' | ''>('');
  const [returnDate, setReturnDate] = useState('');
  const [mindset, setMindset] = useState('');
  const [selectedOffer, setSelectedOffer] = useState('');
  const [title, setTitle] = useState<'Mr' | 'Mme' | ''>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelParty, setTravelParty] = useState('');
  // Champs conditionnels L'Étincelle
  const [objectifPrioritaire, setObjectifPrioritaire] = useState('');
  const [etatAvancement, setEtatAvancement] = useState('');
  const [plusGrandeCrainte, setPlusGrandeCrainte] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEtincelle = selectedOffer === 'etincelle';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Veuillez remplir les champs obligatoires (nom et email).');
      return;
    }
    if (adults < 1) {
      toast.error('Veuillez indiquer au moins 1 adulte avant l’envoi.');
      return;
    }
    if (!mindset.trim()) {
      toast.error('Veuillez renseigner votre état d’esprit actuel.');
      return;
    }
    if (!selectedOffer) {
      toast.error('Veuillez sélectionner le format de votre échappée.');
      return;
    }
    if (isEtincelle) {
      if (!objectifPrioritaire.trim() || !etatAvancement.trim() || !plusGrandeCrainte.trim()) {
        toast.error('Pour l’offre L’Étincelle, merci de compléter les 3 questions préparatoires.');
        return;
      }
    }
    try {
      setIsSubmitting(true);
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_QUOTE,
        {
          title: title || 'Non précisé',
          client_name: name,
          client_email: email,
          client_phone: phone || 'Non renseigné',
          destination: destination || 'Non précisée',
          depart_date:
            departDate ||
            (departPreference === 'unknown'
              ? 'Je ne sais pas'
              : departPreference === 'flexible'
                ? 'Je suis flexible'
                : 'Non précisée'),
          return_date: returnDate || 'Non précisée',
          budget: `${budget}€`,
          adults,
          children: children === 0 ? 'Non renseigné' : children,
          duration: duration === 0 ? 'Non précisée' : `${duration} jours`,
          travel_party: travelParty || 'Non renseigné',
          selected_offer: offerOptions.find(o => o.value === selectedOffer)?.label || 'Non précisée',
          mindset: mindset || 'Non renseigné',
          objectif_prioritaire: isEtincelle ? (objectifPrioritaire || 'Non renseigné') : '-',
          etat_avancement: isEtincelle ? (etatAvancement || 'Non renseigné') : '-',
          plus_grande_crainte: isEtincelle ? (plusGrandeCrainte || 'Non renseigné') : '-',
        }
      );
      toast.success('Votre esquisse a bien été transmise. Je vous recontacte rapidement !');
      setBudget(3000); setAdults(0); setChildren(0); setDuration(7);
      setDestination(''); setDepartDate(''); setDepartPreference(''); setReturnDate('');
      setMindset(''); setSelectedOffer(''); setTitle('');
      setName(''); setEmail(''); setPhone(''); setTravelParty('');
      setObjectifPrioritaire(''); setEtatAvancement(''); setPlusGrandeCrainte('');
    } catch {
      toast.error('Une erreur est survenue. Réessayez plus tard.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12 items-start">

        {/* Colonne principale (formulaire) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          {/* Titre */}
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-3">
            Dessinons les contours{' '}
            <span className="italic text-accent">de votre échappée</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed">
            Confiez-moi vos premières envies. Elles sont le point de départ pour concevoir ensemble l'échappée nordique qui vous ressemble.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Section 1 – Faisons connaissance */}
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-2 text-accent font-semibold text-base border-b border-border pb-4">
                <Send size={18} />
                <span>Faisons connaissance</span>
              </div>

              {/* Titre Mr / Mme */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Titre *</label>
                <div className="flex items-center gap-6">
                  {(['Mr', 'Mme'] as const).map((t) => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="title"
                        value={t}
                        checked={title === t}
                        onChange={() => setTitle(t)}
                        className="w-4 h-4 accent-accent"
                      />
                      <span className="text-sm text-foreground">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Nom complet *</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nom Prénom" required className="w-full p-4 bg-muted rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Email *</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="@email.com" required className="w-full p-4 bg-muted rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Téléphone *</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="06 12 34 56 78" className="w-full p-4 bg-muted rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Section 2 – Les contours de votre projet */}
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-2 text-accent font-semibold text-base border-b border-border pb-4">
                <Plane size={18} />
                <span>Les contours de votre projet</span>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Destination</label>
                  <input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Ex: Islande, Suède... (option" className="w-full p-4 bg-muted rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Date de départ</label>
                  <input
                    type="date"
                    value={departDate}
                    onChange={e => {
                      setDepartDate(e.target.value);
                      setDepartPreference('');
                    }}
                    className="w-full p-4 bg-muted rounded-xl outline-none focus:ring-2 ring-accent text-foreground"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setDepartDate('');
                        setDepartPreference('unknown');
                        setReturnDate('');
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition ${departPreference === 'unknown' ? 'bg-accent text-accent-foreground border-accent' : 'bg-muted text-muted-foreground border-border hover:bg-accent/10'}`}
                    >
                      Je ne sais pas
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDepartDate('');
                        setDepartPreference('flexible');
                        setReturnDate('');
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition ${departPreference === 'flexible' ? 'bg-accent text-accent-foreground border-accent' : 'bg-muted text-muted-foreground border-border hover:bg-accent/10'}`}
                    >
                      Je suis flexible
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Date de retour</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={e => setReturnDate(e.target.value)}
                    disabled={departPreference === 'unknown' || departPreference === 'flexible'}
                    className="w-full p-4 bg-muted rounded-xl outline-none focus:ring-2 ring-accent text-foreground disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">
                  Budget par personne :{' '}
                  <input
                    ref={budgetInputRef}
                    type="number"
                    inputMode="numeric"
                    min={0} max={99999} step={1}
                    value={budget}
                    onChange={e => setBudget(Math.min(99999, Math.max(0, Number(e.target.value) || 0)))}
                    onFocus={e => e.target.select()}
                    style={{ width: `${Math.max(3, String(budget).length + 1)}ch` }}
                    className="ml-1 bg-transparent text-accent text-lg font-bold outline-none focus:ring-2 focus:ring-accent/40 rounded-md px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="ml-1 text-accent text-lg font-bold">€</span>
                </label>
                <input type="range" min="500" max="15000" step="100" value={budget} onChange={e => setBudget(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>500 €</span><span>15 000 €</span>
                </div>
              </div>

              {/* Durée / Adultes / Enfants */}
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: 'Durée (jours)', value: duration, setter: setDuration, min: 0, display: (v: number) => v === 0 ? 'Non précisé' : v },
                  { label: 'Adultes *', value: adults, setter: setAdults, min: 0, display: (v: number) => v },
                  { label: 'Enfants', value: children, setter: setChildren, min: 0, display: (v: number) => v === 0 ? 'Aucun' : v },
                ].map(({ label, value, setter, min, display }) => (
                  <div key={label} className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">{label}</label>
                    <div className="flex items-center gap-3 bg-muted p-2 rounded-xl">
                      <button type="button" onClick={() => setter(Math.max(min, value - 1))} className="w-9 h-9 bg-background rounded-lg shadow-sm font-bold text-foreground">−</button>
                      <span className="flex-1 text-center font-bold text-foreground">{display(value)}</span>
                      <button type="button" onClick={() => setter(value + 1)} className="w-9 h-9 bg-background rounded-lg shadow-sm font-bold text-foreground">+</button>
                    </div>
                    {label === 'Durée (jours)' && <p className="text-xs text-muted-foreground">Laisser à zéro si vous ne savez pas.</p>}
                  </div>
                ))}
              </div>

              {/* Qui sera du voyage */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Qui sera du voyage ?</label>
                <input type="text" value={travelParty} onChange={e => setTravelParty(e.target.value)} placeholder="Ex: couple, famille, amis, solo, avec animaux..." className="w-full p-4 bg-muted rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground" />
              </div>
            </div>

            {/* Section 3 – Votre intention de voyage */}
            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-2 text-accent font-semibold text-base border-b border-border pb-4">
                <PenLine size={18} />
                <span>Votre intention de voyage</span>
              </div>

              <p className="text-foreground text-base">Dites-m'en un peu plus sur l'élan qui vous pousse vers le Nord ou autre aujourd'hui.</p>

              {/* État d'esprit */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Votre état d'esprit actuel *</label>
                <textarea required rows={2} value={mindset} onChange={e => setMindset(e.target.value)} placeholder="Ex: besoin de souffler, de changer d'air, de me ressourcer..." className="w-full p-4 bg-muted rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground resize-none" />
              </div>

              {/* Format de l'échappée */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Avez-vous déjà repéré le format de votre échappée ? *</label>
                <select required value={selectedOffer} onChange={e => setSelectedOffer(e.target.value)} className="w-full p-4 bg-muted rounded-xl outline-none focus:ring-2 ring-accent text-foreground cursor-pointer">
                  {offerOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Bloc conditionnel L'Étincelle */}
              <AnimatePresence>
                {isEtincelle && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-secondary/60 border border-accent/30 rounded-2xl p-6 space-y-6 mt-2">
                      <p className="text-foreground text-base">Pour préparer notre heure de conseil, aidez-moi à cerner l'essentiel :</p>
                      <div className="space-y-5">
                        <div>
                          <p className="font-semibold text-foreground mb-1">
                            <span className="text-accent">• L'Objectif Prioritaire :</span>
                          </p>
                          <p className="text-foreground text-sm mb-2">Quel est le point précis que vous souhaitez avoir résolu à la fin de notre heure ensemble ? (Ex : Valider la cohérence de l'itinéraire, choisir entre deux régions, …)</p>
                          <textarea required={isEtincelle} rows={3} value={objectifPrioritaire} onChange={e => setObjectifPrioritaire(e.target.value)} className="w-full p-4 bg-background border border-border rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground resize-none" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-1">
                            <span className="text-accent">• Votre état d'avancement :</span>
                          </p>
                          <p className="text-foreground text-sm mb-2">Qu'avez-vous déjà réservé ou décidé avec certitude ? (Vols, hébergement spécifique, location de véhicule…)</p>
                          <textarea required={isEtincelle} rows={3} value={etatAvancement} onChange={e => setEtatAvancement(e.target.value)} className="w-full p-4 bg-background border border-border rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground resize-none" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-1">
                            <span className="text-accent">• Votre plus grande crainte :</span>
                          </p>
                          <p className="text-foreground text-sm mb-2">Qu'est-ce qui vous freine aujourd'hui dans la validation définitive de votre projet ?</p>
                          <textarea required={isEtincelle} rows={3} value={plusGrandeCrainte} onChange={e => setPlusGrandeCrainte(e.target.value)} className="w-full p-4 bg-background border border-border rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground resize-none" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Citation */}
              <p className="text-center text-foreground/70 italic font-serif text-lg leading-relaxed py-2">
                Chaque échappée commence par un premier mot déposé sur le papier,<br />
                une intention qui devient peu à peu un itinéraire.
              </p>

              {/* La suite du projet */}
              <p className="text-center text-foreground text-sm leading-relaxed border-t border-dashed border-border pt-5">
                <strong>La suite de votre projet :</strong> Dès réception de cette esquisse, je vous contacterai<br className="hidden md:block" />
                pour un échange de 15 minutes afin de faire connaissance et de valider les contours de votre projet.
              </p>
            </div>

            {/* Bouton submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-accent-foreground font-bold py-5 rounded-2xl shadow-lg hover:opacity-90 transition-opacity active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-lg"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Transmettre mon esquisse'}
            </button>

          </form>
        </motion.div>

        {/* Sidebar droite sticky */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="hidden lg:flex flex-col gap-6 sticky top-28"
        >
          <div className="bg-primary text-primary-foreground p-8 rounded-3xl">
            <Heart className="text-accent mb-4" size={32} />
            <h3 className="text-xl font-bold font-serif mb-4">Pourquoi choisir L'Échappée d'Emma ?</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                Écoute structurée : questionnaire approfondi pour respecter votre énergie.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                Force du vécu : je connais les chemins qui aident à se retrouver.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                Itinéraire cousu main : chaque étape adaptée à votre besoin de souffle.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                Sérénité à la carte : guides ou hébergements francophones selon disponibilité.
              </li>
            </ul>
          </div>

          <div className="bg-card p-6 rounded-3xl border">
            <p className="text-sm text-muted-foreground mb-2">Une question ?</p>
            <p className="font-bold text-foreground text-lg">06 78 21 88 23</p>
          </div>
        </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QuotePage;