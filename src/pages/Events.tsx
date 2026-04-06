import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, MapPin, Clock, Ticket, Zap } from 'lucide-react';

const events = [
  {
    title: "Elite Skills Showcase",
    date: "April 15, 2026",
    time: "9:00 AM - 2:00 PM",
    location: "Flight School Stadium",
    category: "Showcase",
    description: "The premier event for high school recruits to showcase their skills in front of collegiate scouts and coaches.",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=800&auto=format&fit=crop",
    prompt: "Wide shot of a professional NFL stadium during a skills showcase, players in jerseys on the field, scouts with clipboards, cinematic lighting"
  },
  {
    title: "Spring Youth Combine",
    date: "April 22, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Training Grounds A",
    category: "Combine",
    description: "A comprehensive athletic testing event for youth players ages 8-14. Get your official stats and measurements.",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop",
    prompt: "Youth football players participating in a combine, running drills, timing gates, professional sports setting, high detail"
  },
  {
    title: "Quarterback Masterclass",
    date: "May 5, 2026",
    time: "5:00 PM - 8:00 PM",
    location: "Indoor Facility",
    category: "Clinic",
    description: "Intensive position-specific training focusing on footwork, mechanics, and defensive recognition.",
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=800&auto=format&fit=crop",
    prompt: "Close up of a quarterback's hands on a football, ready to throw, indoor training facility, focused lighting, NFL style"
  },
  {
    title: "7v7 Regional Tournament",
    date: "May 18-19, 2026",
    time: "All Day",
    location: "City Sports Complex",
    category: "Tournament",
    description: "The biggest 7v7 tournament in the region. Compete against the best teams for the championship title.",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800&auto=format&fit=crop",
    prompt: "Action shot of a 7v7 football game, player jumping for a catch, vibrant colors, stadium background, sports photography"
  }
];

const EventCard = ({ event, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col md:flex-row bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden group hover:border-blue-500/50 transition-colors"
    >
      <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full">
            {event.category}
          </span>
        </div>
      </div>
      
      <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
        <div className="flex flex-wrap gap-6 mb-6 text-zinc-400 text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            {event.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            {event.time}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-500" />
            {event.location}
          </div>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-display font-black uppercase italic text-white mb-4 group-hover:text-blue-500 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-2xl">
          {event.description}
        </p>
        
        <div className="flex items-center gap-4">
          <button className="bg-white text-zinc-950 px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-colors flex items-center gap-2">
            <Ticket className="w-4 h-4" />
            Get Tickets
          </button>
          <button className="text-white font-bold uppercase tracking-widest text-xs hover:text-blue-500 transition-colors">
            Event Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Events = () => {
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
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1920&auto=format&fit=crop" 
            alt="Events Header"
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
            Mark Your Calendar
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-display font-black uppercase italic text-white leading-none"
          >
            Major <span className="text-blue-600">Events</span>
          </motion.h1>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 mt-20 gap-8">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-zinc-400 text-lg"
            >
              Don't miss out on the biggest dates in the Flight School calendar. From combines to championships, stay updated here.
            </motion.p>
          </div>
        </div>

        <div className="space-y-8">
          {events.map((event, i) => (
            <EventCard key={event.title} event={event} index={i} />
          ))}
        </div>

        {/* Newsletter CTA */}
        <section className="mt-32 relative rounded-[3rem] overflow-hidden py-20 px-12 text-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop" 
              alt="Stadium"
              className="w-full h-full object-cover opacity-20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="h-20 flex items-center justify-center mb-8">
              <img 
                src="https://jypxqrtqzktjkxkqveqw.supabase.co/storage/v1/object/public/uploads/1757693556862-i4tnulb3bj.png" 
                alt="Flight School Logo"
                className="h-full w-auto object-contain brightness-110 rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic text-white mb-6">
              Stay in the <span className="text-blue-500">Loop</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-10">
              Subscribe to our newsletter to get early access to event registration and exclusive training tips.
            </p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed successfully!");
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input 
                required
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500 transition-colors"
              />
              <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Events;
