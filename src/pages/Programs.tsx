import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Target, Zap, Shield, Activity, ChevronRight, Star, Clock, MapPin, Users } from 'lucide-react';
import { cn } from '../lib/utils';

const programs = [
  {
    id: 'elite-academy',
    title: "Elite Academy",
    ageGroup: "High School (14-18)",
    description: "Our flagship program designed for serious athletes aiming for collegiate recruitment. Includes advanced tactical training, strength & conditioning, and film study.",
    features: ["Collegiate-level coaching", "Recruitment guidance", "Position-specific mastery", "Performance tracking"],
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800&auto=format&fit=crop",
    icon: <Zap className="w-6 h-6" />,
    color: "blue"
  },
  {
    id: 'youth-league',
    title: "Youth League",
    ageGroup: "Youth (7-13)",
    description: "A high-energy developmental league focusing on fundamentals, teamwork, and building a strong athletic foundation in a competitive environment.",
    features: ["Fundamental skills", "Team strategy", "Weekly games", "Certified coaching"],
    image: "https://images.unsplash.com/photo-1526232759583-26f173565b4c?q=80&w=800&auto=format&fit=crop",
    icon: <Target className="w-6 h-6" />,
    color: "emerald"
  },
  {
    id: 'skills-clinic',
    title: "Skills Clinic",
    ageGroup: "All Ages",
    description: "Position-specific masterclasses led by former NFL and NCAA specialists. Perfect for refining technique and mastering the nuances of your position.",
    features: ["QB mechanics", "WR route running", "Lineman technique", "DB coverage"],
    image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=800&auto=format&fit=crop",
    icon: <Shield className="w-6 h-6" />,
    color: "amber"
  },
  {
    id: 'speed-agility',
    title: "Speed & Agility",
    ageGroup: "All Ages",
    description: "Explosive movement training focused on linear speed, lateral quickness, and change of direction. Essential for every position on the field.",
    features: ["Sprint mechanics", "Plyometrics", "Reaction drills", "Core stability"],
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=800&auto=format&fit=crop",
    icon: <Activity className="w-6 h-6" />,
    color: "rose"
  }
];

const ProgramCard = ({ program, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-zinc-900 border border-zinc-800 rounded-[3rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500"
    >
      <div className="h-64 relative overflow-hidden">
        <img 
          src={program.image} 
          alt={program.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        <div className="absolute top-6 left-6">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg",
            program.color === 'blue' && "bg-blue-600 shadow-blue-600/20",
            program.color === 'emerald' && "bg-emerald-600 shadow-emerald-600/20",
            program.color === 'amber' && "bg-amber-600 shadow-amber-600/20",
            program.color === 'rose' && "bg-rose-600 shadow-rose-600/20"
          )}>
            {program.icon}
          </div>
        </div>
      </div>

      <div className="p-8 md:p-10">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{program.ageGroup}</span>
        </div>
        
        <h3 className="text-3xl font-display font-black uppercase italic text-white mb-4 group-hover:text-blue-500 transition-colors">
          {program.title}
        </h3>
        
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          {program.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {program.features.map((feature: string) => (
            <div key={feature} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">{feature}</span>
            </div>
          ))}
        </div>

        <button className="w-full bg-zinc-800 hover:bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 group/btn">
          Register Now <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

const ProgramsPage = () => {
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-zinc-950"
    >
      {/* Parallax Header */}
      <section ref={headerRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: headerY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/60 to-zinc-950 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1920&auto=format&fit=crop" 
            alt="Programs Header"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <motion.div 
          style={{ opacity: headerOpacity }}
          className="relative z-20 text-center px-6"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
          >
            Our Curriculum
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-display font-black uppercase italic text-white leading-none"
          >
            The <span className="text-blue-600">Programs</span>
          </motion.h1>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-32">
        {/* Stats / Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-20 relative z-30 mb-32">
          {[
            { label: "Expert Coaches", value: "25+", icon: <Users className="w-5 h-5" /> },
            { label: "Success Rate", value: "94%", icon: <Star className="w-5 h-5" /> },
            { label: "Training Hours", value: "5000+", icon: <Clock className="w-5 h-5" /> }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] flex items-center gap-6 shadow-2xl shadow-blue-900/10"
            >
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl font-display font-black text-white">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {programs.map((program, i) => (
            <ProgramCard key={program.id} program={program} index={i} />
          ))}
        </div>

        {/* Location Info */}
        <section className="mt-32 bg-zinc-900/50 border border-zinc-800 rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <MapPin className="w-full h-full -rotate-12 translate-x-1/4" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic text-white mb-8">
                Find Your <span className="text-blue-600">Facility</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
                We operate across multiple premium facilities in the region, ensuring every athlete has access to professional-grade turf, weight rooms, and recovery centers.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-white font-bold uppercase tracking-widest text-xs">Main Stadium: 123 Gridiron Way</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-white font-bold uppercase tracking-widest text-xs">Skills Center: 456 Touchdown Ave</span>
                </div>
              </div>
            </div>
            <div className="aspect-video rounded-[2rem] overflow-hidden border border-zinc-800">
              <img 
                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1920&auto=format&fit=crop" 
                alt="Facility"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ProgramsPage;
