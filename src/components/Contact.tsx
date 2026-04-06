import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase italic text-white mb-8 leading-none">
              Get In <span className="text-blue-600">Touch</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-12">
              Have questions about our programs or registration? Our team is here to help you get started on your journey.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-white font-bold mb-1">Email Us</div>
                  <div className="text-zinc-500">info@flightschoolfootball.com</div>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-white font-bold mb-1">Call Us</div>
                  <div className="text-zinc-500">(555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-white font-bold mb-1">Training Facility</div>
                  <div className="text-zinc-500">123 Gridiron Way, Sports City, ST 90210</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-600/5"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">First Name</label>
                  <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-blue-600 outline-none transition-all" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Last Name</label>
                  <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-blue-600 outline-none transition-all" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
                <input type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-blue-600 outline-none transition-all" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Message</label>
                <textarea rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-blue-600 outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
