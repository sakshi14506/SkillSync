import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Zap, 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  MoreVertical,
  TrendingUp,
  Award,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { Card, Button, Badge, ProgressBar } from '../components/UI';
import { mockStudents } from '../data/mockData';
import { cn } from '../lib/utils';

const CandidateRanking: React.FC = () => {
  const [biasFreeMode, setBiasFreeMode] = useState(true);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Candidate Ranking</h1>
          <p className="text-slate-400">AI-driven talent discovery with objective evaluation.</p>
        </div>
        <div className="flex items-center gap-3 p-1 rounded-2xl bg-slate-800 border border-slate-700">
          <button 
            onClick={() => setBiasFreeMode(true)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
              biasFreeMode ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:text-slate-300"
            )}
          >
            <ShieldCheck size={14} /> Bias-Free
          </button>
          <button 
            onClick={() => setBiasFreeMode(false)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
              !biasFreeMode ? "bg-slate-700 text-white" : "text-slate-500 hover:text-slate-300"
            )}
          >
            <ShieldAlert size={14} /> Standard
          </button>
        </div>
      </div>

      {/* Analytics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <Users className="text-indigo-400" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Candidates</p>
            <p className="text-xl font-black text-white">1,240</p>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Zap className="text-purple-400" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Shortlisted</p>
            <p className="text-xl font-black text-white">42</p>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
            <Award className="text-green-400" size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Top Matches</p>
            <p className="text-xl font-black text-white">12</p>
          </div>
        </Card>
      </div>

      {/* Main Table Area */}
      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search by skills or keywords..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-800/30 border border-slate-700/50 rounded-xl text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter size={14} /> Advanced Filters
            </Button>
            <Button size="sm">Export Report</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/20">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rank</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Candidate</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Skills & Expertise</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Score</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {mockStudents.map((student, i) => (
                <motion.tr 
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-6">
                    <span className="text-sm font-black text-slate-500">#{i + 1}</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden">
                        <img 
                          src={student.avatar} 
                          alt={student.name} 
                          className={cn(
                            "w-full h-full object-cover transition-all duration-500",
                            biasFreeMode ? "grayscale blur-md scale-110" : "grayscale-0 blur-0 scale-100"
                          )} 
                        />
                      </div>
                      <div>
                        <h4 className={cn(
                          "text-sm font-bold transition-all",
                          biasFreeMode ? "text-slate-400 blur-[2px]" : "text-white"
                        )}>
                          {biasFreeMode ? "Candidate " + student.id.split('-')[1] : student.name}
                        </h4>
                        <p className="text-xs text-slate-500">{student.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {student.skills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} className="bg-slate-800/50 text-slate-400 text-[9px]">{skill}</Badge>
                      ))}
                      {student.skills.length > 3 && <span className="text-[9px] text-slate-600 font-bold">+{student.skills.length - 3}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="w-24">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-indigo-400">{student.matchScore}%</span>
                      </div>
                      <ProgressBar value={student.matchScore} color="bg-indigo-500" />
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Shortlisted</Badge>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-400/5 rounded-lg transition-all">
                        <MessageSquare size={18} />
                      </button>
                      <button className="p-2 text-slate-500 hover:text-white rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default CandidateRanking;
