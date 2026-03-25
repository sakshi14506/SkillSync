import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Briefcase, 
  TrendingUp, 
  AlertTriangle, 
  Settings, 
  Activity,
  ArrowUpRight,
  ChevronRight,
  Zap,
  Globe,
  Database,
  Lock,
  ArrowDownRight,
  FileText
} from 'lucide-react';
import { Card, Button, Badge, ProgressBar } from '../components/UI';
import { cn } from '../lib/utils';
import { useAuth } from '../App';

const AdminDashboard: React.FC = () => {
  const { user, onboardingData } = useAuth();
  const placementData = [
    { month: 'Jan', placements: 45 },
    { month: 'Feb', placements: 52 },
    { month: 'Mar', placements: 48 },
    { month: 'Apr', placements: 61 },
    { month: 'May', placements: 55 },
    { month: 'Jun', placements: 67 },
  ];

  const skillData = [
    { name: 'React', count: 85 },
    { name: 'Python', count: 72 },
    { name: 'Node.js', count: 64 },
    { name: 'UI/UX', count: 58 },
    { name: 'Cloud', count: 45 },
  ];

  const industryData = [
    { name: 'Fintech', value: 35 },
    { name: 'AI/ML', value: 25 },
    { name: 'E-commerce', value: 20 },
    { name: 'Healthtech', value: 20 },
  ];

  const userGrowthData = [
    { name: 'Jan', users: 4000 },
    { name: 'Feb', users: 5500 },
    { name: 'Mar', users: 7200 },
    { name: 'Apr', users: 8900 },
    { name: 'May', users: 10240 },
  ];

  const COLORS = ['#6366f1', '#a855f7', '#22d3ee', '#10b981'];

  const stats = [
    { label: 'Total Students', value: '10,240', trend: '+8%', up: true, icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Total Recruiters', value: '2,210', trend: '+15%', up: true, icon: Briefcase, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Placement Rate', value: '94%', trend: 'Stable', up: true, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Active Jobs', value: '1,280', trend: '+5%', up: true, icon: Zap, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <Badge variant="indigo" className="px-3 py-1 text-[10px] font-black tracking-widest uppercase bg-indigo-500/10 border-indigo-500/20 text-indigo-400">
              Admin Console
            </Badge>
            <div className="h-1 w-1 rounded-full bg-slate-700" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Online</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-black text-white tracking-tighter leading-none"
          >
            Welcome, <span className="neon-text">{user?.name?.split(' ')[0] || 'Admin'}</span>! 👋
          </motion.h1>
          <p className="text-slate-400 font-medium text-lg">
            {onboardingData?.collegeName ? `Governing ${onboardingData.collegeName} placement ecosystem.` : 'Platform-wide monitoring and system governance.'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/profile">
            <Button variant="glass" className="flex items-center gap-2 group border-slate-800/50 hover:border-indigo-500/30">
              <FileText size={18} className="group-hover:text-indigo-400 transition-colors" /> Profile
            </Button>
          </Link>
          <Button variant="primary" className="flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all">
            <Shield size={18} /> Security Audit
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card glow className="p-6 group hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 border-slate-800/50 hover:border-indigo-500/30">
              <div className="flex items-start justify-between mb-6">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner", stat.bg, stat.color)}>
                  <stat.icon size={28} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest",
                  stat.up ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                )}>
                  {stat.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-4xl font-black text-white tracking-tighter">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Placement Trend Chart */}
        <Card className="lg:col-span-2 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <TrendingUp className="text-indigo-400" size={20} />
              </div>
              Placement Velocity
            </h2>
            <Badge variant="indigo">2024 Session</Badge>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={placementData}>
                <defs>
                  <linearGradient id="colorPlacements" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '12px' }}
                  itemStyle={{ color: '#6366f1', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="placements" 
                  stroke="#6366f1" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorPlacements)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Industry Distribution */}
        <Card className="p-8">
          <h3 className="text-xl font-black text-white mb-8 tracking-tight text-center">Industry Focus</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 mt-8">
            {industryData.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.name}</span>
                </div>
                <span className="text-sm font-black text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* System Logs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Activity className="text-indigo-400" size={20} />
              </div>
              Live System Activity
            </h2>
            <Button variant="ghost" size="sm" className="group">
              View All Logs <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <Card className="p-0 overflow-hidden border-slate-800/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/50 bg-slate-900/30">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Event</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Timestamp</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/30">
                  {[
                    { event: 'New Recruiter Signup', status: 'Success', time: '2 mins ago', color: 'text-emerald-400' },
                    { event: 'AI Matching Engine', status: 'Processing', time: '5 mins ago', color: 'text-indigo-400' },
                    { event: 'Database Backup', status: 'Completed', time: '12 mins ago', color: 'text-emerald-400' },
                    { event: 'Failed Login Attempt', status: 'Blocked', time: '15 mins ago', color: 'text-rose-400' },
                    { event: 'System Update', status: 'Success', time: '1 hour ago', color: 'text-emerald-400' },
                  ].map((log, i) => (
                    <tr key={i} className="hover:bg-slate-900/20 transition-colors group">
                      <td className="px-8 py-5">
                        <p className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors">{log.event}</p>
                      </td>
                      <td className="px-8 py-5">
                        <Badge variant={log.status === 'Success' || log.status === 'Completed' ? 'green' : log.status === 'Processing' ? 'indigo' : 'rose'}>
                          {log.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{log.time}</p>
                      </td>
                      <td className="px-8 py-5">
                        <button className="p-2 text-slate-500 hover:text-white transition-colors">
                          <ArrowUpRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* User Growth Chart */}
        <Card className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
              <Users className="text-purple-400" size={20} />
              User Growth
            </h3>
            <Badge variant="purple">+24% MoM</Badge>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                />
                <Bar dataKey="users" fill="#a855f7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* System Health & Security */}
        <div className="space-y-8">
          <Card glow className="p-8 border-indigo-500/20 bg-indigo-500/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                <Activity className="text-indigo-400" size={20} />
                System Health
              </h3>
              <Badge variant="green">99.9% Uptime</Badge>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Database className="text-indigo-400" size={18} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Database Load</span>
                  </div>
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Optimal</span>
                </div>
                <ProgressBar value={32} color="bg-indigo-500" glow />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="text-purple-400" size={18} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Engine Latency</span>
                  </div>
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">42ms</span>
                </div>
                <ProgressBar value={15} color="bg-purple-500" glow />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="text-emerald-400" size={18} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Scans</span>
                  </div>
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Secure</span>
                </div>
                <ProgressBar value={100} color="bg-emerald-500" glow />
              </div>
            </div>
          </Card>

          <Card className="p-8 border-rose-500/20 bg-rose-500/5">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-rose-500" size={20} />
              <h3 className="text-xl font-black text-white tracking-tight">Security Alerts</h3>
            </div>
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
              <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Recent Activity</p>
              <p className="text-sm text-slate-300 font-medium">No critical threats detected in the last 24h.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
