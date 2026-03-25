export type UserRole = 'student' | 'recruiter' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  skills?: string[];
  cgpa?: number;
  branch?: string;
  resumeUrl?: string;
  resumeText?: string;
  bio?: string;
  projects?: any[];
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship';
  description: string;
  requirements: string[];
  salary: string;
  postedBy: string;
  createdAt: string;
  status: 'active' | 'closed';
}

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  status: 'applied' | 'shortlisted' | 'interviewing' | 'selected' | 'rejected';
  matchScore: number;
  appliedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}
