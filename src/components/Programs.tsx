import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import RegistrationModal from './RegistrationModal';

interface ProgramCardProps {
  title: string;
  description: string;
  image: string;
  prompt: string;
  delay: number;
  onRegister: (title: string) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ title, description, image, prompt, delay, onRegister }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 aspect-[4/5]"
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      </div>
      
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
        <h3 className="text-3xl font-display font-black uppercase italic text-white mb-3 group-hover:text-blue-500 transition-colors">
          {title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          {description}
        </p>
        <div className="flex items-center gap-4">
          <Link to="/programs" className="flex items-center gap-2 text-white/60 hover:text-white font-bold uppercase tracking-widest text-[10px] transition-colors">
            Learn More
          </Link>
          <button 
            onClick={() => onRegister(title)}
            className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs group/btn"
          >
            Register Now 
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Programs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("Elite Academy");

  const handleRegister = (title: string) => {
    setSelectedProgram(title);
    setIsModalOpen(true);
  };
  const programs = [
    {
      title: "Elite Academy",
      description: "Advanced skill development for competitive athletes looking to reach the next level of performance.",
      image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800&auto=format&fit=crop",
      prompt: "Professional NFL training camp, high school athletes, intense atmosphere, elite coaching, 8k"
    },
    {
      title: "Youth League",
      description: "Our premier spring league for ages 7-14. Focus on teamwork, fundamentals, and high-energy competition.",
      image: "https://images.unsplash.com/photo-1526232759583-26f173565b4c?q=80&w=800&auto=format&fit=crop",
      prompt: "Youth football players in NFL-style uniforms, high energy, teamwork, sunny day on a professional field"
    },
    {
      title: "Skills Clinic",
      description: "Position-specific training sessions led by former pro and collegiate coaches. Master your craft.",
      image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=800&auto=format&fit=crop",
      prompt: "NFL quarterback mechanics training, close up, professional coach, high detail, sports photography"
    }
  ];

  return (
    <section id="programs" className="py-32 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-blue-500 font-bold uppercase tracking-widest text-sm"
            >
              Our Programs
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-display font-black uppercase italic text-white mt-4 leading-none"
            >
              Elevate Your <span className="text-blue-600">Game</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-400 max-w-md text-lg"
          >
            From beginners to elite prospects, we provide the environment and coaching needed to excel on and off the field.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((p, i) => (
            <ProgramCard 
              key={p.title} 
              title={p.title}
              description={p.description}
              image={p.image}
              prompt={p.prompt}
              delay={i * 0.2} 
              onRegister={handleRegister}
            />
          ))}
        </div>

        <RegistrationModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          programName={selectedProgram}
        />
      </div>
    </section>
  );
};

export default Programs;
