import { useEffect, useRef, useState } from 'react';
import { Gift, ArrowLeft, Sparkles, Volume2, VolumeX, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VillageDuPereNoel = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [activeStory, setActiveStory] = useState<'village' | 'souvenirs' | 'sur-mesure' | null>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.32;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const startMusic = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      await audio.play();
      setMusicStarted(true);
      setMusicEnabled(true);
    } catch (error) {
      console.error('Unable to start Santa village audio:', error);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (!musicStarted) {
      await startMusic();
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setMusicEnabled(true);
      } catch (error) {
        console.error('Unable to resume Santa village audio:', error);
      }

      return;
    }

    audio.pause();
    setMusicEnabled(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07131f] text-white">
      <Navbar />
      <audio ref={audioRef} src="/Jingle-bells-Version2.mp3" loop preload="auto" />

      <section className="relative min-h-[calc(100vh-3rem)] px-4 pb-20 pt-28 md:px-6 md:pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/pere_noel_secours.PNG"
            alt="Paysage nordique du village du Pere Noel"
            className="h-full w-full object-cover"
          />
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/pere_noel_secours.PNG"
          >
            <source src="/Traineau_du_pere_noel.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,10,18,0.35),rgba(4,10,21,0.58),rgba(7,19,31,0.82))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(162,233,255,0.18),rgba(162,233,255,0)_30%),radial-gradient(circle_at_80%_12%,rgba(255,245,195,0.18),rgba(255,245,195,0)_22%)]" />
        </div>

        <button
          type="button"
          onClick={toggleMusic}
          className="absolute right-4 top-28 z-30 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-colors hover:bg-black/50 md:right-8 md:top-32"
        >
          {musicEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          {musicEnabled ? 'Couper la musique' : musicStarted ? 'Relancer la musique' : 'Lancer la musique'}
        </button>

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="mr-auto overflow-hidden rounded-[2.15rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,20,33,0.34),rgba(7,20,33,0.18))] shadow-[0_22px_56px_rgba(3,10,18,0.24)] backdrop-blur-[4px] md:max-w-[34rem]"
          >
            <div
              className="relative px-5 py-10 md:px-8 md:py-11"
              onClick={() => {
                if (!musicStarted) {
                  void startMusic();
                }
              }}
            >
              <div className="relative mx-auto max-w-xl text-center">
                <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#d8b155]">Ambiance feerique</p>
                <h1 className="mt-3 text-3xl font-serif text-white md:text-4xl">L'échappée d'Emma - Bienvenue au cœur de la féerie polaire, village du père Noël fait par L'Échappée d'Emma</h1>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/82 md:text-base">
                  Laissez-vous porter par le crépitement du feu et le silence de la neige... Ici, la magie de Noël n'est pas qu'une date, c'est un voyage qui commence dès maintenant. Prenez le temps d'explorer cet univers où les souvenirs d'enfance prennent vie.
                </p>

                {!musicStarted && (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      void startMusic();
                    }}
                    className="mx-auto mt-6 inline-flex items-center gap-3 rounded-full bg-[linear-gradient(180deg,#d53d4d,#b81f34)] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_12px_24px_rgba(184,31,52,0.35)] transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    Lancer la musique
                  </button>
                )}

                <div className="mt-6 grid gap-3 md:grid-cols-1">
                  <button
                    type="button"
                    onClick={() => setActiveStory(activeStory === 'village' ? null : 'village')}
                    className="rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] px-4 py-3 text-sm leading-relaxed text-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/15"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#d8b155]" />
                      <span>Bienvenue au Village</span>
                    </span>
                  </button>

                  {activeStory === 'village' && (
                    <p className="rounded-[1.1rem] border border-white/8 bg-black/30 px-4 py-4 text-sm leading-relaxed text-white/82">
                      Laissez-vous porter par les mélodies de Noël et l'éclat des lumières nordiques... Vous êtes ailleurs. Ici, le voyage commence dans la chaleur du partage et la joie des préparatifs. Prenez un instant pour savourer cette parenthèse enchantée.
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveStory(activeStory === 'souvenirs' ? null : 'souvenirs')}
                    className="rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] px-4 py-3 text-sm leading-relaxed text-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/15"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#d8b155]" />
                      <span>Des souvenirs à partager.</span>
                    </span>
                  </button>

                  {activeStory === 'souvenirs' && (
                    <p className="rounded-[1.1rem] border border-white/8 bg-black/30 px-4 py-4 text-sm leading-relaxed text-white/82">
                      Offrez bien plus qu'un voyage : une promesse d'évasion qui fera briller les yeux de chaque génération. Entre rires et magie polaire, créez ensemble ces souvenirs précieux que les enfants emporteront toute leur vie et que les plus grands chériront. À quelques-uns ou avec toute votre tribu, l'aventure commence ici.
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveStory(activeStory === 'sur-mesure' ? null : 'sur-mesure')}
                    className="rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] px-4 py-3 text-sm leading-relaxed text-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/15"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#d8b155]" />
                      <span>L'aventure sur-mesure</span>
                    </span>
                  </button>

                  {activeStory === 'sur-mesure' && (
                    <p className="rounded-[1.1rem] border border-white/8 bg-black/30 px-4 py-4 text-sm leading-relaxed text-white/82">
                      Glissez une enveloppe d'échappée au milieu des cadeaux. Que vous souhaitiez un itinéraire complet, une sélection d'hébergements ou le carnet de vos futures activités, je conçois pour vous ce moment de fête personnalisé. Avec un montant au choix, la surprise commence ici et la magie fera le reste.
                    </p>
                  )}
                </div>

                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    to="/mes-offres"
                    className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/16"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Revenir à Mes Offres
                  </Link>
                  <Link
                    to="/devis"
                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#d53d4d,#b81f34)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Glisser l'échappée sous le sapin
                    <Gift className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VillageDuPereNoel;