import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  Zap,
  Share2,
  Bookmark,
  Building,
  X,
  FileText,
  Send,
  Loader2,
  User,
  Mail,
  Briefcase,
  Check
} from 'lucide-react';
import { Card, Button, Badge, ProgressBar, Input } from '../components/UI';
import { mockJobs } from '../data/mockData';
import { cn } from '../lib/utils';
import { useAuth } from '../App';
import { toast } from 'sonner';

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, role, onboardingData, applyToJob, applications } = useAuth();
  const job = mockJobs.find(j => j.id === id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    coverLetter: '',
    whyFit: ''
  });

  const hasApplied = applications.some(app => app.jobId === id);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Job not found</h2>
        <Link to="/jobs">
          <Button>Back to Listings</Button>
        </Link>
      </div>
    );
  }

  const handleApply = () => {
    if (role !== 'student') {
      toast.error('Only students can apply for jobs.');
      return;
    }
    if (hasApplied) {
      toast.info('You have already applied for this position.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    applyToJob({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      matchScore: job.matchScore,
      studentName: onboardingData?.fullName || user?.name || 'Anonymous',
      studentEmail: user?.email || '',
      studentSkills: onboardingData?.skills || [],
      coverLetter: formData.coverLetter,
      whyFit: formData.whyFit,
      resumeUrl: onboardingData?.resumeName || 'resume.pdf'
    });

    setIsSubmitting(false);
    setIsModalOpen(false);
    toast.success('Application Submitted Successfully ✅');
    toast.info('Email sent to recruiter successfully 📩');
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Back Button */}
      <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
        <ArrowLeft size={16} /> Back to Jobs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 p-4">
                  <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-white mb-2">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
                    <span className="flex items-center gap-1.5"><Building size={16} className="text-indigo-500" /> {job.company}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={16} className="text-indigo-500" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Clock size={16} className="text-indigo-500" /> {job.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all">
                  <Bookmark size={20} />
                </button>
                <button className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/30 mb-8">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Salary Range</p>
                <p className="text-lg font-black text-white">{job.salary}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Experience</p>
                <p className="text-lg font-black text-white">Entry Level</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Applicants</p>
                <p className="text-lg font-black text-white">{hasApplied ? 43 : 42} Applied</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Posted</p>
                <p className="text-lg font-black text-white">{job.postedAt}</p>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-bold text-white mb-4">About the Role</h3>
                <p className="text-slate-400 leading-relaxed">
                  We are looking for a passionate and talented {job.title} to join our growing team at {job.company}. 
                  In this role, you will be responsible for building high-quality, scalable applications using modern technologies. 
                  You will collaborate with cross-functional teams to define, design, and ship new features.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-4">Key Responsibilities</h3>
                <ul className="space-y-3">
                  {[
                    'Design and implement scalable software solutions.',
                    'Collaborate with product managers and designers to translate requirements into technical specs.',
                    'Write clean, maintainable, and well-tested code.',
                    'Participate in code reviews and contribute to architectural decisions.',
                    'Troubleshoot and debug production issues.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-4">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((skill, i) => (
                    <Badge key={i} className="px-4 py-2 text-sm bg-slate-800/50 border-slate-700/50 text-slate-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>
            </div>
          </Card>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* AI Match Widget */}
          <Card className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-indigo-500/20 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-indigo-400" size={20} />
                AI Match Score
              </h3>
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Zap className="text-indigo-400" size={24} />
              </div>
            </div>

            <div className="flex items-center justify-center mb-8">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="stroke-slate-800/50 stroke-[3]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                  />
                  <motion.path
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: `${job.matchScore}, 100` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="stroke-indigo-500 stroke-[3]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-white">{job.matchScore}%</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Match</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <CheckCircle size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Strengths</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your experience with <span className="text-white font-bold">React</span> and <span className="text-white font-bold">Node.js</span> perfectly aligns with this role.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <AlertCircle size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Skill Gaps</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Consider highlighting your <span className="text-white font-bold">Cloud Architecture</span> knowledge to increase your match score.
                </p>
              </div>
            </div>

            <Button 
              onClick={handleApply}
              disabled={hasApplied}
              className={cn(
                "w-full py-6 text-lg font-black shadow-xl",
                hasApplied ? "bg-slate-800 text-slate-500 shadow-none" : "shadow-indigo-500/20"
              )}
            >
              {hasApplied ? (
                <span className="flex items-center gap-2"><Check size={20} /> Applied</span>
              ) : 'Apply Now'}
            </Button>
          </Card>

          {/* Company Widget */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-white mb-6">About {job.company}</h3>
            <div className="space-y-4">
              <p className="text-sm text-slate-400 leading-relaxed">
                {job.company} is a leading technology company focused on building innovative solutions for the future. 
                With a diverse team and a culture of excellence, we strive to make a positive impact on the world.
              </p>
              <div className="pt-4 border-t border-slate-800/50">
                <Link to="#" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest flex items-center gap-2">
                  View Company Profile <ArrowLeft className="rotate-180" size={14} />
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                      <Briefcase className="text-indigo-400" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight">Apply for Position</h2>
                      <p className="text-slate-400 text-sm font-medium">{job.title} at {job.company}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Full Name"
                      value={onboardingData?.fullName || user?.name || ''}
                      readOnly
                      icon={<User size={18} />}
                      className="bg-slate-800/50 border-slate-700/50 text-slate-400 cursor-not-allowed"
                    />
                    <Input 
                      label="Email Address"
                      value={user?.email || ''}
                      readOnly
                      icon={<Mail size={18} />}
                      className="bg-slate-800/50 border-slate-700/50 text-slate-400 cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="label-text">Skills (Auto-filled from Profile)</label>
                    <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50">
                      {onboardingData?.skills?.map((skill: string, i: number) => (
                        <Badge key={i} variant="indigo">{skill}</Badge>
                      )) || <p className="text-slate-500 text-xs italic">No skills found in profile</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="label-text">Resume</label>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
                      <div className="flex items-center gap-3">
                        <FileText className="text-indigo-400" size={20} />
                        <span className="text-sm font-bold text-white">{onboardingData?.resumeName || 'alex_resume.pdf'}</span>
                      </div>
                      <Badge variant="green">Attached</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="label-text">Cover Letter</label>
                    <textarea 
                      required
                      placeholder="Tell the recruiter about your interest in this role..."
                      className="w-full min-h-[120px] p-4 bg-slate-800/30 border border-slate-700/50 rounded-2xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="label-text">Why are you a good fit?</label>
                    <textarea 
                      required
                      placeholder="Briefly explain your unique qualifications..."
                      className="w-full min-h-[80px] p-4 bg-slate-800/30 border border-slate-700/50 rounded-2xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                      value={formData.whyFit}
                      onChange={(e) => setFormData({...formData, whyFit: e.target.value})}
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit"
                      isLoading={isSubmitting}
                      className="w-full py-6 text-lg font-black shadow-xl shadow-indigo-500/20 group"
                    >
                      <span className="flex items-center gap-2">
                        Submit Application <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobDetailsPage;
