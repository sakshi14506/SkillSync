import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  User, 
  BarChart3, 
  MessageSquare, 
  LogOut, 
  X, 
  Zap,
  Award,
  Brain,
  ChevronRight,
  Target,
  Users,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useAuth } from '../App';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const { role, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const studentLinks = [
    { to: '/student-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/jobs', label: 'Jobs', icon: Briefcase },
    { to: '/mock-interview', label: 'Mock Interview', icon: Brain },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  const recruiterLinks = [
    { to: '/recruiter-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/candidate-ranking', label: 'Candidates', icon: Award },
    { to: '/jobs', label: 'My Jobs', icon: Briefcase },
    { to: '/profile', label: 'Company Profile', icon: User },
  ];

  const adminLinks = [
    { to: '/admin-dashboard', label: 'Analytics', icon: BarChart3 },
    { to: '/recruiter-dashboard', label: 'Recruiters', icon: Users },
    { to: '/student-dashboard', label: 'Students', icon: User },
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const links = role === 'student' ? studentLinks : role === 'recruiter' ? recruiterLinks : adminLinks;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggle}
      />

      {/* Sidebar Content */}
      <aside 
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-bg border-r border-card-border z-50 transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-8">
          {/* Logo */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Zap className="text-white" size={20} />
              </div>
              <span className="text-2xl font-black tracking-tighter">SkillSync</span>
            </div>
            <button onClick={toggle} className="lg:hidden p-2 text-slate-400 hover:text-primary transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto">
            <p className="label-text px-4">Main Menu</p>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => { if (window.innerWidth < 1024) toggle(); }}
                className={({ isActive }) => cn(
                  "flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group",
                  isActive 
                    ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/30 shadow-[0_0_25px_rgba(79,70,229,0.15)] ring-1 ring-indigo-500/20" 
                    : "text-slate-400 hover:text-primary hover:bg-slate-900/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <link.icon size={20} className={cn("transition-colors", "group-hover:text-indigo-400")} />
                  <span className="text-sm font-bold">{link.label}</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </NavLink>
            ))}
            <button className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-slate-400 hover:text-primary hover:bg-slate-900/10 transition-all duration-300 group">
              <div className="flex items-center gap-3">
                <MessageSquare size={20} className="group-hover:text-indigo-400" />
                <span className="text-sm font-bold">Messages</span>
              </div>
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-[10px] flex items-center justify-center text-white font-black">3</span>
            </button>
          </nav>

          {/* User Section */}
          <div className="pt-8 border-t border-card-border space-y-4">
            <div className="flex items-center gap-3 px-2">
              <div className="relative">
                <img 
                  src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                  alt="User" 
                  className="w-10 h-10 rounded-xl border border-card-border"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-bg" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{user?.name || 'Alex Johnson'}</p>
                <p className="label-text mb-0 truncate">{role}</p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-300 group"
            >
              <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-bold">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
