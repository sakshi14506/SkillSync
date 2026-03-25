import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { parseResume } from '../services/gemini';
import { motion } from 'motion/react';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import * as pdfjs from 'pdfjs-dist';

// Set worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ResumeUpload: React.FC = () => {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const extractTextFromPdf = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }
    return fullText;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    setLoading(true);
    setFileName(file.name);

    try {
      const text = await extractTextFromPdf(file);
      toast.info('Analyzing resume with AI...');
      
      const parsedData = await parseResume(text);
      
      await updateDoc(doc(db, 'users', profile.uid), {
        resumeText: text,
        skills: parsedData.skills || [],
        bio: parsedData.summary || '',
        updatedAt: new Date().toISOString()
      });

      toast.success('Resume parsed and profile updated!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to parse resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[3rem] border border-neutral-100 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
          <FileText className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-neutral-800">Resume Management</h3>
          <p className="text-xs text-neutral-500">Upload PDF to auto-fill your profile</p>
        </div>
      </div>

      <div className="relative group">
        <input 
          type="file" 
          accept=".pdf"
          onChange={handleFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={loading}
        />
        <div className={`
          border-2 border-dashed rounded-[2rem] p-8 text-center transition-all
          ${loading ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-50 border-neutral-200 group-hover:border-indigo-400 group-hover:bg-indigo-50/30'}
        `}>
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
              <p className="text-sm font-bold text-indigo-600">Processing with AI...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <Upload className="w-6 h-6 text-neutral-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-800">
                  {fileName || 'Click or drag PDF here'}
                </p>
                <p className="text-xs text-neutral-400 mt-1">Max file size: 5MB</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {profile?.resumeText && (
        <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div className="flex-1">
            <p className="text-xs font-bold text-green-700 uppercase tracking-wider">Status</p>
            <p className="text-sm text-green-600">Resume parsed successfully</p>
          </div>
          <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
