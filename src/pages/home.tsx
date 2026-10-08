import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Play, Info, Heart } from 'lucide-react';

const phases = [
  "Payton.",
  "I could have just sent a text.",
  "But you deserve better production value.",
  "MAIN"
];

export default function Home() {
  const [phase, setPhase] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (phase < 3) {
      const delays = [2000, 2500, 2500];
      const timer = setTimeout(() => {
        setPhase(p => p + 1);
      }, delays[phase]);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleNoHover = () => {
    setNoHoverCount(prev => prev + 1);
    // Keep the button somewhat nearby so it doesn't fly off screen
    const x = (Math.random() - 0.5) * 150;
    const y = (Math.random() - 0.5) * 150;
    setNoPosition({ x, y });
  };

  const getNoText = () => {
    if (noHoverCount === 0) return "I'm busy";
    if (noHoverCount === 1) return "Nice try";
    if (noHoverCount === 2) return "Not happening";
    if (noHoverCount === 3) return "Stop dodging";
    return "Yes"; // Eventually it turns into a Yes
  };

  if (yesPressed) {
    return (
      <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-serif italic text-white tracking-tight">
            Perfect.
          </h1>
          <p className="text-xl text-muted-foreground font-light">
            I'll get the popcorn ready.
          </p>
          <div className="pt-8 flex justify-center">
            <Heart className="w-8 h-8 text-primary animate-pulse fill-primary" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background overflow-hidden relative text-foreground">
      <AnimatePresence mode="wait">
        {phase < 3 ? (
          <motion.div
            key={phase}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center px-6 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif italic text-white/90">
              {phases[phase]}
            </h1>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full min-h-screen flex flex-col pb-24"
          >
            {/* Hero Section */}
            <div className="relative w-full h-[70vh] md:h-[80vh] shrink-0">
              <div className="absolute inset-0 bg-[#0a0a0c]">
                <img 
                  src="/living-room.jpg" 
                  alt="Atmosphere" 
                  className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:px-24 space-y-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-primary font-bold tracking-[0.2em] text-xs md:text-sm uppercase">Original Production</span>
                  </div>
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white tracking-tighter mb-4">
                    Netflix <span className="italic text-primary">&</span> Chill
                  </h1>
                  <p className="text-lg md:text-xl text-white/80 max-w-2xl font-light leading-relaxed">
                    A highly anticipated evening of minimal conversation, maximum comfort, and entirely too many snacks. Starring Payton & Yours Truly.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-8">
                    <button 
                      onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-8 py-3.5 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors flex items-center gap-2"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      RSVP Now
                    </button>
                    <button 
                      onClick={() => document.getElementById('vibes')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-8 py-3.5 bg-white/10 backdrop-blur-md text-white border border-white/20 font-semibold rounded hover:bg-white/20 transition-colors flex items-center gap-2"
                    >
                      <Info className="w-5 h-5" />
                      More Info
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* The Vibes Carousel */}
            <div id="vibes" className="w-full px-6 md:px-12 lg:px-24 py-20 space-y-8 relative z-10 bg-background">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-medium text-white"
              >
                Choose Your Vibe
              </motion.h2>
              <div className="flex overflow-x-auto pb-8 gap-6 snap-x hide-scrollbar">
                {[
                  {
                    title: "The Cinephile",
                    desc: "We actually pay attention to the plot. Phones down. Highbrow commentary only.",
                    match: "98% Match",
                    duration: "2h 14m"
                  },
                  {
                    title: "The Critic",
                    desc: "We talk over the entire movie and completely ruin the director's vision.",
                    match: "95% Match",
                    duration: "1h 50m"
                  },
                  {
                    title: "The 'Just Chilling'",
                    desc: "The TV is essentially just an expensive nightlight at this point.",
                    match: "99% Match",
                    duration: "4h 00m"
                  }
                ].map((vibe, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
                    className="shrink-0 w-[300px] md:w-[360px] aspect-[4/3] bg-white/5 rounded-xl border border-white/10 p-6 flex flex-col justify-end snap-start hover:bg-white/10 hover:border-white/20 transition-all group cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-primary text-sm font-semibold">{vibe.match}</span>
                        <span className="text-white/50 text-xs border border-white/20 px-1.5 py-0.5 rounded">{vibe.duration}</span>
                      </div>
                      <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-primary transition-colors">{vibe.title}</h3>
                      <p className="text-sm text-white/70 leading-relaxed">{vibe.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* The Final Ask */}
            <div id="rsvp" className="w-full px-6 py-32 flex flex-col items-center justify-center text-center space-y-16 relative z-10 bg-background">
              <div className="max-w-2xl mx-auto space-y-6">
                <h2 className="text-5xl md:text-7xl font-serif italic text-white tracking-tight">So, Payton...</h2>
                <p className="text-xl md:text-2xl text-white/60 font-light">Are you coming over?</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[120px] w-full max-w-md mx-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setYesPressed(true)}
                  className="px-12 py-4 bg-primary text-white rounded-full font-medium text-lg hover:bg-primary/90 transition-colors shadow-[0_0_40px_-10px_rgba(225,29,72,0.6)] z-10 whitespace-nowrap"
                >
                  Yes, obviously
                </motion.button>
                
                <motion.button
                  animate={{ 
                    x: noPosition.x, 
                    y: noPosition.y,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onHoverStart={handleNoHover}
                  onClick={(e) => {
                    if (noHoverCount < 4) {
                      e.preventDefault();
                      handleNoHover();
                    } else {
                      setYesPressed(true);
                    }
                  }}
                  className={cn(
                    "px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-medium transition-colors z-20 whitespace-nowrap",
                    noHoverCount >= 4 && "bg-primary border-primary hover:bg-primary/90 shadow-[0_0_40px_-10px_rgba(225,29,72,0.6)]"
                  )}
                >
                  {getNoText()}
                </motion.button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
