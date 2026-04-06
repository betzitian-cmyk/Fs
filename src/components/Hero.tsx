import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, Zap, Target, Shield } from 'lucide-react';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const springConfig = {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  };

  const smoothProgress = useSpring(scrollYProgress, springConfig);
  const y = useTransform(smoothProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Decorative elements parallax
  const decorY1 = useTransform(smoothProgress, [0, 1], ["0%", "-150%"]);
  const decorY2 = useTransform(smoothProgress, [0, 1], ["0%", "-100%"]);
  const decorRotate = useTransform(smoothProgress, [0, 1], [0, 45]);

  return (
    <section id="home" ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center bg-zinc-950">
      {/* Background Layer */}
motion.div style={{ y, scale }} className="absolute inset-0 z-0">
div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/60 to-zinc-950 z-10"/>
        <img 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1920&auto=format&fit=crop"
          alt="NFL Stadium Action"
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
      </motion.div>

      {/* Yard Lines Overlay */}
div className="absolute inset-0 z-[5] opacity-10 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div 
            key={i} 
            style={{ 
              y: useTransform(smoothProgress, [0, 1], [0, (i + 1) * -100]) 
            }}
            className="absolute left-0 right-0 h-px bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            css={{ top: `${i * 10}%` }}
          />
div>

      {/* Floating Decorative Elements */}
      <motion.div 
        style={{ y: decorY1, rotate: decorRotate }} 
        className="absolute top-1/4 left-10 md:left-20 z-10 text-blue-500/20 hidden md:block" 
      >
        <Zap size={120} strokeWidth={1} />
      </motion.div>

      <motion.div 
        style={{ 
          y: decorY2, 
          rotate: -decorRotate 
        }} 
        className="absolute bottom-1/4 right-10 md:right-20 z-10 text-blue-600/20 hidden md:block" 
      >
        <Target size={160} strokeWidth={1}motion.div>

motion.div 
        style={{ y: decorY1, x: 50 }} 
        className="absolute top-1/3 right-1/4 z-10 text-white/5 hidden lg:block" 
      >
       Shield size={200} strokeWidth={0.5} />
     motion.div>

      {/* Content Layer */}
     motion.div style={{ opacity, y: textY }}
        className="relative z-20 text-center px-6 max-w-5xl"
      >
       motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm"
          >
            Spring Season 2026 Registration Open
         motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter uppercase italic leading-[0.85] mb-8">
           div className="overflow-hidden">
             motion.span
                initial={{ y: "100%", skewY: 10 }}
                animate={{ y: 0, skewY: 0 }}
                transition={{ 
                  duration: 1, 
                  ease: [0.33, 1, 0.68, 1], 
                  delay: 0.2 
                }}
                className="block origin-left"
              >
                Take
              </motion.span>
              
             motion.span
                className="text-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]"
              >
                Flight
             motion.span>
           div>
            
           div className="overflow-hidden">
             motion.span
                initial={{ y: "100%", skewY: 10 }}
                animate={{ y: 0, skewY: 0 }}
                transition={{ 
                  duration: 1, 
                  ease: [0.33, 1, 0.68, 1], 
                  delay: 0.3 
                }}
                className="block origin-left"
              >
                On The Field
             motion.span>
           div>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Elite youth football training designed to elevate your game. Join the premier league where champions are forged and skills take flight.
         motion.p>

         motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-600/20"
            >
              Join the League
ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
motion.button>
            motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(39, 39, 42, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-zinc-800/50 hover:bg-zinc-800 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all border border-zinc-700 backdrop-blur-sm"
            >
              View Schedule
           motion.button>
          </motion.div>
       motion.div>
     motion.div>

      {/* Animated Scan Line */}
      <motion.div
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-30 pointer-events-none"
      />

      {/* Scroll Indicator */}
     motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">span>
          <div className="w-6 h-10 border-2 border-zinc-800 rounded-full flex justify-center p-1">
           motion.div
              animate={{ 
                height: [4, 12, 4], 
                opacity: [1, 0.5, 1] 
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 bg-blue-500 rounded-full"
            />
         div>
motion.div>
     motion.div>
   section>
  );
};

export default Hero;
      </div>

      {/* Floating Decorative Elements */}
      <motion.div 
        style={{ y: decorY1, rotate: decorRotate }}
        className="absolute top-1/4 left-10 md:left-20 z-10 text-blue-500/20 hidden md:block"
      >
        <Zap size={120} strokeWidth={1} />
      </motion.div>
      <motion.div 
        style={{ y: decorY2, rotate: -decorRotate }}
        className="absolute bottom-1/4 right-10 md:right-20 z-10 text-blue-600/20 hidden md:block"
      >
        <Target size={160} strokeWidth={1} />
      </motion.div>
      <motion.div 
        style={{ y: decorY1, x: 50 }}
        className="absolute top-1/3 right-1/4 z-10 text-white/5 hidden lg:block"
      >
        <Shield size={200} strokeWidth={0.5} />
      </motion.div>

      {/* Content Layer */}
      <motion.div 
        style={{ opacity, y: textY }}
        className="relative z-20 text-center px-6 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm"
          >
            Spring Season 2026 Registration Open
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter uppercase italic leading-[0.85] mb-8">
            <div className="overflow-hidden">
              <motion.span 
                initial={{ y: "100%", skewY: 10 }}
                animate={{ y: 0, skewY: 0 }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                className="block origin-left"
              >
                Take <span className="text-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]">Flight</span>
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span 
                initial={{ y: "100%", skewY: 10 }}
                animate={{ y: 0, skewY: 0 }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
                className="block origin-left"
              >
                On The Field
              </motion.span>
            </div>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Elite youth football training designed to elevate your game. Join the premier league where champions are forged and skills take flight.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-600/20"
            >
              Join the League
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(39, 39, 42, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-zinc-800/50 hover:bg-zinc-800 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all border border-zinc-700 backdrop-blur-sm"
            >
              View Schedule
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated Scan Line */}
      <motion.div 
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-30 pointer-events-none"
      />

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Scroll</span>
          <div className="w-6 h-10 border-2 border-zinc-800 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ height: [4, 12, 4], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 bg-blue-500 rounded-full" 
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
