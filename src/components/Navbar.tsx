import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transparent = isHome && !scrolled && !mobileOpen;

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/mes-prestations', label: 'Prestations' },
    { to: '/#offres', label: 'Mes offres' },
    { to: '/emma', label: 'Emma' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent py-6'
          : 'bg-background/95 backdrop-blur-md shadow-sm py-4 border-b border-border'
      }`}
    >
      <div className="w-full px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo L'échappée d'Emma" className="w-8 h-8 object-contain" loading="lazy" width="32" height="32" />
          <Link
            to="/"
            className={`text-xl font-serif tracking-tight font-bold transition-colors ${
              transparent ? 'text-primary-foreground' : 'text-foreground'
            }`}
          >
            L'échappée <span className="italic font-normal">d'</span>Emma
          </Link>
        </div>

        {/* Desktop nav */}
        <div className={`hidden md:flex gap-8 items-center text-sm font-medium ${
          transparent ? 'text-primary-foreground/90' : 'text-muted-foreground'
        }`}>
          {links.map((link) => {
            const isHash = link.to.includes('#');
            const handleClick = (e: React.MouseEvent) => {
              if (isHash) {
                e.preventDefault();
                const hash = link.to.split('#')[1];
                if (isHome) {
                  document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate(link.to);
                }
              }
            };
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleClick}
                className={`hover:text-accent transition-colors ${
                  location.pathname === link.to ? 'text-accent font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/devis"
            className="bg-accent text-accent-foreground px-6 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Débuter mon échappée
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 ${transparent ? 'text-primary-foreground' : 'text-foreground'}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="px-6 py-6 space-y-4">
              {links.map((link) => {
                const isHash = link.to.includes('#');
                const handleClick = (e: React.MouseEvent) => {
                  setMobileOpen(false);
                  if (isHash) {
                    e.preventDefault();
                    const hash = link.to.split('#')[1];
                    if (isHome) {
                      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigate(link.to);
                    }
                  }
                };
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={handleClick}
                    className="block text-foreground font-medium py-2 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              <Link
                to="/devis"
                onClick={() => setMobileOpen(false)}
                className="block bg-accent text-accent-foreground px-6 py-3 rounded-full text-center font-bold"
              >
                Débuter mon échappée
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
