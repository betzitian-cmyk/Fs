import React from 'react';
import { Zap, ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
          <div className="flex items-center gap-3">
            <div className="h-12 flex items-center">
              <img 
                src="/input_file_0.png" 
                alt="Flight School Logo"
                className="h-full w-auto object-contain brightness-110"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Instagram /></a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Facebook /></a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Twitter /></a>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link to="/players" className="hover:text-blue-500 transition-colors">Players</Link></li>
              <li><Link to="/events" className="hover:text-blue-500 transition-colors">Events</Link></li>
              <li><a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Programs</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Elite Academy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Youth League</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Skills Clinic</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Camps</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Support</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Newsletter</h4>
            <p className="text-zinc-500 text-sm mb-4">Get the latest updates on registration and events.</p>
            <div className="flex gap-2">
              <input type="email" className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white text-sm outline-none w-full" placeholder="Email" />
              <button className="bg-blue-600 p-3 rounded-xl text-white"><ArrowRight className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-zinc-900 text-center text-zinc-600 text-xs uppercase tracking-[0.2em]">
          © 2026 Flight School Football. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
