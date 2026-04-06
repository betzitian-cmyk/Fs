import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { registerForProgram } from '../services/api';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  programName?: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, programName = "Elite Academy" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    program: programName
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const result = await registerForProgram(formData);
      if (result.success) {
        setStatus('success');
        setMessage(result.message);
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: '', email: '', program: programName });
        }, 3000);
      } else {
        setStatus('error');
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus('error');
      setMessage("Failed to connect to server.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {status === 'success' ? (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <h3 className="text-3xl font-display font-black uppercase italic text-white mb-4">Success!</h3>
                <p className="text-zinc-400">{message}</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-4xl font-display font-black uppercase italic text-white mb-2 leading-none">
                    Join The <span className="text-blue-600">Elite</span>
                  </h2>
                  <p className="text-zinc-500">Register for our {programName} program today.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-blue-600 outline-none transition-all" 
                      placeholder="John Doe" 
                    />
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
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Program</label>
                    <select 
                      value={formData.program}
                      onChange={(e) => setFormData({...formData, program: e.target.value})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white focus:border-blue-600 outline-none transition-all appearance-none"
                    >
                      <option value="Elite Academy">Elite Academy</option>
                      <option value="Youth League">Youth League</option>
                      <option value="Skills Clinic">Skills Clinic</option>
                      <option value="Summer Camp">Summer Camp</option>
                    </select>
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm text-center">{message}</p>
                  )}

                  <button 
                    disabled={status === 'loading'}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white py-5 rounded-2xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : "Complete Registration"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
