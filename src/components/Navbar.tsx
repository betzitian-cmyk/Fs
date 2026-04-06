import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, Zap, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  
  const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const navBlur = useTransform(scrollY, [0, 100], [0, 12]);
  const navY = useTransform(scrollY, [0, 100], [20, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Players', href: '/players' },
    { name: 'Events', href: '/events' },
    { name: 'Programs', href: '/programs' },
    { name: 'Contact', href: '/#contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none">
      <motion.nav 
        style={{ 
          backgroundColor: `rgba(9, 9, 11, ${isScrolled ? 0.8 : 0})`,
          backdropFilter: `blur(${isScrolled ? 12 : 0}px)`,
          y: isScrolled ? 0 : 0
        }}
        className={cn(
          "max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4 rounded-full transition-all duration-500 pointer-events-auto border border-transparent",
          isScrolled && "border-zinc-800/50 shadow-2xl shadow-blue-900/10"
        )}
      >
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative h-12 flex items-center"
          >
            <img 
              src="/input_file_0.png" 
              alt="Flight School Logo"
              className="h-full w-auto object-contain brightness-110"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              to={link.href.startsWith('/#') ? '/' + link.href.split('/')[1] : link.href}
              className={cn(
                "relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full",
                isActive(link.href) ? "text-white" : "text-zinc-400 hover:text-white"
              )}
            >
              <span className="relative z-10">{link.name}</span>
              {isActive(link.href) && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-blue-600/10 border border-blue-500/20 rounded-full z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
          
          <div className="w-px h-6 bg-zinc-800 mx-4" />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all overflow-hidden shadow-lg shadow-blue-600/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Join Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden absolute top-24 left-4 right-4 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl pointer-events-auto"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-2xl font-display font-black uppercase italic transition-colors flex items-center justify-between group",
                      isActive(link.href) ? "text-blue-500" : "text-white hover:text-blue-400"
                    )}
                  >
                    {link.name}
                    <ChevronRight className={cn("w-6 h-6 opacity-0 group-hover:opacity-100 transition-all", isActive(link.href) && "opacity-100")} />
                  </Link>
                </motion.div>
              ))}
              <div className="h-px bg-zinc-800 my-2" />
              <button className="bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-lg shadow-xl shadow-blue-600/20">
                Register Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
