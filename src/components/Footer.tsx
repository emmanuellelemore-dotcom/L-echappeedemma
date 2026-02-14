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
              Qui sommes-nous ?
              <ChevronDown size={14} className={`transition-transform duration-300 ${showAbout ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showAbout ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                L'échappée d'Emma est une agence de voyage sur mesure spécialisée dans les destinations nordiques.
                Passionnés par les grands espaces scandinaves, nous créons des itinéraires uniques et authentiques
                pour vous faire vivre des expériences inoubliables en Islande, Norvège, Suède et Finlande.
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

          {/* Paiements */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Paiements</h4>
            <div className="border-t border-dashed border-primary-foreground/20 mb-4" />
            <div className="flex items-center gap-3">
              <div className="border border-primary-foreground/30 rounded px-2 py-1">
                <span className="text-[10px] font-bold text-primary-foreground tracking-wider">VISA</span>
              </div>
              <div className="border border-primary-foreground/30 rounded px-2 py-1">
                <span className="text-[10px] font-bold text-primary-foreground">MasterCard</span>
              </div>
              <div className="border border-primary-foreground/30 rounded px-1.5 py-1">
                <span className="text-[9px] font-bold text-primary-foreground leading-tight block">AMERICAN<br/>EXPRESS</span>
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
