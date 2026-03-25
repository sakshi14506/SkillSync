import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Calendar, 
  School, 
  Code, 
  Briefcase, 
  Rocket, 
  Upload, 
  Target,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Building,
  Users,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Input, Badge, ProgressBar } from '../components/UI';
import { cn } from '../lib/utils';
import { useAuth } from '../App';

const Onboarding: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { updateOnboardingData } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    fullName: '',
    collegeName: '',
    branch: '',
    passingYear: '',
    internships: '',
    projects: '',
    targetRoles: '',
    companyName: '',
    designation: '',
    experience: '',
    hiringDomains: '',
    companyDescription: '',
    department: '',
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  const totalSteps = role === 'student' ? 3 : 1;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Finalize onboarding
      const finalData = { ...formData, skills };
      updateOnboardingData(finalData);
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const renderStudentForm = () => {
    return (
      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white tracking-tight">Personal Details</h2>
                <p className="text-slate-400 text-sm">Let's start with the basics.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Full Name" 
                  name="fullName"
                  placeholder="John Doe" 
                  icon={<User size={18} />} 
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                <Input 
                  label="College Name" 
                  name="collegeName"
                  placeholder="University of Technology" 
                  icon={<School size={18} />} 
                  value={formData.collegeName}
                  onChange={handleInputChange}
                />
                <Input 
                  label="Branch / Degree" 
                  name="branch"
                  placeholder="Computer Science" 
                  icon={<GraduationCap size={18} />} 
                  value={formData.branch}
                  onChange={handleInputChange}
                />
                <Input 
                  label="Passing Year" 
                  name="passingYear"
                  placeholder="2025" 
                  icon={<Calendar size={18} />} 
                  value={formData.passingYear}
                  onChange={handleInputChange}
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white tracking-tight">Skills & Experience</h2>
                <p className="text-slate-400 text-sm">Tell us what you're good at.</p>
              </div>
              <div className="space-y-4">
                <form onSubmit={addSkill} className="space-y-2">
                  <Input 
                    label="Add Skills" 
                    placeholder="Press Enter to add" 
                    icon={<Code size={18} />}
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <Badge key={skill} className="flex items-center gap-2 pr-2 group">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="hover:text-white transition-colors">×</button>
                      </Badge>
                    ))}
                  </div>
                </form>
                <Input 
                  label="Past Internships" 
                  name="internships"
                  placeholder="Company Name, Role" 
                  icon={<Briefcase size={18} />} 
                  value={formData.internships}
                  onChange={handleInputChange}
                />
                <Input 
                  label="Key Projects" 
                  name="projects"
                  placeholder="Project Name, Tech Stack" 
                  icon={<Rocket size={18} />} 
                  value={formData.projects}
                  onChange={handleInputChange}
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white tracking-tight">Final Touches</h2>
                <p className="text-slate-400 text-sm">Upload your resume and set your goals.</p>
              </div>
              <div className="space-y-6">
                <div className="p-8 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/30 flex flex-col items-center justify-center text-center group hover:border-indigo-500/50 transition-all cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="text-indigo-400" size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Upload Resume</h3>
                  <p className="text-slate-500 text-sm">Drag & drop your PDF here or click to browse</p>
                </div>
                <Input 
                  label="Dream Role / Target Companies" 
                  name="targetRoles"
                  placeholder="Software Engineer at Google" 
                  icon={<Target size={18} />} 
                  value={formData.targetRoles}
                  onChange={handleInputChange}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between pt-8 border-t border-slate-800/50">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={step === 1}
            className={cn(step === 1 && 'opacity-0')}
          >
            <ArrowLeft className="mr-2" size={18} /> Back
          </Button>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={cn('w-2 h-2 rounded-full transition-all duration-300', step === i ? 'w-8 bg-indigo-500' : 'bg-slate-800')} />
            ))}
          </div>
          <Button onClick={handleNext}>
            {step === totalSteps ? 'Complete' : 'Next'} <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </div>
    );
  };

  const renderRecruiterForm = () => {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white tracking-tight">Recruiter Profile</h2>
          <p className="text-slate-400 text-sm">Help us understand your hiring needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Full Name" 
            name="fullName"
            placeholder="Jane Smith" 
            icon={<User size={18} />} 
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <Input 
            label="Company Name" 
            name="companyName"
            placeholder="TechFlow AI" 
            icon={<Building size={18} />} 
            value={formData.companyName}
            onChange={handleInputChange}
          />
          <Input 
            label="Role / Designation" 
            name="designation"
            placeholder="Talent Acquisition Lead" 
            icon={<Briefcase size={18} />} 
            value={formData.designation}
            onChange={handleInputChange}
          />
          <Input 
            label="Years of Experience" 
            name="experience"
            placeholder="5+" 
            icon={<Calendar size={18} />} 
            value={formData.experience}
            onChange={handleInputChange}
          />
        </div>
        <Input 
          label="Hiring Domains" 
          name="hiringDomains"
          placeholder="Frontend, Backend, AI/ML" 
          icon={<Users size={18} />} 
          value={formData.hiringDomains}
          onChange={handleInputChange}
        />
        <div className="space-y-1.5">
          <label className="label-text">Company Description</label>
          <textarea 
            name="companyDescription"
            className="input-field min-h-[120px] resize-none" 
            placeholder="Tell us about your company culture and mission..."
            value={formData.companyDescription}
            onChange={handleInputChange}
          />
        </div>
        <Button onClick={handleNext} className="w-full">
          Complete Onboarding <CheckCircle className="ml-2" size={18} />
        </Button>
      </div>
    );
  };

  const renderAdminForm = () => {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white tracking-tight">Admin Registration</h2>
          <p className="text-slate-400 text-sm">Set up your administrative profile.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Full Name" 
            name="fullName"
            placeholder="Dr. Robert Brown" 
            icon={<User size={18} />} 
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <Input 
            label="College Name" 
            name="collegeName"
            placeholder="Institute of Engineering" 
            icon={<School size={18} />} 
            value={formData.collegeName}
            onChange={handleInputChange}
          />
          <Input 
            label="Designation" 
            name="designation"
            placeholder="Placement Officer" 
            icon={<ShieldCheck size={18} />} 
            value={formData.designation}
            onChange={handleInputChange}
          />
          <Input 
            label="Department" 
            name="department"
            placeholder="Career Services" 
            icon={<FileText size={18} />} 
            value={formData.department}
            onChange={handleInputChange}
          />
        </div>
        <Input 
          label="Years of Experience" 
          name="experience"
          placeholder="10+" 
          icon={<Calendar size={18} />} 
          value={formData.experience}
          onChange={handleInputChange}
        />
        <Button onClick={handleNext} className="w-full">
          Complete Onboarding <CheckCircle className="ml-2" size={18} />
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full relative z-10"
      >
        <Card className="p-10">
          {role === 'student' && renderStudentForm()}
          {role === 'recruiter' && renderRecruiterForm()}
          {role === 'admin' && renderAdminForm()}
        </Card>
      </motion.div>
    </div>
  );
};

export default Onboarding;
