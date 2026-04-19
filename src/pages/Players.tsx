import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Trophy, Star, TrendingUp, User, Zap, X, ChevronRight, Target, Activity, Shield, Award, Medal, Play, Film } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

const players = [
  {
    name: "Marcus Johnson",
    position: "Quarterback",
    class: "2027",
    height: "6'3\"",
    weight: "210 lbs",
    stats: { td: 34, yards: 2850, rating: 118.5, completion: "68.5%" },
    performance: [
      { label: "Arm Strength", value: 92 },
      { label: "Accuracy", value: 88 },
      { label: "Mobility", value: 75 },
      { label: "Football IQ", value: 95 },
      { label: "Pocket Presence", value: 90 }
    ],
    achievements: [
      { title: "Player of the Week", icon: Award, date: "Oct 2025" },
      { title: "All-State Honors", icon: Trophy, date: "2024" },
      { title: "Elite 11 Finalist", icon: Star, date: "2025" }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=800&auto=format&fit=crop",
    shortBio: "Elite arm talent with exceptional pocket presence.",
    fullBio: "Marcus is a generational talent at the quarterback position. Standing at 6'3\" and weighing 210 lbs, he possesses the ideal frame for a pro-style QB. His ability to read defenses pre-snap and make off-platform throws has caught the attention of every major D1 program. Beyond his physical tools, Marcus is a natural leader who spends hours in the film room, often being the first one in and last one out of the facility."
  },
  {
    name: "Darius Smith",
    position: "Wide Receiver",
    class: "2026",
    height: "6'1\"",
    weight: "185 lbs",
    stats: { td: 18, yards: 1240, catches: 72, avg: 17.2 },
    performance: [
      { label: "Speed", value: 98 },
      { label: "Hands", value: 94 },
      { label: "Route Running", value: 91 },
      { label: "Vertical", value: 89 },
      { label: "Release", value: 93 }
    ],
    achievements: [
      { title: "Conference MVP", icon: Trophy, date: "2024" },
      { title: "Offensive POY", icon: Zap, date: "2025" },
      { title: "Track All-American", icon: Medal, date: "2024" }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
    shortBio: "Blazing speed and precise route running.",
    fullBio: "Darius is a nightmare for defensive coordinators. With a clocked 4.38 forty-yard dash, he can take the top off any defense. His catch radius is exceptional, making him a reliable target in red-zone situations. Darius has refined his route running over the last two years at Flight School, transforming from a pure speedster into a complete wide receiver who can win at every level of the field."
  },
  {
    name: "Jalen Williams",
    position: "Cornerback",
    class: "2027",
    height: "6'1\"",
    weight: "190 lbs",
    stats: { int: 6, tackles: 45, pbu: 12, forced_fumbles: 2 },
    performance: [
      { label: "Man Coverage", value: 96 },
      { label: "Zone IQ", value: 90 },
      { label: "Ball Skills", value: 93 },
      { label: "Tackling", value: 82 },
      { label: "Press Technique", value: 94 }
    ],
    achievements: [
      { title: "Defensive Master", icon: Shield, date: "2025" },
      { title: "All-League Honors", icon: Award, date: "2024" },
      { title: "Interception King", icon: Target, date: "2025" }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop",
    shortBio: "Lockdown defender with elite ball skills.",
    fullBio: "Jalen defines the term 'Island Corner'. He thrives in one-on-one situations, using his 6'1\" frame and long arms to disrupt passing lanes. His transition from backpedal to sprint is fluid, allowing him to mirror the most agile receivers. Jalen's competitive fire is infectious; he welcomes the challenge of shadowing the opponent's #1 receiver for all four quarters."
  },
  {
    name: "Tyler Brown",
    position: "Running Back",
    class: "2028",
    height: "5'11\"",
    weight: "205 lbs",
    stats: { td: 22, yards: 1580, avg: 7.2, broken_tackles: 85 },
    performance: [
      { label: "Power", value: 95 },
      { label: "Vision", value: 92 },
      { label: "Acceleration", value: 94 },
      { label: "Blocking", value: 85 },
      { label: "Balance", value: 91 }
    ],
    achievements: [
      { title: "Freshman of Year", icon: Star, date: "2024" },
      { title: "Rushing Leader", icon: TrendingUp, date: "2025" },
      { title: "All-State RB", icon: Trophy, date: "2024" }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
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

const PerformanceChart = ({ data }: { data: any[] }) => {
  return (
    <div className="h-[250px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#27272a" />
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis 
            dataKey="label" 
            type="category" 
            width={120} 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700, textAnchor: 'start', dx: -110 }}
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
            itemStyle={{ color: '#3b82f6', fontWeight: 900 }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.value >= 90 ? '#2563eb' : '#3b82f6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const PerformanceRadarChart = ({ data }: { data: any[] }) => {
  return (
    <div className="h-[300px] w-full mt-4 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#27272a" strokeWidth={1} />
          <PolarAngleAxis 
            dataKey="label" 
            tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.4}
            strokeWidth={3}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
            itemStyle={{ color: '#3b82f6', fontWeight: 900 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

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
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-4 inline-block">
                Class of {player.class}
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic text-white mb-2">
                {player.name}
              </h2>
              <p className="text-blue-500 font-bold uppercase tracking-[0.2em] text-sm">{player.position}</p>
            </div>
            <div className="flex gap-6 border-l border-zinc-800 pl-6">
              <div>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Height</p>
                <p className="text-white font-black text-xl italic">{player.height}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Weight</p>
                <p className="text-white font-black text-xl italic">{player.weight}</p>
              </div>
            </div>
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
                <Activity className="w-5 h-5 text-blue-500" /> Scouting Profile
              </h3>
              
              <div className="bg-zinc-950/30 border border-zinc-800 rounded-3xl p-6 mb-8">
                <PerformanceRadarChart data={player.performance} />
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Attribute Distribution</h4>
                  <PerformanceChart data={player.performance} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {player.performance.map((perf: any, i: number) => (
                    <div key={perf.label} className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl group hover:border-blue-500/30 transition-colors">
                      <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mb-1">{perf.label}</p>
                      <p className="text-blue-500 font-black text-lg italic tracking-tight">{perf.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-zinc-800">
            <h3 className="text-white font-black uppercase italic text-xl mb-8 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-500" /> Recent Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {player.achievements.map((achievement: any, i: number) => (
                <motion.div 
                  key={achievement.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4 group hover:border-blue-500/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600/20 transition-colors">
                    <achievement.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm uppercase tracking-tight">{achievement.title}</p>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{achievement.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-zinc-800">
            <h3 className="text-white font-black uppercase italic text-xl mb-8 flex items-center gap-2">
              <Film className="w-5 h-5 text-blue-500" /> Scouting Tape
            </h3>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950">
              <iframe 
                src={player.videoUrl}
                title={`${player.name} Highlights`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-blue-600/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-lg">
                  <Play size={12} className="fill-white" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Full Highlights</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-zinc-800 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(player.stats).map(([key, val]: [string, any]) => (
              <div key={key}>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">{key.replace('_', ' ')}</p>
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
      className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500"
      onClick={onOpen}
    >
      <div className="relative h-80 overflow-hidden">
        <img 
          src={player.image} 
          alt={player.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className="bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-right">
            <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Height</p>
            <p className="text-xs font-black text-white italic">{player.height}</p>
          </div>
          <div className="bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-right">
            <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Weight</p>
            <p className="text-xs font-black text-white italic">{player.weight}</p>
          </div>
        </div>

        <div className="absolute bottom-4 left-6">
          <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg">
            Class of {player.class}
          </span>
        </div>
      </div>
      
      <div className="p-8">
        <div className="mb-6">
          <h3 className="text-3xl font-display font-black uppercase italic text-white mb-1 group-hover:text-blue-500 transition-colors">
            {player.name}
          </h3>
          <p className="text-blue-500 font-bold uppercase tracking-widest text-xs">{player.position}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-8 py-4 border-y border-zinc-800/50">
          {Object.entries(player.stats).slice(0, 3).map(([key, val]: [string, any]) => (
            <div key={key}>
              <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mb-1">{key.replace('_', ' ')}</p>
              <p className="text-white font-black text-lg uppercase italic">{val}</p>
            </div>
          ))}
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed mb-8 line-clamp-2">
          {player.shortBio}
        </p>
        
        <div className="flex items-center justify-between group/btn">
          <span className="text-white text-[10px] font-black uppercase tracking-widest group-hover/btn:text-blue-500 transition-colors">View Scouting Report</span>
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover/btn:bg-blue-600 transition-colors shadow-lg">
            <ChevronRight size={20} className="text-white" />
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
