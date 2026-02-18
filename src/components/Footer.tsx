import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Présentation */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
              L'échappée <span className="italic font-normal">d'</span>Emma
            </h4>
            <div className="border-t border-dashed border-primary-foreground/20 mb-4" />
            <button
              onClick={() => setShowAbout(!showAbout)}
              className="text-primary-foreground/70 text-sm font-semibold mb-3 flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              Qui suis-je ?
              <ChevronDown size={14} className={`transition-transform duration-300 ${showAbout ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showAbout ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                Je suis Emma, fondatrice de l'Échappée d'Emma, Créatrice d'itinéraires sur-mesure I Travel planner.<br />
                Je suis convaincue qu'à un tournant de vie, on a besoin de ralentir pour se retrouver.<br />
                C’est pour ça que je crée des itinéraires sur-mesure en Islande, Norvège, Suède et Finlande, où je m'occupe de toute la logistique pour vous laisser simplement, reprendre votre souffle.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <div className="border-t border-dashed border-primary-foreground/20 mb-4" />
            <div className="space-y-3">
              <Link to="/" className="block text-primary-foreground/70 hover:text-accent transition-colors text-sm">Accueil</Link>
              <Link to="/emma" className="block text-primary-foreground/70 hover:text-accent transition-colors text-sm">Emma</Link>
              <Link to="/contact" className="block text-primary-foreground/70 hover:text-accent transition-colors text-sm">Contact</Link>
              <Link to="/devis" className="block text-primary-foreground/70 hover:text-accent transition-colors text-sm">Créer mon voyage</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="border-t border-dashed border-primary-foreground/20 mb-4" />
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-accent" />
                <span>06 78 21 88 23</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                <span>hello-lechappeedemma@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-accent" />
                <span>94370 Sucy-en-Brie, France</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center text-xs text-primary-foreground/40">
          © 2026 L'échappée d'Emma. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
