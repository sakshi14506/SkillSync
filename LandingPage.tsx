import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  ShieldCheck, 
  Brain, 
  ArrowRight, 
  Sparkles,
  Users,
  Briefcase,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Card } from '../components/UI';
import { cn } from '../lib/utils';
import { useTheme } from '../contexts/ThemeContext';

const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-bg text-text overflow-x-hidden transition-colors duration-500">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-nav px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="text-white" size={20} />
            </div>
            <span className="text-2xl font-black tracking-tighter">SkillSync</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="label-text mb-0 hover:text-primary transition-colors">Features</a>
            <a href="#about" className="label-text mb-0 hover:text-primary transition-colors">About</a>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-400 hover:text-primary transition-all"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/auth">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest"
            >
              <Sparkles size={14} /> Smart Placements Powered by AI
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter"
            >
              Bridge the Gap <br />
              <span className="neon-text">Between Talent & Tech</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
            >
              SkillSync uses advanced neural matching to connect students with their dream careers and helps recruiters find the perfect fit, faster than ever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/auth">
                <Button className="px-10 py-6 text-lg font-black shadow-2xl shadow-indigo-500/20 flex items-center gap-2 group">
                  Start Your Journey <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <Button variant="outline" className="px-10 py-6 text-lg font-black">
                Watch Demo
              </Button>
            </motion.div>
          </div>

          {/* Hero Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
            <Card className="p-2 bg-slate-900/50 backdrop-blur-3xl border-slate-800/50 overflow-hidden">
              <img 
                src="https://picsum.photos/seed/dashboard/1200/600?blur=2" 
                alt="Dashboard Preview" 
                className="w-full rounded-2xl opacity-50"
              />
              {/* Floating Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center animate-ping">
                  <Zap className="text-indigo-400" size={40} />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-slate-900/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">Engineered for Excellence</h2>
            <p className="text-slate-400">Everything you need to succeed in the modern hiring landscape.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'AI Matching', desc: 'Our neural engine analyzes thousands of data points to find your perfect job match.', icon: Brain, color: 'text-indigo-400' },
              { title: 'Bias-Free', desc: 'Objective evaluation metrics ensure fair opportunities for every candidate.', icon: ShieldCheck, color: 'text-purple-400' },
              { title: 'Real-time Analytics', desc: 'Track your progress and market trends with live data dashboards.', icon: Target, color: 'text-cyan-400' },
            ].map((feature, i) => (
              <Card key={i} className="p-8 hover:border-indigo-500/30 transition-all group">
                <div className={cn("w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", feature.color)}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-card-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="text-white" size={16} />
            </div>
            <span className="text-xl font-black tracking-tighter">SkillSync</span>
          </div>
          <p className="text-sm text-slate-500">© 2024 SkillSync AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="label-text mb-0 hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="label-text mb-0 hover:text-primary transition-colors">Terms</a>
            <a href="#" className="label-text mb-0 hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
