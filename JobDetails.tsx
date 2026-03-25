import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Job, Application } from '../types';
import { getMatchScore } from '../services/gemini';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  Zap, 
  ArrowLeft,
  Target,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [matchData, setMatchData] = useState<{ score: number, explanation: string, missingSkills: string[] } | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      try {
        const docSnap = await getDoc(doc(db, 'jobs', id));
        if (docSnap.exists()) {
          const jobData = { id: docSnap.id, ...docSnap.data() } as Job;
          setJob(jobData);

          // Check if already applied
          const q = query(collection(db, 'applications'), where('jobId', '==', id), where('studentId', '==', profile?.uid));
          const appSnap = await getDocs(q);
          setHasApplied(!appSnap.empty);

          // Get AI Match Score if student
          if (profile?.role === 'student' && profile.resumeText) {
            const match = await getMatchScore(profile.resumeText, jobData.description);
            setMatchData(match);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, profile]);

  const handleApply = async () => {
    if (!profile || !id || !job) return;
    setApplying(true);
    try {
      await addDoc(collection(db, 'applications'), {
        jobId: id,
        studentId: profile.uid,
        status: 'applied',
        matchScore: matchData?.score || 0,
        appliedAt: new Date().toISOString()
      });
      setHasApplied(true);
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error('Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div></div>;
  if (!job) return <div className="text-center p-12">Job not found.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-neutral-500 hover:text-indigo-600 transition-all font-semibold">
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info */}
          <div className="bg-white p-8 rounded-[3rem] border border-neutral-100 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-6">
                <div className="w-20 h-20 bg-neutral-100 rounded-3xl flex items-center justify-center text-3xl font-bold text-neutral-400">
                  {job.company[0]}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-800 mb-2">{job.title}</h1>
                  <p className="text-xl text-neutral-500 font-medium">{job.company}</p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                job.type === 'Full-time' ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'
              }`}>
                {job.type}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl">
                <MapPin className="w-5 h-5 text-neutral-400" />
                <span className="text-sm font-semibold text-neutral-700">{job.location}</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl">
                <DollarSign className="w-5 h-5 text-neutral-400" />
                <span className="text-sm font-semibold text-neutral-700">{job.salary || 'Competitive'}</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl">
                <Calendar className="w-5 h-5 text-neutral-400" />
                <span className="text-sm font-semibold text-neutral-700">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-800 mb-3">Job Description</h3>
                <p className="text-neutral-600 leading-relaxed whitespace-pre-wrap">{job.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-800 mb-3">Requirements</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-2 text-neutral-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Match Score */}
          {profile?.role === 'student' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-[3rem] border border-neutral-100 shadow-xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-bold text-neutral-800">Smart Match Score</h3>
                </div>
                
                {matchData ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full border-4 border-indigo-600 flex items-center justify-center text-2xl font-bold text-indigo-600 bg-indigo-50">
                        {matchData.score}%
                      </div>
                      <p className="text-sm text-neutral-600 font-medium">{matchData.explanation}</p>
                    </div>

                    {matchData.missingSkills.length > 0 && (
                      <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                        <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Skill Gaps Detected
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {matchData.missingSkills.map(skill => (
                            <span key={skill} className="px-2 py-1 bg-white text-red-600 text-[10px] font-bold rounded-lg border border-red-100">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-neutral-500 mb-4">Upload your resume to see your match score.</p>
                    <button className="text-sm font-bold text-indigo-600 hover:underline">Upload Resume</button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Apply Button */}
          <div className="bg-white p-8 rounded-[3rem] border border-neutral-100 shadow-sm">
            {hasApplied ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="font-bold text-neutral-800">Application Submitted</p>
                <p className="text-sm text-neutral-500">You'll be notified of any status updates.</p>
                <button className="w-full py-3 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all">
                  View Application Status
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-neutral-500 text-center">Ready to take the next step in your career?</p>
                <button 
                  onClick={handleApply}
                  disabled={applying || profile?.role !== 'student'}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
                >
                  {applying ? 'Submitting...' : 'Apply Now'}
                </button>
                <p className="text-[10px] text-neutral-400 text-center">
                  By applying, you agree to share your profile and resume with {job.company}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
