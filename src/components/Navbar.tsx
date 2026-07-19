import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [offersMenuOpen, setOffersMenuOpen] = useState(false);
  // State pour le menu déroulant mobile Mes offres
  const [mobileOffersOpen, setMobileOffersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transparent = isHome && !scrolled && !mobileOpen;

  // Ajout du lien Blog entre Emma et Contact

  // Sous-menu pour "Mes offres"
  // Sous-menu pour "Mes offres" (deux sections)
  const offersSubmenu = [
    { to: '/mes-offres#cap-au-nord', label: 'Cap au Nord' },
    { to: '/mes-offres#autre-latitudes-experience', label: 'Autre Latitude' },
  ];

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/mes-prestations', label: 'Description de mes services' },
    { to: '/mes-offres', label: 'Mes offres', submenu: offersSubmenu },
    { to: '/emma', label: 'Emma' },
    { to: '/blog', label: 'Blog' },
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
      <div className="w-full px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo L'échappée d'Emma" className="w-8 h-8 object-contain" loading="lazy" width="32" height="32" />
          <Link
            to="/"
            className={`text-3xl tracking-tight transition-colors ${
              transparent ? 'text-primary-foreground' : 'text-foreground'
            }`}
          >
            <span className="font-logo-main">L'échappée </span>
            <span className="font-logo-accent text-[1.22em] leading-none align-middle">d' </span>
            <span className="font-logo-main">Emma</span>
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
            // Sous-menu pour "Mes offres"
            if (link.to === '/mes-offres' && link.submenu) {
              return (
                  <div
                    key={link.to}
                    className="relative group"
                    onMouseEnter={() => setOffersMenuOpen(true)}
                    onMouseLeave={(e) => {
                      // Ne ferme le menu que si la souris sort vraiment du conteneur (ni sur le menu, ni sur le gap, ni sur le lien, ni sur la flèche)
                      const related = e.relatedTarget as HTMLElement | null;
                      if (!related || (!e.currentTarget.contains(related) && !related.closest('.menu-offres-link') && !related.closest('.menu-offres-gap'))) {
                        setOffersMenuOpen(false);
                      }
                    }}
                  >
                    <Link
                      to={link.to}
                      onClick={handleClick}
                      className={`menu-offres-link hover:text-accent transition-colors ${
                        location.pathname === link.to ? 'text-accent font-semibold' : ''
                      }`}
                      style={{ position: 'relative', zIndex: 50 }}
                    >
                      {link.label}
                    </Link>
                    {/* Gap invisible pour éviter la fermeture du menu */}
                    {/* Gap invisible réduit, mais la flèche n'est plus affectée par ce gap */}
                    <div
                      className="menu-offres-gap absolute left-1/2 -translate-x-1/2 mt-0 min-w-[260px] w-[260px] h-44 z-40"
                      style={{ pointerEvents: offersMenuOpen ? 'auto' : 'none' }}
                      onMouseEnter={() => setOffersMenuOpen(true)}
                      onMouseLeave={() => setOffersMenuOpen(false)}
                    />
                  {/* Sous-menu */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 mt-6 min-w-[260px] bg-white border border-[#eab1c6] rounded-2xl shadow-lg py-4 z-50 ${
                      offersMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                    }`}
                    style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.06)' }}
                    onMouseEnter={() => setOffersMenuOpen(true)}
                    onMouseLeave={() => setOffersMenuOpen(false)}
                  >
                    {/* Flèche dorée animée au-dessus du menu */}
                    <div
                      style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', zIndex: 40, pointerEvents: 'none' }}
                    >
                      <svg
                        width="22"
                        height="12"
                        viewBox="0 0 22 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ transform: 'rotate(180deg)' }}
                        className={`transition-opacity duration-300 ease-out ${offersMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                      >
                        <path d="M11 12L0 0H22L11 12Z" fill="#fff" stroke="#eab1c6" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    {link.submenu.map((sublink, idx) => (
                      <Link
                        key={sublink.to}
                        to={sublink.to}
                        className={`group block px-7 pt-4 pb-1 rounded-2xl transition-all duration-150 ${
                          idx === 0 ? 'mb-2' : ''
                        } hover:bg-[linear-gradient(135deg,rgba(219,39,119,0.08),rgba(255,255,255,0.96),rgba(244,114,182,0.12))] hover:shadow-[0_4px_24px_rgba(244,114,182,0.10)]`}
                        style={{ letterSpacing: '0.01em' }}
                      >
                        <div className="text-lg font-bold text-accent/90 group-hover:text-accent/90">{sublink.label}</div>
                        <div className="pb-3 text-xs text-[#1a237e]/40 font-normal group-hover:text-[#1a237e]/40">
                          {idx === 0
                            ? 'Pour celles et ceux qui font l’échappée au Nord'
                            : 'Pour celles et ceux qui veulent une échappée ailleurs que dans le Grand Nord'}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            // ...autres liens
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleClick}
                className={`hover:text-accent transition-colors ${
                  location.pathname === link.to ? 'text-accent font-semibold' : ''
                }`}
              >
                {link.to === '/mes-prestations' ? (
                  <>
                    <span className="lg:hidden">Mes services</span>
                    <span className="hidden lg:inline">Description de mes services</span>
                  </>
                ) : (
                  link.label
                )}
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
                // Ajout du sous-menu pour Mes offres dans le menu mobile avec menu déroulant
                if (link.to === '/mes-offres' && link.submenu) {
                  return (
                    <div key={link.to} className="">
                      <button
                        type="button"
                        onClick={() => setMobileOffersOpen((open) => !open)}
                        className="w-full flex items-center justify-between text-foreground font-medium py-2 hover:text-accent transition-colors focus:outline-none"
                        aria-expanded={mobileOffersOpen}
                        aria-controls="mobile-offres-submenu"
                      >
                        <span>{link.label}</span>
                        <svg
                          className={`ml-2 h-5 w-5 transition-transform duration-200 ${mobileOffersOpen ? 'rotate-90' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      {mobileOffersOpen && (
                        <div id="mobile-offres-submenu" className="ml-4 border-l border-border pl-4">
                          {link.submenu.map((sublink, idx) => (
                            <Link
                              key={sublink.to}
                              to={sublink.to}
                              onClick={e => {
                                setMobileOpen(false);
                                if (location.pathname === '/mes-offres' && sublink.to.includes('#')) {
                                  e.preventDefault();
                                  const hash = sublink.to.split('#')[1];
                                  setTimeout(() => {
                                    if (hash === 'cap-au-nord') {
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    } else {
                                      const el = document.getElementById(hash);
                                      if (el) {
                                        el.scrollIntoView({ behavior: 'smooth' });
                                      }
                                    }
                                  }, 50);
                                }
                              }}
                              className="block text-muted-foreground py-1.5 text-[0.98em] hover:text-accent transition-colors"
                            >
                              {sublink.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={handleClick}
                    className="block text-foreground font-medium py-2 hover:text-accent transition-colors"
                  >
                    {link.to === '/mes-prestations' ? 'Mes services' : link.label}
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
