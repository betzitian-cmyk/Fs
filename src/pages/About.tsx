import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Shield, Target, Users, Zap, Award, History, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const coaches = [
  {
    name: "Mike Thompson",
    role: "Head Coach / Founder",
    bio: "Former NFL linebacker with 10 years of professional experience. Mike founded Flight School to bring pro-level discipline to youth development.",
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "David Chen",
    role: "Skills Specialist",
    bio: "Specializes in quarterback mechanics and wide receiver route running. David has coached over 50 D1 commits in the last 5 years.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Sarah Miller",
    role: "Strength & Conditioning",
    bio: "Certified CSCS with a focus on explosive movement and injury prevention. Sarah ensures our athletes are physically prepared for the grind.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "James Wilson",
    role: "Recruitment Coordinator",
    bio: "Former collegiate scout who helps our athletes navigate the complex world of college recruiting and media exposure.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
  }
];

const About = () => {
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
      {/* Hero Section */}
      <section ref={headerRef} className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: headerY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/60 to-zinc-950 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1920&auto=format&fit=crop" 
            alt="About Background"
            className="w-full h-full object-cover grayscale opacity-50"
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
            The Flight School Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-display font-black uppercase italic text-white leading-none"
          >
            Our <span className="text-blue-600">Mission</span>
          </motion.h1>
        </motion.div>
      </section>

      {/* Mission & History */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <History className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-display font-black uppercase italic text-white">Our History</h2>
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Founded in 2011, Flight School Football began as a small weekend clinic with a single goal: to provide high school athletes with the same level of technical training and mental preparation found in professional NFL camps.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Over the last decade, we have grown into a premier national training academy, having helped over 150 athletes secure Division 1 scholarships and seeing 25 of our alumni reach the professional ranks. Our journey is defined by the success of our athletes and our unwavering commitment to excellence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video rounded-[3rem] overflow-hidden border border-zinc-800"
            >
              <img 
                src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop" 
                alt="Training Session"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic text-white mb-6">
              Core <span className="text-blue-600">Values</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              These principles guide everything we do, from the drills we run to the way we interact with our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Discipline", icon: <Shield />, desc: "Consistency in the small things leads to greatness in the big things." },
              { title: "Leadership", icon: <Users />, desc: "We build captains, not just players. Character is our foundation." },
              { title: "Mastery", icon: <Target />, desc: "Relentless focus on technical precision and football intelligence." },
              { title: "Community", icon: <Heart />, desc: "We are a family. We support each other on and off the field." }
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] hover:border-blue-500/50 transition-all group"
              >
                <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {React.cloneElement(value.icon as React.ReactElement, { className: "w-6 h-6" })}
                </div>
                <h3 className="text-2xl font-display font-black uppercase italic text-white mb-4">{value.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching Staff */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4 block">The Experts</span>
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase italic text-white leading-none">
                Coaching <span className="text-blue-600">Staff</span>
              </h2>
            </div>
            <p className="text-zinc-400 max-w-md text-lg">
              Our staff consists of former professional players and elite collegiate coaches dedicated to your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coaches.map((coach, i) => (
              <motion.div
                key={coach.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 border border-zinc-800">
                  <img 
                    src={coach.image} 
                    alt={coach.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-blue-500 font-bold uppercase tracking-widest text-[10px] mb-1">{coach.role}</p>
                    <h3 className="text-2xl font-display font-black uppercase italic text-white">{coach.name}</h3>
                  </div>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed px-2">
                  {coach.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="w-16 h-16 text-white/20 mx-auto mb-8" />
          <h2 className="text-4xl md:text-7xl font-display font-black uppercase italic text-white mb-8 leading-tight">
            Ready to Join the <br /> <span className="text-zinc-900">Elite?</span>
          </h2>
          <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto">
            Whether you're just starting or looking to go pro, we have a program tailored for your success.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/programs"
              className="bg-white text-zinc-950 px-12 py-5 rounded-full font-black uppercase tracking-widest text-lg hover:bg-zinc-100 transition-all shadow-2xl"
            >
              View Programs
            </Link>
            <Link 
              to="/#contact"
              className="text-white font-black uppercase tracking-widest text-lg border-b-2 border-white/30 hover:border-white transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
