import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Trophy, Star, TrendingUp, User, Zap, X, ChevronRight, Target, Activity, Shield } from 'lucide-react';

const players = [
  {
    name: "Marcus Johnson",
    position: "Quarterback",
    class: "2027",
    stats: { td: 34, yards: 2850, rating: 118.5 },
    performance: [
      { label: "Arm Strength", value: 92 },
      { label: "Accuracy", value: 88 },
      { label: "Mobility", value: 75 },
      { label: "Football IQ", value: 95 }
    ],
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=800&auto=format&fit=crop",
    shortBio: "Elite arm talent with exceptional pocket presence.",
    fullBio: "Marcus is a generational talent at the quarterback position. Standing at 6'3\" and weighing 210 lbs, he possesses the ideal frame for a pro-style QB. His ability to read defenses pre-snap and make off-platform throws has caught the attention of every major D1 program. Beyond his physical tools, Marcus is a natural leader who spends hours in the film room, often being the first one in and last one out of the facility."
  },
  {
    name: "Darius Smith",
    position: "Wide Receiver",
    class: "2026",
    stats: { td: 18, yards: 1240, catches: 72 },
    performance: [
      { label: "Speed", value: 98 },
      { label: "Hands", value: 94 },
      { label: "Route Running", value: 91 },
      { label: "Vertical", value: 89 }
    ],
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
    shortBio: "Blazing speed and precise route running.",
    fullBio: "Darius is a nightmare for defensive coordinators. With a clocked 4.38 forty-yard dash, he can take the top off any defense. His catch radius is exceptional, making him a reliable target in red-zone situations. Darius has refined his route running over the last two years at Flight School, transforming from a pure speedster into a complete wide receiver who can win at every level of the field."
  },
  {
    name: "Jalen Williams",
    position: "Cornerback",
    class: "2027",
    stats: { int: 6, tackles: 45, pbu: 12 },
    performance: [
      { label: "Man Coverage", value: 96 },
      { label: "Zone IQ", value: 90 },
      { label: "Ball Skills", value: 93 },
      { label: "Tackling", value: 82 }
    ],
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop",
    shortBio: "Lockdown defender with elite ball skills.",
    fullBio: "Jalen defines the term 'Island Corner'. He thrives in one-on-one situations, using his 6'1\" frame and long arms to disrupt passing lanes. His transition from backpedal to sprint is fluid, allowing him to mirror the most agile receivers. Jalen's competitive fire is infectious; he welcomes the challenge of shadowing the opponent's #1 receiver for all four quarters."
  },
  {
    name: "Tyler Brown",
    position: "Running Back",
    class: "2028",
    stats: { td: 22, yards: 1580, avg: 7.2 },
    performance: [
      { label: "Power", value: 95 },
      { label: "Vision", value: 92 },
      { label: "Acceleration", value: 94 },
      { label: "Blocking", value: 85 }
    ],
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=800&auto=format&fit=crop",
    shortBio: "Powerful runner with breakaway speed.",
    fullBio: "Tyler is a rare combination of power and finesse. He has the strength to run through arm tackles in the trenches and the speed to outrun secondaries in the open field. His vision allows him to anticipate holes before they fully develop, making him a constant threat for explosive plays. Tyler is also an asset in the passing game, showing soft hands and reliable pass protection skills."
  }
];

const StatBar = ({ label, value, delay }: any) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">{label}</span>
      <span className="text-blue-500 font-black text-xs">{value}</span>
    </div>
    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
      />
    </div>
  </div>
);

const PlayerBioModal = ({ player, onClose }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-zinc-950/90 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-zinc-900 border border-zinc-800 w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-12 h-12 bg-zinc-950/50 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors border border-white/10"
        >
          <X size={24} />
        </button>

        {/* Left: Image */}
        <div className="md:w-2/5 relative h-64 md:h-auto">
          <img 
            src={player.image} 
            alt={player.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        {/* Right: Content */}
        <div className="md:w-3/5 p-8 md:p-16 overflow-y-auto max-h-[70vh] md:max-h-none">
          <div className="mb-10">
            <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-4 inline-block">
              Class of {player.class}
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic text-white mb-2">
              {player.name}
            </h2>
            <p className="text-blue-500 font-bold uppercase tracking-[0.2em] text-sm">{player.position}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-white font-black uppercase italic text-xl mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" /> Player Bio
              </h3>
              <p className="text-zinc-400 leading-relaxed text-lg">
                {player.fullBio}
              </p>
            </div>

            <div>
              <h3 className="text-white font-black uppercase italic text-xl mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" /> Performance Stats
              </h3>
              <div className="space-y-2">
                {player.performance.map((perf: any, i: number) => (
                  <StatBar key={perf.label} label={perf.label} value={perf.value} delay={0.2 + (i * 0.1)} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-zinc-800 grid grid-cols-3 gap-8">
            {Object.entries(player.stats).map(([key, val]: [string, any]) => (
              <div key={key}>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">{key}</p>
                <p className="text-white font-black text-3xl uppercase italic">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PlayerCard = ({ player, index, onOpen }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden group cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative h-72 overflow-hidden">
        <img 
          src={player.image} 
          alt={player.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-6">
          <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full">
            Class of {player.class}
          </span>
        </div>
      </div>
      
      <div className="p-8">
        <div className="mb-4">
          <h3 className="text-2xl font-display font-black uppercase italic text-white mb-1 group-hover:text-blue-500 transition-colors">
            {player.name}
          </h3>
          <p className="text-blue-500 font-bold uppercase tracking-widest text-xs">{player.position}</p>
        </div>
        
        <p className="text-zinc-400 text-sm leading-relaxed mb-8 line-clamp-2">
          {player.shortBio}
        </p>
        
        <div className="flex items-center justify-between group/btn">
          <span className="text-white text-[10px] font-black uppercase tracking-widest group-hover/btn:text-blue-500 transition-colors">View Full Bio</span>
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover/btn:bg-blue-600 transition-colors">
            <ChevronRight size={16} className="text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Players = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
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
      <AnimatePresence>
        {selectedPlayer && (
          <PlayerBioModal 
            player={selectedPlayer} 
            onClose={() => setSelectedPlayer(null)} 
          />
        )}
      </AnimatePresence>

      {/* Parallax Header */}
      <section ref={headerRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: headerY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/60 to-zinc-950 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1920&auto=format&fit=crop" 
            alt="Players Header"
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
            Elite Performance
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-display font-black uppercase italic text-white leading-none"
          >
            The <span className="text-blue-600">Roster</span>
          </motion.h1>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-20 mt-20">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg"
          >
            Meet the next generation of stars training at Flight School. Our athletes are consistently ranked among the best in the nation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {players.map((player, i) => (
            <PlayerCard 
              key={player.name} 
              player={player} 
              index={i} 
              onOpen={() => setSelectedPlayer(player)}
            />
          ))}
        </div>

        {/* Stats Highlight */}
        <section className="mt-32 bg-blue-600 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left items-center">
            <div className="md:col-span-2">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic text-white mb-6">
                Proven <span className="text-zinc-900">Results</span>
              </h2>
              <p className="text-blue-100 text-lg max-w-xl">
                Our training methodology is backed by data. We track every rep, every sprint, and every throw to ensure our athletes are reaching their maximum potential.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <Trophy className="text-white w-8 h-8 mb-4" />
                <p className="text-white font-black text-3xl uppercase italic">150+</p>
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest">D1 Offers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <Star className="text-white w-8 h-8 mb-4" />
                <p className="text-white font-black text-3xl uppercase italic">25</p>
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest">Pro Alumni</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Players;
