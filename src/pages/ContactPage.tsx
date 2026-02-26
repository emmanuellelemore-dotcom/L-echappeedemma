import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import emailjs, { EMAILJS_CONFIG } from '../lib/emailjs';

const CONTACT_EMAIL = 'hello-lechappeedemma@gmail.com';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error('Veuillez remplir les champs obligatoires.');
      return;
    }

    try {
      setIsSubmitting(true);
      
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_CONTACT,
        {
          from_name: name,
          from_email: email,
          phone: phone || 'Non renseigné',
          subject: subject || 'Demande de contact',
          message: message,
        }
      );

      toast.success('Message envoye. Nous vous repondrons rapidement.');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (error) {
      toast.error('Une erreur est survenue. Reessayez plus tard.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Téléphone', value: '06 78 21 88 23', href: 'tel:+33678218823' },
    { icon: Mail, label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { icon: MapPin, label: 'Adresse', value: '94370 Sucy-en-Brie, France', href: undefined },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Contactez <span className="italic text-accent">Moi</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Une question ? Un projet de voyage ? Je suis à votre écoute.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-8 bg-card border rounded-3xl shadow-sm hover:shadow-md transition-shadow group"
            >
              <item.icon className="mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" size={32} />
              <p className="font-bold text-foreground">{item.label}</p>
              <p className="text-accent text-sm mt-1">{item.value}</p>
            </motion.a>
          ))}
        </div>

        {/* Contact form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-card p-8 md:p-12 rounded-3xl shadow-sm border space-y-6"
        >
          <div className="flex items-center gap-3 text-accent font-bold border-b border-border pb-4">
            <Send size={20} />
            <h2 className="text-lg font-serif">Envoyez-moi un message</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              {/* Ajout id et name pour accessibilité et SEO */}
              <label htmlFor="contact-name" className="text-sm font-semibold text-foreground">Nom complet *</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Nom Prénom"
                className="w-full p-4 bg-muted border-none rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              {/* Ajout id et name pour accessibilité et SEO */}
              <label htmlFor="contact-email" className="text-sm font-semibold text-foreground">Email *</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="@email.com"
                className="w-full p-4 bg-muted border-none rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              {/* Ajout id et name pour accessibilité et SEO */}
              <label htmlFor="contact-phone" className="text-sm font-semibold text-foreground">Téléphone</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="06 12 34 56 78"
                className="w-full p-4 bg-muted border-none rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              {/* Ajout id et name pour accessibilité et SEO */}
              <label htmlFor="contact-subject" className="text-sm font-semibold text-foreground">Sujet</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Objet de votre message"
                className="w-full p-4 bg-muted border-none rounded-xl outline-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Message *</label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Décrivez votre projet ou posez-moi vos questions..."
              className="w-full p-4 bg-muted border-none rounded-xl outline-none resize-none focus:ring-2 ring-accent text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full bg-accent text-accent-foreground font-bold py-5 rounded-2xl shadow-lg hover:opacity-90 transition-opacity active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
          </button>
        </motion.form>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
