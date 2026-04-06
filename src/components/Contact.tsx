import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { sendContactMessage } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const result = await sendContactMessage({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        message: formData.message
      });
      if (result.success) {
        setStatus('success');
        setResponseMsg(result.message);
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setResponseMsg("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus('error');
      setResponseMsg("Failed to connect to server.");
    }
  };

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
            {status === 'success' ? (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <h3 className="text-3xl font-display font-black uppercase italic text-white mb-4">Message Sent!</h3>
                <p className="text-zinc-400">{responseMsg}</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-blue-500 font-bold uppercase tracking-widest text-sm hover:text-blue-400 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">First Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-blue-600 outline-none transition-all" 
                      placeholder="John" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Last Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-blue-600 outline-none transition-all" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-blue-600 outline-none transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Message</label>
                  <textarea 
                    required
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-blue-600 outline-none transition-all resize-none" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">{responseMsg}</p>
                )}

                <button 
                  disabled={status === 'loading'}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white py-5 rounded-2xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
