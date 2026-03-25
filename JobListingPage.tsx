import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, Button, Badge, ProgressBar } from '../components/UI';
import { mockJobs } from '../data/mockData';
import { cn } from '../lib/utils';

const JobListingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType ? job.type === selectedType : true;
    return matchesSearch && matchesType;
  });

  const jobTypes = ['Full-time', 'Internship', 'Contract'];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Explore Opportunities</h1>
          <p className="text-slate-400">Discover jobs that perfectly match your AI-analyzed skill profile.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder="Search by role, company, or keywords..." 
            className="w-full pl-12 pr-4 py-4 bg-slate-800/30 border border-slate-700/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
          <button 
            onClick={() => setSelectedType(null)}
            className={cn(
              "px-6 py-4 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border",
              !selectedType ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "bg-slate-800/30 border-slate-700/50 text-slate-400 hover:text-white"
            )}
          >
            All Types
          </button>
          {jobTypes.map(type => (
            <button 
              key={type}
              onClick={() => setSelectedType(type)}
              className={cn(
                "px-6 py-4 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border",
                selectedType === type ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "bg-slate-800/30 border-slate-700/50 text-slate-400 hover:text-white"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={`/jobs/${job.id}`}>
              <Card className="group hover:border-indigo-500/40 transition-all h-full flex flex-col p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden p-3 group-hover:scale-110 transition-transform">
                    <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-indigo-400 mb-1">
                      <Sparkles size={12} />
                      <span className="text-[10px] font-black uppercase tracking-widest">AI Match</span>
                    </div>
                    <p className="text-2xl font-black text-white">{job.matchScore}%</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                <p className="text-sm text-slate-400 mb-6">{job.company}</p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin size={14} className="text-slate-600" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={14} className="text-slate-600" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <DollarSign size={14} className="text-slate-600" />
                    {job.salary}
                  </div>
                </div>

                <div className="mt-auto space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <span>Skill Match</span>
                      <span className="text-indigo-400">{job.matchScore}%</span>
                    </div>
                    <ProgressBar value={job.matchScore} color="bg-indigo-500" />
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                    <div className="flex flex-wrap gap-1">
                      {job.requirements.slice(0, 2).map((skill, idx) => (
                        <Badge key={idx} className="bg-slate-800/50 text-slate-400 text-[9px]">{skill}</Badge>
                      ))}
                      {job.requirements.length > 2 && <span className="text-[9px] text-slate-600 font-bold">+{job.requirements.length - 2}</span>}
                    </div>
                    <span className="text-[10px] text-slate-600 font-bold uppercase">{job.postedAt}</span>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No jobs found</h3>
          <p className="text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default JobListingPage;
