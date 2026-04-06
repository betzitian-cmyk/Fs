import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '../lib/utils';

const testimonials = [
  {
    id: 1,
    name: "Coach Mike Thompson",
    role: "Head Coach, Elite Academy",
    content: "Flight School isn't just about football; it's about building character and discipline. I've seen athletes transform from raw talent into collegiate-ready leaders in just one season.",
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=400&auto=format&fit=crop",
    type: "coach"
  },
  {
    id: 2,
    name: "Jalen Rivers",
    role: "D1 Commit / Alumni",
    content: "The technical training I received here put me miles ahead of the competition. The coaches truly care about your success and push you to your absolute limits every single day.",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=400&auto=format&fit=crop",
    type: "player"
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Parent of Youth Athlete",
    content: "My son has gained so much confidence since joining the Youth League. The environment is supportive yet challenging, perfect for young athletes to grow their love for the game.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    type: "parent"
  },
  {
    id: 4,
    name: "Coach David Chen",
    role: "Skills Specialist",
    content: "We focus on the micro-details that make a macro-difference. Our goal is to ensure every player leaves the field better than they stepped on it.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    type: "coach"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section className="py-32 px-6 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
          >
            Success Stories
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black uppercase italic text-white leading-none"
          >
            Voices of the <span className="text-blue-600">Flight</span>
          </motion.h2>
        </div>

        <div className="relative min-h-[500px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
              }}
              className="absolute w-full max-w-5xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-zinc-900/50 border border-zinc-800 p-8 md:p-16 rounded-[3rem] backdrop-blur-sm">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden group">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />
                      ))}
                    </div>
                    <div className="text-white font-display font-black uppercase italic text-xl">
                      {testimonials[activeIndex].name}
                    </div>
                    <div className="text-blue-500 font-bold uppercase tracking-widest text-[10px]">
                      {testimonials[activeIndex].role}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="w-20 h-20 text-blue-600/10 absolute -top-10 -left-10 rotate-12" />
                  <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed italic mb-8 relative z-10">
                    "{testimonials[activeIndex].content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                      testimonials[activeIndex].type === 'coach' ? "bg-blue-600/10 border-blue-500/20 text-blue-500" : "bg-zinc-800 border-zinc-700 text-zinc-400"
                    )}>
                      {testimonials[activeIndex].type}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
            <button 
              onClick={prev}
              className="w-14 h-14 rounded-full border border-zinc-800 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1);
                    setActiveIndex(i);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === activeIndex ? "w-8 bg-blue-600" : "w-2 bg-zinc-800"
                  )}
                />
              ))}
            </div>
            <button 
              onClick={next}
              className="w-14 h-14 rounded-full border border-zinc-800 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
