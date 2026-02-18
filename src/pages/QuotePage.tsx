import { useRef, useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Plane, Heart, Send } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import emailjs, { EMAILJS_CONFIG } from '../lib/emailjs';

const QuotePage = () => {
  const [budget, setBudget] = useState(3000);
  const budgetInputRef = useRef<HTMLInputElement | null>(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [duration, setDuration] = useState(7);
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState<'Mr' | 'Mme' | ''>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelParty, setTravelParty] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !destination || !departDate) {
      toast.error('Veuillez remplir les champs obligatoires.');
      return;
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
          destination: destination,
          depart_date: departDate,
          return_date: returnDate || 'Non précisée',
          budget: `${budget}€`,
          adults: adults,
          children: children,
          duration: `${duration} jours`,
          travel_party: travelParty || 'Non renseigné',
          description: description || 'Aucune description',
        }
      );

      toast.success('Demande envoyee. Nous revenons vers vous rapidement.');
      setBudget(3000);
      setAdults(0);
      setChildren(0);
      setDuration(7);
      setDestination('');
      setDepartDate('');
      setReturnDate('');
      setDescription('');
      setTitle('');
      setName('');
      setEmail('');
      setPhone('');
      setTravelParty('');
    } catch (error) {
      toast.error('Une erreur est survenue. Reessayez plus tard.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-10"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
                Votre voyage <span className="italic text-accent">sur mesure</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Remplissez ce formulaire et recevez une proposition personnalisée.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-3xl shadow-sm border space-y-8">
              {/* Contact Info */}
              <div className="flex items-center gap-3 text-accent font-bold border-b border-border pb-4">
                <Send size={20} />
                <h2 className="text-lg font-serif">Vos coordonnées</h2>
              </div>

              {/* Titre Mr / Mme */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Titre </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="title"
                      value="Mr"
                      checked={title === 'Mr'}
                      onChange={() => setTitle('Mr')}
                      className="w-5 h-5 accent-accent"
                    />
                    <span className="text-sm text-foreground">Mr</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="title"
                      value="Mme"
                      checked={title === 'Mme'}
                      onChange={() => setTitle('Mme')}
                      className="w-5 h-5 accent-accent"
                    />
                    <span className="text-sm text-foreground">Mme</span>
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Nom complet *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nom Prénom"
                    required
                    className="w-full p-4 bg-muted border-none rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="@email.com"
                    required
                    className="w-full p-4 bg-muted border-none rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Téléphone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 12 34 56 78"
                    className="w-full p-4 bg-muted border-none rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Trip Details */}
              <div className="flex items-center gap-3 text-accent font-bold border-b border-border pb-4 pt-4">
                <Plane size={20} />
                <h2 className="text-lg font-serif">Détails du voyage</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Destination *</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Ex: Islande, Suède..."
                    required
                    className="w-full p-4 bg-muted border-none rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Date de départ</label>
                  <input
                    type="date"
                    value={departDate === 'flexible' || departDate === '' ? '' : departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full p-4 bg-muted border-none rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground"
                  />
                  <div className="flex gap-3 mt-3">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-full font-semibold text-sm transition border ${departDate === '' ? 'bg-accent text-accent-foreground border-accent' : 'bg-muted text-muted-foreground border-border hover:bg-accent/10'} focus:outline-none`}
                      onClick={() => setDepartDate('')}
                    >
                      Je ne sais pas
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-full font-semibold text-sm transition border ${departDate === 'flexible' ? 'bg-accent text-accent-foreground border-accent' : 'bg-muted text-muted-foreground border-border hover:bg-accent/10'} focus:outline-none`}
                      onClick={() => setDepartDate('flexible')}
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
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full p-4 bg-muted border-none rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold text-foreground block">
                  Budget par personne :
                  <input
                    ref={budgetInputRef}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={99999}
                    step={1}
                    aria-valuemin={0}
                    value={budget}
                    onChange={(e) => {
                      const next = Number(e.target.value) || 0;
                      setBudget(Math.min(99999, Math.max(0, next)));
                    }}
                    onFocus={(e) => e.target.select()}
                    style={{ width: `${Math.max(3, String(budget).length + 1)}ch` }}
                    className="ml-2 bg-transparent text-accent text-lg font-bold outline-none focus:ring-2 focus:ring-accent/40 rounded-md px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    aria-label="Budget par personne"
                  />
                  <span className="ml-1 text-accent text-lg font-bold">€</span>
                </label>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="100"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>500 €</span>
                  <span>15 000 €</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Durée (jours)</label>
                  <div className="flex items-center gap-4 bg-muted p-2 rounded-xl">
                    <button type="button" onClick={() => setDuration(Math.max(1, duration - 1))} className="w-10 h-10 bg-background rounded-lg shadow-sm font-bold text-foreground">−</button>
                    <span className="flex-1 text-center font-bold text-foreground">{duration}</span>
                    <button type="button" onClick={() => setDuration(duration + 1)} className="w-10 h-10 bg-background rounded-lg shadow-sm font-bold text-foreground">+</button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Adultes</label>
                  <div className="flex items-center gap-4 bg-muted p-2 rounded-xl">
                    <button type="button" onClick={() => setAdults(Math.max(0, adults - 1))} className="w-10 h-10 bg-background rounded-lg shadow-sm font-bold text-foreground">−</button>
                    <span className="flex-1 text-center font-bold text-foreground">{adults}</span>
                    <button type="button" onClick={() => setAdults(adults + 1)} className="w-10 h-10 bg-background rounded-lg shadow-sm font-bold text-foreground">+</button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Enfants</label>
                  <div className="flex items-center gap-4 bg-muted p-2 rounded-xl">
                    <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="w-10 h-10 bg-background rounded-lg shadow-sm font-bold text-foreground">−</button>
                    <span className="flex-1 text-center font-bold text-foreground">{children}</span>
                    <button type="button" onClick={() => setChildren(children + 1)} className="w-10 h-10 bg-background rounded-lg shadow-sm font-bold text-foreground">+</button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Qui sera du voyage ?</label>
                <input
                  type="text"
                  value={travelParty}
                  onChange={(e) => setTravelParty(e.target.value)}
                  placeholder="Ex: couple, famille, amis, solo, avec animaux..."
                  className="w-full p-4 bg-muted border-none rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2 pt-6 border-t border-border">
                {/* Bloc état d'esprit actuel */}
                <label className="text-sm font-semibold text-foreground">Votre état d'esprit actuel</label>
                <textarea
                  rows={2}
                  placeholder="En un mot ou une phrase, comment vous sentez-vous aujourd'hui et qu'attendez-vous de ce voyage ?"
                  className="w-full p-4 bg-muted border-none rounded-xl outline-none resize-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="w-full bg-accent text-accent-foreground font-bold py-5 rounded-2xl shadow-lg hover:opacity-90 transition-opacity active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
              </button>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
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
