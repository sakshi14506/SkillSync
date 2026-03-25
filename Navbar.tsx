import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Sparkles,
  Zap,
  User,
  Settings,
  LogOut,
  Check,
  Clock,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../App';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user, role, logout, notifications, markAsRead } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationTab, setNotificationTab] = useState<'all' | 'unread'>('all');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [recentSearches] = useState(['Frontend Developer', 'React Engineer', 'UI/UX Designer']);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredNotifications = notificationTab === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 w-full z-30 bg-slate-950/50 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Mobile Toggle & Logo */}
        <div className="flex items-center gap-4 lg:hidden">
          <button 
            onClick={toggleSidebar}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <Zap className="text-indigo-500" size={20} />
            <span className="text-xl font-black text-white tracking-tighter">SkillSync</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl relative group" ref={searchRef}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search for jobs, candidates, or skills..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchSuggestions(true);
            }}
            onFocus={() => setShowSearchSuggestions(true)}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-12 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            ⌘ K
          </div>

          <AnimatePresence>
            {showSearchSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
              >
                {searchQuery.length > 0 ? (
                  <div className="p-4">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Suggestions</p>
                    <div className="space-y-1">
                      {['Software Engineer', 'Product Manager', 'Data Scientist'].map((s, i) => (
                        <button 
                          key={i}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all text-left"
                          onClick={() => {
                            setSearchQuery(s);
                            setShowSearchSuggestions(false);
                          }}
                        >
                          <Search size={14} className="text-slate-500" />
                          <span className="text-sm font-medium">{s}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Recent Searches</p>
                    <div className="space-y-1">
                      {recentSearches.map((s, i) => (
                        <button 
                          key={i}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all text-left"
                          onClick={() => {
                            setSearchQuery(s);
                            setShowSearchSuggestions(false);
                          }}
                        >
                          <Clock size={14} className="text-slate-500" />
                          <span className="text-sm font-medium">{s}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="p-3 bg-slate-950/50 border-t border-slate-800 text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Type to see more results</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest"
          >
            <Sparkles size={14} /> AI Engine Active
          </motion.div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={cn(
                "p-2.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all relative",
                showNotifications && "text-white bg-slate-900"
              )}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-rose-500 border-2 border-slate-950 text-[8px] font-bold text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-5 border-b border-slate-800 bg-slate-950/30">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Notifications</p>
                      {unreadCount > 0 && (
                        <button 
                          onClick={() => notifications.forEach(n => markAsRead(n.id))}
                          className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest cursor-pointer hover:text-indigo-300 transition-colors"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="flex gap-2 p-1 bg-slate-900/50 rounded-lg border border-slate-800/50">
                      <button 
                        onClick={() => setNotificationTab('all')}
                        className={cn(
                          "flex-1 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all",
                          notificationTab === 'all' ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:text-slate-300"
                        )}
                      >
                        All
                      </button>
                      <button 
                        onClick={() => setNotificationTab('unread')}
                        className={cn(
                          "flex-1 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all relative",
                          notificationTab === 'unread' ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:text-slate-300"
                        )}
                      >
                        Unread
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.5)]" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map((notif) => (
                        <div 
                          key={notif.id}
                          onClick={() => markAsRead(notif.id)}
                          className={cn(
                            "p-5 border-b border-slate-800/50 hover:bg-slate-800/40 transition-all cursor-pointer relative group",
                            !notif.read && "bg-indigo-500/[0.03]"
                          )}
                        >
                          {!notif.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />}
                          <div className="flex gap-4">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                              notif.type === 'success' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                            )}>
                              {notif.type === 'success' ? <Check size={16} /> : <Zap size={16} />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{notif.title}</p>
                              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{notif.message}</p>
                              <div className="flex items-center gap-1.5 mt-3 text-slate-500">
                                <Clock size={12} />
                                <span className="text-[9px] font-black uppercase tracking-widest">{notif.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4 border border-slate-700/50">
                          <Bell className="text-slate-600" size={24} />
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">All caught up!</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-slate-950/50 text-center border-t border-slate-800">
                    <button className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] hover:text-white transition-colors">View All Activity</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-800/50 relative" ref={profileRef}>
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-white">{user?.name || 'Alex Johnson'}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{role}</p>
            </div>
            <div 
              className="relative cursor-pointer group"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img 
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                alt="Avatar" 
                className={cn(
                  "w-10 h-10 rounded-xl border border-slate-700 hover:border-indigo-500 transition-all",
                  showProfileMenu && "border-indigo-500 ring-2 ring-indigo-500/20"
                )}
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
            </div>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-4 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-5 border-b border-slate-800 bg-slate-950/50">
                    <p className="text-xs font-black text-white truncate tracking-tight">{user?.name}</p>
                    <p className="text-[10px] font-bold text-slate-500 truncate uppercase tracking-widest mt-0.5">{user?.email}</p>
                  </div>
                  <div className="p-2.5">
                    <Link 
                      to="/profile" 
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                        <User size={16} className="text-indigo-400" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.1em]">View Profile</span>
                    </Link>
                    <button 
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                        <Settings size={16} className="group-hover:text-indigo-400 transition-colors" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.1em]">Settings</span>
                    </button>
                    <div className="h-px bg-slate-800/50 my-2.5 mx-2" />
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:text-white hover:bg-rose-500/10 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors">
                        <LogOut size={16} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.1em]">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
