import { useEffect, useRef, useState } from 'react';
import { Gift, ArrowLeft, Sparkles, Volume2, VolumeX, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const snowFlakes = [
  { left: '4%', size: 'text-sm', delay: 0.1, duration: 9.8, drift: 14, opacity: 0.45, blur: 'blur-[0.4px]' },
  { left: '11%', size: 'text-lg', delay: 1.3, duration: 12.5, drift: 20, opacity: 0.55, blur: 'blur-0' },
  { left: '18%', size: 'text-xs', delay: 0.8, duration: 10.2, drift: 12, opacity: 0.42, blur: 'blur-[0.3px]' },
  { left: '26%', size: 'text-xl', delay: 2.4, duration: 13.4, drift: 18, opacity: 0.5, blur: 'blur-0' },
  { left: '34%', size: 'text-sm', delay: 1.1, duration: 11.8, drift: 15, opacity: 0.48, blur: 'blur-[0.4px]' },
  { left: '41%', size: 'text-base', delay: 3.1, duration: 12.9, drift: 16, opacity: 0.44, blur: 'blur-[0.2px]' },
  { left: '49%', size: 'text-xs', delay: 0.4, duration: 9.6, drift: 10, opacity: 0.38, blur: 'blur-[0.4px]' },
  { left: '57%', size: 'text-lg', delay: 2.2, duration: 13.8, drift: 19, opacity: 0.52, blur: 'blur-0' },
  { left: '65%', size: 'text-sm', delay: 1.7, duration: 10.6, drift: 13, opacity: 0.44, blur: 'blur-[0.3px]' },
  { left: '73%', size: 'text-xl', delay: 2.8, duration: 14.2, drift: 22, opacity: 0.56, blur: 'blur-0' },
  { left: '81%', size: 'text-xs', delay: 0.9, duration: 9.9, drift: 12, opacity: 0.4, blur: 'blur-[0.4px]' },
  { left: '89%', size: 'text-base', delay: 1.9, duration: 12.1, drift: 16, opacity: 0.46, blur: 'blur-[0.2px]' },
  { left: '95%', size: 'text-sm', delay: 3.4, duration: 13.1, drift: 14, opacity: 0.42, blur: 'blur-[0.3px]' },
];

const VillageDuPereNoel = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);

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
          <div className="pointer-events-none absolute inset-0">
            {snowFlakes.map((flake) => (
              <motion.span
                key={`${flake.left}-${flake.delay}`}
                className={`absolute top-[-10%] select-none text-white/90 ${flake.size} ${flake.blur}`}
                style={{ left: flake.left, opacity: flake.opacity, textShadow: '0 0 12px rgba(255,255,255,0.18)' }}
                animate={{
                  y: ['0vh', '118vh'],
                  x: [0, flake.drift, -flake.drift * 0.5, flake.drift * 0.25],
                  rotate: [0, 40, -30, 20],
                }}
                transition={{
                  duration: flake.duration,
                  delay: flake.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                ❄
              </motion.span>
            ))}
          </div>
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
                <h1 className="mt-3 text-3xl font-serif text-white md:text-4xl">Village du Pere Noel</h1>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/82 md:text-base">
                  Clique dans le coffret ou sur le bouton en haut a droite pour lancer la musique et entrer dans l'ambiance du Grand Nord.
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
                  {[
                    'Idees cadeaux a glisser sous le sapin',
                    'Ambiance nordique douce et festive',
                    'Future page dediee a une echappee magique',
                  ].map((item) => (
                    <div key={item} className="rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] px-4 py-3 text-sm leading-relaxed text-white/76 shadow-sm backdrop-blur-sm">
                      <div className="flex items-center justify-center gap-2">
                        <Sparkles className="h-4 w-4 text-[#d8b155]" />
                        <span>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    to="/mes-offres"
                    className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/16"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Revenir a Mes Offres
                  </Link>
                  <Link
                    to="/devis"
                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#d53d4d,#b81f34)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Offrir une echappee
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