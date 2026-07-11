import { useState, useEffect, useCallback } from 'react';
import { FileText, Download, ArrowLeft, Eye, Pencil, Check, Loader2 } from 'lucide-react';
import LandingPage from './components/LandingPage';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import PaymentModal from './components/PaymentModal';
import UploadModal from './components/UploadModal';
import { supabase } from './lib/supabase';
import { emptyResume, type ResumeData, type TemplateId } from './types/resume';

type View = 'landing' | 'builder';

const TEMPLATES: { id: TemplateId; name: string }[] = [
  { id: 'modern', name: 'Modern' },
  { id: 'classic', name: 'Classic' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'compact', name: 'Compact' },
  { id: 'executive', name: 'Executive' },
  { id: 'creative', name: 'Creative' },
  { id: 'elegant', name: 'Elegant' },
  { id: 'technical', name: 'Technical' },
];

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [data, setData] = useState<ResumeData>(emptyResume);
  const [template, setTemplate] = useState<TemplateId>('modern');
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const [showPayment, setShowPayment] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  const handleStart = () => {
    setView('builder');
    setData(emptyResume);
    setTemplate('modern');
    setResumeId(null);
    setIsPaid(false);
    setMobileView('edit');
  };

  const handleUpload = () => {
    setShowUpload(true);
  };

  const handleImport = (importedData: ResumeData) => {
    setView('builder');
    setData(importedData);
    setResumeId(null);
    setIsPaid(false);
    setMobileView('edit');
  };

  const handleBack = () => {
    setView('landing');
  };

  const saveResume = useCallback(async () => {
    setSaving(true);
    try {
      if (resumeId) {
        await supabase
          .from('resumes')
          .update({ data, template, updated_at: new Date().toISOString() })
          .eq('id', resumeId);
      } else {
        const { data: row } = await supabase
          .from('resumes')
          .insert({ data, template })
          .select('id')
          .single();
        if (row?.id) setResumeId(row.id);
      }
      setSavedAt(new Date());
    } catch {
      // silent fail — saving is best-effort
    } finally {
      setSaving(false);
    }
  }, [data, template, resumeId]);

  useEffect(() => {
    if (view !== 'builder') return;
    if (data === emptyResume && !resumeId) return;
    const timer = setTimeout(() => saveResume(), 1500);
    return () => clearTimeout(timer);
  }, [data, template, view, resumeId, saveResume]);

  const handleDownload = () => {
    if (!isPaid) {
      setShowPayment(true);
    } else {
      window.print();
    }
  };

  const handlePaid = () => {
    setIsPaid(true);
    setShowPayment(false);
  };

  if (view === 'landing') {
    return (
      <>
        <LandingPage onStart={handleStart} onUpload={handleUpload} />
        <UploadModal isOpen={showUpload} onClose={() => setShowUpload(false)} onImport={handleImport} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="no-print sticky top-0 z-40 bg-white border-b border-stone-200">
        <div className="px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-stone-900 hidden sm:block">RezuMe</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-stone-100 rounded-lg p-1 overflow-x-auto max-w-md">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  template === t.id
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {saving ? (
              <span className="text-xs text-stone-400 flex items-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Saving...
              </span>
            ) : savedAt ? (
              <span className="text-xs text-stone-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                Saved
              </span>
            ) : null}
            {isPaid && (
              <span className="hidden sm:flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                <Check className="w-3.5 h-3.5" />
                Paid
              </span>
            )}
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">{isPaid ? 'Download PDF' : 'Download (₹1)'}</span>
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-1 px-4 pb-2 overflow-x-auto">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-all ${
                template === t.id
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-500'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="md:hidden flex border-t border-stone-200">
          <button
            onClick={() => setMobileView('edit')}
            className={`flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              mobileView === 'edit' ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/30' : 'text-stone-400'
            }`}
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              mobileView === 'preview' ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/30' : 'text-stone-400'
            }`}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
        </div>
      </header>

      <div className="flex">
        <div className={`no-print w-full md:w-[420px] md:flex-shrink-0 ${mobileView === 'edit' ? 'block' : 'hidden md:block'}`}>
          <div className="p-4 sticky top-[120px] md:top-[56px]">
            <ResumeForm data={data} onChange={setData} />
          </div>
        </div>

        <div className={`flex-1 ${mobileView === 'preview' ? 'block' : 'hidden md:block'}`}>
          <div className="p-4 md:p-8 flex justify-center overflow-x-auto bg-stone-200/40 min-h-[calc(100vh-56px)]">
            <div className="print-area">
              <div className="resume-page shadow-2xl shadow-stone-400/30 rounded-sm overflow-hidden border border-stone-200">
                <ResumePreview data={data} template={template} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        resumeId={resumeId}
        onPaid={handlePaid}
      />
    </div>
  );
}
