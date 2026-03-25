import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import RoleSelection from './pages/RoleSelection';
import Onboarding from './pages/Onboarding';
import StudentDashboard from './pages/StudentDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import JobListingPage from './pages/JobListingPage';
import JobDetailsPage from './pages/JobDetailsPage';
import ProfilePage from './pages/ProfilePage';
import MockInterview from './pages/MockInterview';
import CandidateRanking from './pages/CandidateRanking';

// Components
import Layout from './components/Layout';

// Auth Context Simulation
interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Rejected';
  matchScore: number;
  appliedAt: string;
  studentName: string;
  studentEmail: string;
  studentSkills: string[];
  coverLetter: string;
  whyFit: string;
  resumeUrl?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

interface AuthContextType {
  user: any;
  role: 'student' | 'recruiter' | 'admin' | null;
  onboardingData: any;
  applications: Application[];
  notifications: Notification[];
  login: (role?: 'student' | 'recruiter' | 'admin') => void;
  setRole: (role: 'student' | 'recruiter' | 'admin') => void;
  updateOnboardingData: (data: any) => void;
  applyToJob: (application: Omit<Application, 'id' | 'appliedAt' | 'status'>) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markAsRead: (id: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [role, setRoleState] = useState<'student' | 'recruiter' | 'admin' | null>(null);
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Simulate persistent login for demo purposes
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as any;
    const savedUser = localStorage.getItem('user');
    const savedOnboarding = localStorage.getItem('onboardingData');
    const savedApplications = localStorage.getItem('applications');
    const savedNotifications = localStorage.getItem('notifications');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      if (savedRole) setRoleState(savedRole);
      if (savedOnboarding) setOnboardingData(JSON.parse(savedOnboarding));
      if (savedApplications) setApplications(JSON.parse(savedApplications));
      if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  const login = (newRole?: 'student' | 'recruiter' | 'admin') => {
    const userData = { 
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: 'Alex Johnson', 
      email: 'alex.j@university.edu', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' 
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (newRole) {
      setRoleState(newRole);
      localStorage.setItem('userRole', newRole);
    }
  };

  const setRole = (newRole: 'student' | 'recruiter' | 'admin') => {
    setRoleState(newRole);
    localStorage.setItem('userRole', newRole);
  };

  const updateOnboardingData = (data: any) => {
    const newData = { ...onboardingData, ...data };
    setOnboardingData(newData);
    localStorage.setItem('onboardingData', JSON.stringify(newData));
    
    // Also update user name if it was changed in onboarding
    if (data.fullName && user) {
      const updatedUser = { ...user, name: data.fullName };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const applyToJob = (appData: Omit<Application, 'id' | 'appliedAt' | 'status'>) => {
    const newApplication: Application = {
      ...appData,
      id: 'app_' + Math.random().toString(36).substr(2, 9),
      appliedAt: new Date().toISOString(),
      status: 'Applied'
    };
    const updatedApps = [newApplication, ...applications];
    setApplications(updatedApps);
    localStorage.setItem('applications', JSON.stringify(updatedApps));

    // Trigger notifications
    addNotification({
      title: 'Application Submitted',
      message: `You successfully applied for ${appData.jobTitle} at ${appData.company}.`,
      type: 'success'
    });

    addNotification({
      title: 'New Candidate Applied',
      message: `${appData.studentName} applied for ${appData.jobTitle}.`,
      type: 'info'
    });
  };

  const addNotification = (notif: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotif: Notification = {
      ...notif,
      id: 'notif_' + Math.random().toString(36).substr(2, 9),
      time: 'Just now',
      read: false
    };
    const updatedNotifs = [newNotif, ...notifications];
    setNotifications(updatedNotifs);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifs));
  };

  const markAsRead = (id: string) => {
    const updatedNotifs = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updatedNotifs);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifs));
  };

  const logout = () => {
    setUser(null);
    setRoleState(null);
    setOnboardingData(null);
    setApplications([]);
    setNotifications([]);
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    localStorage.removeItem('onboardingData');
    localStorage.removeItem('applications');
    localStorage.removeItem('notifications');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role, 
      onboardingData, 
      applications, 
      notifications,
      login, 
      setRole, 
      updateOnboardingData, 
      applyToJob, 
      addNotification,
      markAsRead,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ children, allowedRoles }) => {
  const { user, role } = useAuth();
  
  if (!user) return <Navigate to="/auth" />;
  if (allowedRoles && role && !allowedRoles.includes(role)) return <Navigate to="/" />;
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Role Selection & Onboarding Flow */}
          <Route path="/role-selection" element={
            <ProtectedRoute>
              <RoleSelection />
            </ProtectedRoute>
          } />
          <Route path="/onboarding/:role" element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          } />

          {/* Protected Routes with Layout */}
          <Route element={<Layout />}>
            {/* Student Routes */}
            <Route path="/student-dashboard" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/jobs" element={
              <ProtectedRoute allowedRoles={['student', 'recruiter']}>
                <JobListingPage />
              </ProtectedRoute>
            } />
            <Route path="/jobs/:id" element={
              <ProtectedRoute allowedRoles={['student', 'recruiter']}>
                <JobDetailsPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['student', 'recruiter']}>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/mock-interview" element={
              <ProtectedRoute allowedRoles={['student']}>
                <MockInterview />
              </ProtectedRoute>
            } />

            {/* Recruiter Routes */}
            <Route path="/recruiter-dashboard" element={
              <ProtectedRoute allowedRoles={['recruiter']}>
                <RecruiterDashboard />
              </ProtectedRoute>
            } />
            <Route path="/candidate-ranking" element={
              <ProtectedRoute allowedRoles={['recruiter']}>
                <CandidateRanking />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Redirect based on role if accessing /dashboard */}
            <Route path="/dashboard" element={<DashboardRedirect />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <Toaster position="top-right" theme={theme} richColors />
    </>
  );
};

const DashboardRedirect = () => {
  const { role } = useAuth();
  if (role === 'student') return <Navigate to="/student-dashboard" />;
  if (role === 'recruiter') return <Navigate to="/recruiter-dashboard" />;
  if (role === 'admin') return <Navigate to="/admin-dashboard" />;
  return <Navigate to="/role-selection" />;
};

export default App;
