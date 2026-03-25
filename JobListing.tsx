import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Job } from '../types';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Clock, 
  ArrowRight,
  Briefcase,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const JobListing: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, 'jobs'), where('status', '==', 'active'));
        const snap = await getDocs(q);
        setJobs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job)));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || job.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-800">Jobs & Internships</h2>
          <p className="text-neutral-500">Discover opportunities that match your skills.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search by title, company, or skills..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-neutral-100 focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <select 
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="pl-12 pr-10 py-3 bg-white rounded-2xl border border-neutral-100 focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all appearance-none font-semibold text-neutral-700"
            >
              <option>All</option>
              <option>Full-time</option>
              <option>Internship</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job, i) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-8 rounded-[3rem] border border-neutral-100 hover:border-indigo-200 transition-all group shadow-sm hover:shadow-xl relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center text-2xl font-bold text-neutral-400 border border-neutral-100">
                    {job.company[0]}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      job.type === 'Full-time' ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {job.type}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Zap className="w-3 h-3 fill-current" />
                      <span className="text-[10px] font-bold">85% Match</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-neutral-800 group-hover:text-indigo-600 transition-colors mb-1">{job.title}</h3>
                  <p className="text-sm font-semibold text-neutral-500">{job.company}</p>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-medium">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs font-medium">{job.salary || 'Competitive'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-neutral-50 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {job.requirements.slice(0, 2).map(req => (
                      <span key={req} className="px-2 py-1 bg-neutral-50 text-neutral-500 text-[10px] font-bold rounded-lg">
                        {req}
                      </span>
                    ))}
                    {job.requirements.length > 2 && (
                      <span className="px-2 py-1 bg-neutral-50 text-neutral-400 text-[10px] font-bold rounded-lg">
                        +{job.requirements.length - 2}
                      </span>
                    )}
                  </div>
                  <Link 
                    to={`/jobs/${job.id}`}
                    className="p-3 bg-neutral-50 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-50 rounded-full opacity-0 group-hover:opacity-100 transition-all blur-2xl"></div>
            </motion.div>
          ))}
        </div>
      )}

      {filteredJobs.length === 0 && !loading && (
        <div className="text-center py-20 bg-white rounded-[3rem] border border-neutral-100">
          <Briefcase className="w-16 h-16 text-neutral-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-neutral-800">No jobs found</h3>
          <p className="text-neutral-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default JobListing;
