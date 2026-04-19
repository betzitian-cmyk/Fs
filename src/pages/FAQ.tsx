import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Shield, Zap, ClipboardCheck } from 'lucide-react';
import { cn } from '../lib/utils';

const AccordionItem = ({ question, answer, icon: Icon, isOpen, onClick }: any) => {
  return (
    <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/50 mb-4 transition-colors hover:border-blue-500/30">
      <button
        onClick={onClick}
        className="w-full p-6 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600/20 transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-white uppercase tracking-tight">{question}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-zinc-500"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 pl-20 text-zinc-400 leading-relaxed italic">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What do your training programs focus on?",
      answer: "Our training programs are meticulously designed to cover position-specific mechanics, tactical football IQ, and professional-grade strength and conditioning. We focus on developing the complete athlete, ensuring they are mentally and physically prepared for the next level of competition.",
      icon: Zap
    },
    {
      question: "How do I register for a program?",
      answer: "Registering for a Flight School program is simple. Navigate to our 'Programs' page, browse our available curriculum (Elite Academy, Youth League, etc.), and click the 'Register Now' button. You'll be prompted to fill out a short enrollment form, after which our administration team will contact you for confirmation and payment details.",
      icon: ClipboardCheck
    },
    {
      question: "What safety measures are in place during training?",
      answer: "Athlete safety is our absolute priority. All training sessions are supervised by certified coaches and specialized medical trainers. We utilize modern, high-quality equipment, maintain strict adherence to concussion protocols, and implement intensive hydration and recovery standards to protect our players on and off the field.",
      icon: Shield
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-zinc-950 min-h-screen pt-32 pb-20"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-6 border border-blue-500/20"
          >
            <HelpCircle className="w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-black uppercase italic text-white mb-6 leading-none"
          >
            Frequently Asked <span className="text-blue-600">Questions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            Everything you need to know about joining America's premier football development program.
          </motion.p>
        </div>

        <div className="mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              {...faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-12 bg-zinc-900/50 border border-zinc-800 rounded-[3rem] text-center"
        >
          <h2 className="text-3xl font-display font-black uppercase italic text-white mb-4">Still have questions?</h2>
          <p className="text-zinc-400 mb-8">Our team is ready to help you reach your maximum potential.</p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest transition-all"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FAQ;
