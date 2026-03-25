import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  Github, 
  Chrome,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/UI';
import { cn } from '../lib/utils';
import { useAuth } from '../App';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'student' | 'recruiter' | 'admin'>('student');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/role-selection');
  };

  const handleSocialLogin = () => {
    login();
    navigate('/role-selection');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-bg text-text relative overflow-hidden transition-colors duration-500">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Branding & Info */}
        <div className="hidden lg:block space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="text-white" size={24} />
            </div>
            <span className="text-3xl font-black tracking-tighter">SkillSync</span>
          </div>
          
          <h1 className="text-5xl font-black leading-tight">
            The Future of <br />
            <span className="neon-text">Campus Hiring</span> <br />
            is Here.
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed max-w-md">
            Join thousands of students and top recruiters in the most advanced AI-powered placement ecosystem.
          </p>

          <div className="space-y-6 pt-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900/10 border border-card-border flex items-center justify-center shrink-0">
                <Sparkles className="text-indigo-400" size={20} />
              </div>
              <div>
                <h4 className="font-bold mb-1">AI Skill Matching</h4>
                <p className="text-sm text-slate-500">Our neural engine finds the perfect role for your unique skill set.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900/10 border border-card-border flex items-center justify-center shrink-0">
                <ShieldCheck className="text-purple-400" size={20} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Bias-Free Evaluation</h4>
                <p className="text-sm text-slate-500">Objective, data-driven ranking ensures the best talent gets noticed.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900/10 border border-card-border flex items-center justify-center shrink-0">
                <Globe className="text-cyan-400" size={20} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Global Opportunities</h4>
                <p className="text-sm text-slate-500">Connect with top-tier companies from around the world.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12 shadow-2xl">
            <div className="mb-10">
              <h2 className="text-3xl font-black mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-slate-400">
                {isLogin ? 'Sign in to your SkillSync account' : 'Join the SkillSync community today'}
              </p>
            </div>

            {/* Role Selector */}
            <div className="grid grid-cols-3 gap-2 mb-8 p-1 rounded-2xl bg-slate-800/10 border border-card-border">
              {(['student', 'recruiter', 'admin'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={cn(
                    "py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    role === r ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="space-y-2">
                  <label className="label-text">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="input-field pl-12"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="label-text">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="input-field pl-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="label-text">Password</label>
                  {isLogin && (
                    <button type="button" className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest">Forgot?</button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="input-field pl-12"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <Button type="submit" className="w-full max-w-[280px] py-4 text-base font-black shadow-xl shadow-indigo-500/20">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </div>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-card-border"></div></div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                <span className="bg-bg px-4 text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleSocialLogin} className="flex items-center justify-center gap-3 py-3 rounded-2xl bg-slate-800/10 border border-card-border font-bold text-sm hover:bg-slate-700/10 transition-all">
                <Chrome size={18} /> Google
              </button>
              <button onClick={handleSocialLogin} className="flex items-center justify-center gap-3 py-3 rounded-2xl bg-slate-800/10 border border-card-border font-bold text-sm hover:bg-slate-700/10 transition-all">
                <Github size={18} /> GitHub
              </button>
            </div>

            <p className="mt-10 text-center text-sm text-slate-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
