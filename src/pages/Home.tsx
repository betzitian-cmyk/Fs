import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, useInView, useScroll, useTransform } from 'motion/react';
import Hero from '../components/Hero';
import Programs from '../components/Programs';
import Testimonials from '../components/Testimonials';
import Schedule from '../components/Schedule';
import Contact from '../components/Contact';
import RegistrationModal from '../components/RegistrationModal';

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { 
        duration: 2, 
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.round(latest))
      });
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const parallaxRef = useRef(null);
  const { scrollYProgress: parallaxScroll } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(parallaxScroll, [0, 1], ["-20%", "20%"]);
  const parallaxScale = useTransform(parallaxScroll, [0, 1], [1, 1.2]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Hero />
      
      {/* Stats Section */}
      <section className="py-12 bg-blue-600 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Athletes Trained', value: 5000, suffix: '+' },
              { label: 'Championships', value: 12, suffix: '' },
              { label: 'Pro Alumni', value: 25, suffix: '+' },
              { label: 'Years Experience', value: 15, suffix: '' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-extrabold font-display text-white mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Programs />

      <section ref={parallaxRef} className="relative h-[70vh] overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ y: parallaxY, scale: parallaxScale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-zinc-950/70 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2070&auto=format&fit=crop" 
            alt="Football Action"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-8xl font-black mb-8 leading-tight uppercase italic text-white"
          >
            Where Champions <br />
            <span className="text-blue-500">Take Flight</span>
          </motion.h2>
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-zinc-950 px-12 py-5 rounded-full font-black text-xl transition-all shadow-2xl hover:bg-blue-50"
          >
            SECURE YOUR SPOT
          </motion.button>
        </div>
      </section>

      <Testimonials />

      <Schedule />
      <Contact />

      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        programName="Elite Academy"
      />
    </motion.div>
  );
};

export default Home;
