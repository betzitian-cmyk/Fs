import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BookOpen, 
  Heart, 
  Handshake, 
  Award, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Loader2, 
  DollarSign,
  GraduationCap
} from 'lucide-react';
import { cn } from '../lib/utils';
import { sendSponsorshipInquiry, submitVolunteerApplication, processDonation } from '../services/api';

const SuccessStory = ({ title, content, image, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden group"
  >
    <div className="h-48 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="p-8">
      <h4 className="text-xl font-display font-black uppercase italic text-white mb-4">{title}</h4>
      <p className="text-zinc-400 text-sm leading-relaxed">{content}</p>
    </div>
  </motion.div>
);

const Partners = () => {
  const [activeForm, setActiveForm] = useState<'sponsor' | 'volunteer' | 'donate' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSponsorSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      const result = await sendSponsorshipInquiry({
        companyName: formData.get('companyName') as string,
        contactName: formData.get('contactName') as string,
        email: formData.get('email') as string,
        tier: formData.get('tier') as string,
      });
      if (result.success) {
        setStatus({ type: 'success', message: result.message });
        setTimeout(() => setActiveForm(null), 3000);
      }
    } catch (error) {
      setStatus({ type: 'error', message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVolunteerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      const result = await submitVolunteerApplication({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        role: formData.get('role') as string,
        message: formData.get('message') as string,
      });
      if (result.success) {
        setStatus({ type: 'success', message: result.message });
        setTimeout(() => setActiveForm(null), 3000);
      }
    } catch (error) {
      setStatus({ type: 'error', message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDonateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      const result = await processDonation({
        amount: Number(formData.get('amount')),
        name: formData.get('name') as string,
        email: formData.get('email') as string,
      });
      if (result.success) {
        setStatus({ type: 'success', message: result.message });
        setTimeout(() => setActiveForm(null), 3000);
      }
    } catch (error) {
      setStatus({ type: 'error', message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-zinc-950 min-h-screen pt-32 pb-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
          >
            Community & Impact
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-black uppercase italic text-white leading-none mb-8"
          >
            Our <span className="text-blue-600">Partners</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            At Flight School, we believe in developing the whole athlete. Our partners help us provide the support needed to excel in the classroom and the community.
          </motion.p>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {/* After School Programs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-bl-[3rem] flex items-center justify-center text-blue-500">
              <GraduationCap className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-display font-black uppercase italic text-white mb-6">After School <br /> <span className="text-blue-500">Programs</span></h3>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              We provide access to professional tutors and dedicated homework help sessions. Education is the foundation of our athletes' success.
            </p>
            <ul className="space-y-4 mb-10">
              {['1-on-1 Tutoring', 'Study Hall Access', 'SAT/ACT Prep', 'College Counseling'].map(item => (
                <li key={item} className="flex items-center gap-3 text-zinc-300 text-sm font-bold uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => { setActiveForm('volunteer'); setStatus(null); }}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all"
            >
              Volunteer as Tutor
            </button>
          </motion.div>

          {/* Community Volunteering */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-bl-[3rem] flex items-center justify-center text-emerald-500">
              <Heart className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-display font-black uppercase italic text-white mb-6">Community <br /> <span className="text-emerald-500">Service</span></h3>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Our players and coaches are active leaders. We believe in giving back to the community that supports us through regular service projects.
            </p>
            <ul className="space-y-4 mb-10">
              {['Youth Mentorship', 'Food Drives', 'School Visits', 'Community Cleanup'].map(item => (
                <li key={item} className="flex items-center gap-3 text-zinc-300 text-sm font-bold uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => { setActiveForm('volunteer'); setStatus(null); }}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all"
            >
              Join Our Team
            </button>
          </motion.div>

          {/* Become a Sponsor */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 rounded-bl-[3rem] flex items-center justify-center text-amber-500">
              <Handshake className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-display font-black uppercase italic text-white mb-6">Become a <br /> <span className="text-amber-500">Sponsor</span></h3>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Partner with Flight School to empower the next generation. Your sponsorship directly funds scholarships and program equipment.
            </p>
            <ul className="space-y-4 mb-10">
              {['Brand Visibility', 'Community Impact', 'Tax Benefits', 'Exclusive Events'].map(item => (
                <li key={item} className="flex items-center gap-3 text-zinc-300 text-sm font-bold uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => { setActiveForm('sponsor'); setStatus(null); }}
              className="w-full bg-amber-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-amber-500 transition-all"
            >
              Partner With Us
            </button>
          </motion.div>
        </div>

        {/* Success Stories */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <Award className="w-8 h-8 text-blue-500" />
            <h2 className="text-4xl font-display font-black uppercase italic text-white">Success <span className="text-blue-600">Stories</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SuccessStory 
              title="Marcus J. - Academic Excellence"
              content="Through our tutoring program, Marcus improved his GPA from 2.4 to 3.8, securing a full academic scholarship to State University."
              image="https://images.unsplash.com/photo-1523240715630-9918c1c46e7d?q=80&w=800&auto=format&fit=crop"
              delay={0.1}
            />
            <SuccessStory 
              title="Community Impact Award"
              content="Our 2025 Food Drive collected over 5,000 lbs of food for local families, led entirely by our varsity players."
              image="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop"
              delay={0.2}
            />
            <SuccessStory 
              title="Sponsor Spotlight: TechCorp"
              content="TechCorp's sponsorship provided 50 new helmets and a state-of-the-art film room for our athletes."
              image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop"
              delay={0.3}
            />
          </div>
        </div>

        {/* Get Involved Section */}
        <section className="bg-blue-600 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Users className="w-full h-full -rotate-12 translate-x-1/4" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase italic text-white mb-8">Get <span className="text-zinc-900">Involved</span></h2>
            <p className="text-blue-100 text-xl mb-12 leading-relaxed">
              Whether you want to donate, mentor, or help out on the field, there's a place for you in the Flight School family.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button 
                onClick={() => { setActiveForm('donate'); setStatus(null); }}
                className="bg-white text-zinc-950 px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-zinc-100 transition-all shadow-2xl flex items-center gap-2"
              >
                <DollarSign className="w-4 h-4" /> Donate Now
              </button>
              <button 
                onClick={() => { setActiveForm('volunteer'); setStatus(null); }}
                className="bg-zinc-900 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-zinc-800 transition-all flex items-center gap-2"
              >
                <Users className="w-4 h-4" /> Volunteer
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Forms Modal */}
      <AnimatePresence>
        {activeForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveForm(null)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-[3rem] p-10 shadow-2xl"
            >
              <button 
                onClick={() => setActiveForm(null)}
                className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>

              {status ? (
                <div className="text-center py-12">
                  <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8",
                    status.type === 'success' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                  )}>
                    {status.type === 'success' ? <CheckCircle2 className="w-10 h-10" /> : <Star className="w-10 h-10" />}
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase italic text-white mb-4">
                    {status.type === 'success' ? "Thank You!" : "Error"}
                  </h3>
                  <p className="text-zinc-400">{status.message}</p>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-display font-black uppercase italic text-white mb-8">
                    {activeForm === 'sponsor' && "Become a Sponsor"}
                    {activeForm === 'volunteer' && "Volunteer Application"}
                    {activeForm === 'donate' && "Make a Donation"}
                  </h3>

                  {activeForm === 'sponsor' && (
                    <form onSubmit={handleSponsorSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input required name="companyName" placeholder="Company Name" className="bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500" />
                        <input required name="contactName" placeholder="Contact Name" className="bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500" />
                      </div>
                      <input required name="email" type="email" placeholder="Email Address" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500" />
                      <select name="tier" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500">
                        <option value="platinum">Platinum Partner</option>
                        <option value="gold">Gold Partner</option>
                        <option value="silver">Silver Partner</option>
                        <option value="bronze">Bronze Partner</option>
                      </select>
                      <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Inquiry"}
                      </button>
                    </form>
                  )}

                  {activeForm === 'volunteer' && (
                    <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input required name="name" placeholder="Full Name" className="bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500" />
                        <input required name="email" type="email" placeholder="Email Address" className="bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500" />
                      </div>
                      <select name="role" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500">
                        <option value="tutor">Academic Tutor</option>
                        <option value="mentor">Youth Mentor</option>
                        <option value="helper">Team Helper</option>
                        <option value="coach">Assistant Coach</option>
                      </select>
                      <textarea name="message" placeholder="Tell us about yourself..." rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500 resize-none" />
                      <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Application"}
                      </button>
                    </form>
                  )}

                  {activeForm === 'donate' && (
                    <form onSubmit={handleDonateSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input required name="name" placeholder="Full Name" className="bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500" />
                        <input required name="email" type="email" placeholder="Email Address" className="bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500" />
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                        <input required name="amount" type="number" placeholder="Donation Amount" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-14 pr-6 py-4 text-white outline-none focus:border-blue-500" />
                      </div>
                      <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Donation"}
                      </button>
                    </form>
                  )}
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Partners;
