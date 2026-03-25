import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  Video, 
  VideoOff, 
  MicOff, 
  Send, 
  Sparkles, 
  MessageSquare, 
  Play,
  Settings,
  Brain,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Card, Button, Badge, ProgressBar } from '../components/UI';
import { cn } from '../lib/utils';

const MockInterview: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes per question
  const [showFeedback, setShowFeedback] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello Alex! I'm your AI interviewer today. We'll be focusing on your React and System Design skills. Ready to start?" },
  ]);
  const [inputText, setInputText] = useState('');

  const questions = [
    "Can you explain the difference between useMemo and useCallback in React?",
    "How do you handle state management in a large-scale React application?",
    "What is the Virtual DOM and how does it improve performance?",
    "Explain the concept of Higher-Order Components (HOC) in React."
  ];

  React.useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(120);
      setMessages(prev => [...prev, { role: 'ai', text: `Next question: ${questions[currentQuestionIndex + 1]}` }]);
    } else {
      setShowFeedback(true);
    }
  };

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { role: 'user', text: inputText }]);
      setInputText('');
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: "That's a good start. Could you elaborate on how these hooks help with performance optimization specifically in large-scale applications?" }]);
      }, 1000);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <Brain className="text-indigo-400" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter">AI Mock Interview</h1>
            <p className="text-slate-400 text-sm font-medium">Technical Round • React & System Design</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <Clock size={16} className="text-indigo-400" />
            <span className={cn(
              "text-lg font-black tracking-tighter",
              timeLeft < 30 ? "text-rose-500 animate-pulse" : "text-white"
            )}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl">
            <Settings size={18} />
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Video Feed Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {!showFeedback ? (
              <motion.div 
                key="interview"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex-1 flex flex-col gap-6"
              >
                <Card className="flex-1 relative overflow-hidden bg-slate-900 border-slate-800 group">
                  {/* AI Question Card Overlay */}
                  <div className="absolute top-6 left-6 right-6 z-20">
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      key={currentQuestionIndex}
                    >
                      <Card glass className="p-6 border-indigo-500/30 bg-indigo-950/40 backdrop-blur-xl shadow-2xl">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/40">
                            <Sparkles size={20} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Current Question</p>
                            <p className="text-lg font-bold text-white leading-tight tracking-tight">
                              {questions[currentQuestionIndex]}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Main Video (AI Avatar / Placeholder) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-48 h-48 rounded-full bg-indigo-600/20 flex items-center justify-center animate-pulse border border-indigo-500/20">
                        <Brain size={80} className="text-indigo-400" />
                      </div>
                      {/* AI Voice Visualizer */}
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: [12, h * 10, 12] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                            className="w-1.5 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(129,140,248,0.5)]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* User Small Video */}
                  <div className="absolute bottom-6 right-6 w-56 h-36 rounded-2xl bg-slate-800 border-2 border-slate-700 overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    <img src="https://picsum.photos/seed/alex/400/300" alt="User" className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 flex items-center gap-2 px-2 py-1 rounded-lg bg-red-500/80 backdrop-blur-md">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span className="text-[8px] font-black text-white uppercase tracking-widest">REC</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                    <button 
                      onClick={() => setIsRecording(!isRecording)}
                      className={cn(
                        "p-4 rounded-xl transition-all",
                        isRecording ? "bg-red-500 text-white shadow-lg shadow-red-500/40" : "bg-slate-800 text-slate-400 hover:text-white"
                      )}
                    >
                      {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>
                    <button className="p-4 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all">
                      <Video size={24} />
                    </button>
                    <div className="w-px h-8 bg-slate-700 mx-2" />
                    <Button 
                      onClick={handleNextQuestion}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 rounded-xl font-black uppercase tracking-widest text-xs"
                    >
                      {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
                    </Button>
                  </div>
                </Card>

                {/* Real-time Feedback */}
                <Card className="p-6 h-32 flex items-center gap-8 border-slate-800/50">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Confidence Level</span>
                      <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">High</span>
                    </div>
                    <ProgressBar value={85} color="bg-emerald-500" glow />
                  </div>
                  <div className="w-px h-12 bg-slate-800" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pace</span>
                      <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Perfect</span>
                    </div>
                    <ProgressBar value={70} color="bg-indigo-500" glow />
                  </div>
                  <div className="w-px h-12 bg-slate-800" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                      <Zap className="text-indigo-400" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">AI Tip</p>
                      <p className="text-sm text-white font-bold tracking-tight">Maintain eye contact</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col gap-6"
              >
                <Card glow className="flex-1 p-10 flex flex-col items-center justify-center text-center space-y-8 bg-gradient-to-br from-indigo-600/10 via-slate-900 to-slate-950 border-indigo-500/30">
                  <div className="w-24 h-24 rounded-3xl bg-indigo-500 flex items-center justify-center shadow-2xl shadow-indigo-500/40 mb-4">
                    <CheckCircle size={48} className="text-white" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white tracking-tighter">Interview Completed!</h2>
                    <p className="text-slate-400 text-lg max-w-md mx-auto">Great job, Alex! Our AI has analyzed your performance across all technical rounds.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-8 w-full max-w-2xl mt-8">
                    <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Technical Score</p>
                      <p className="text-3xl font-black text-indigo-400">88%</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Confidence</p>
                      <p className="text-3xl font-black text-emerald-400">High</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Communication</p>
                      <p className="text-3xl font-black text-purple-400">92%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-8">
                    <Button variant="primary" className="px-10">View Detailed Report</Button>
                    <Button variant="glass" onClick={() => window.location.reload()}>Try Another Round</Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Chat / Transcript Section */}
        <Card className="flex flex-col p-0 overflow-hidden">
          <div className="p-6 border-b border-slate-800/50 flex items-center justify-between bg-slate-800/20">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare size={16} className="text-indigo-400" />
              Live Transcript
            </h3>
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Live</Badge>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={cn(
                "flex flex-col",
                msg.role === 'user' ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed",
                  msg.role === 'user' 
                    ? "bg-indigo-600 text-white rounded-tr-none" 
                    : "bg-slate-800 text-slate-300 rounded-tl-none border border-slate-700/50"
                )}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-600 font-bold uppercase mt-2">
                  {msg.role === 'ai' ? 'AI Interviewer' : 'You'}
                </span>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-slate-800/50">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Type your response..." 
                className="w-full pl-4 pr-12 py-3 bg-slate-800/30 border border-slate-700/50 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-400 hover:text-white transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MockInterview;
