import { useState, useRef } from 'react';
import { X, Upload, FileText, Loader2, AlertCircle, Check } from 'lucide-react';
import type { ResumeData } from '../types/resume';
import { parseResumeText, parseResumeJSON } from '../lib/resumeParser';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: ResumeData) => void;
}

export default function UploadModal({ isOpen, onClose, onImport }: UploadModalProps) {
  const [status, setStatus] = useState<'idle' | 'parsing' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [parsedData, setParsedData] = useState<ResumeData | null>(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  if (!isOpen) return null;

  const reset = () => {
    setStatus('idle');
    setError('');
    setParsedData(null);
    setFileName('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFile = async (file: File) => {
    setStatus('parsing');
    setError('');
    setFileName(file.name);
    try {
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        const text = await file.text();
        const data = parseResumeJSON(text);
        setParsedData(data);
        setStatus('success');
      } else if (file.type.startsWith('text/') || file.name.match(/\.(txt|md)$/)) {
        const text = await file.text();
        const data = parseResumeText(text);
        setParsedData(data);
        setStatus('success');
      } else {
        setError('Please upload a .txt, .md, or .json file. For PDF/Word resumes, copy and paste the text below.');
        setStatus('error');
      }
    } catch {
      setError('Failed to parse the file. Please check the format and try again.');
      setStatus('error');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handlePasteImport = () => {
    const text = textAreaRef.current?.value;
    if (!text || text.trim().length < 20) {
      setError('Please paste at least 20 characters of resume text.');
      setStatus('error');
      return;
    }
    setStatus('parsing');
    setError('');
    try {
      const data = parseResumeText(text);
      setParsedData(data);
      setStatus('success');
    } catch {
      setError('Failed to parse the pasted text.');
      setStatus('error');
    }
  };

  const handleConfirm = () => {
    if (parsedData) {
      onImport(parsedData);
      handleClose();
    }
  };

  const summaryStats = (data: ResumeData) => {
    return [
      { label: 'Name', value: data.personal.fullName || '—' },
      { label: 'Experience', value: `${data.experience.length} entries` },
      { label: 'Education', value: `${data.education.length} entries` },
      { label: 'Skills', value: `${data.skills.length} found` },
      { label: 'Projects', value: `${data.projects.length} entries` },
    ];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-br from-stone-800 to-stone-900 p-6 text-center flex-shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Upload Existing Resume</h2>
          <p className="text-stone-400 text-sm">Import your resume to edit and enhance it</p>
        </div>

        <div className="p-6 overflow-y-auto">
          {status === 'success' && parsedData ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-900">Resume parsed successfully!</p>
                  <p className="text-xs text-stone-500">{fileName ? `From ${fileName}` : 'From pasted text'}</p>
                </div>
              </div>
              <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 mb-5">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">Detected Information</p>
                <div className="space-y-2">
                  {summaryStats(parsedData).map((s) => (
                    <div key={s.label} className="flex justify-between items-center text-sm">
                      <span className="text-stone-500">{s.label}</span>
                      <span className="font-medium text-stone-800">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={reset}
                  className="flex-1 py-3 bg-stone-100 text-stone-700 font-semibold rounded-xl hover:bg-stone-200 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors"
                >
                  Import & Edit
                </button>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 rounded-xl p-8 text-center cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-all mb-4"
              >
                {status === 'parsing' ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
                    <p className="text-sm text-stone-500">Parsing resume...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-6 h-6 text-stone-400" />
                    </div>
                    <p className="text-sm font-semibold text-stone-700 mb-1">
                      Drop your resume here or click to browse
                    </p>
                    <p className="text-xs text-stone-400">Supports .txt, .md, .json files</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,.json,text/*,application/json"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs text-stone-400">or paste your resume text</span>
                </div>
              </div>

              <textarea
                ref={textAreaRef}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all min-h-[100px] resize-y"
                placeholder="Copy and paste your resume text here..."
              />

              <button
                onClick={handlePasteImport}
                disabled={status === 'parsing'}
                className="w-full mt-3 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-60"
              >
                Parse Pasted Text
              </button>

              <p className="text-xs text-stone-400 mt-4 text-center">
                We'll extract your name, contact info, experience, education, and skills automatically.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
