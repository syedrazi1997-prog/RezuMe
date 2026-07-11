import { FileText, Zap, Shield, Palette, ArrowRight, Check, Star, Upload } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onUpload: () => void;
}

export default function LandingPage({ onStart, onUpload }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-stone-900 tracking-tight">RezuMe</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#features" className="hover:text-stone-900 transition-colors">Features</a>
            <a href="#templates" className="hover:text-stone-900 transition-colors">Templates</a>
            <a href="#pricing" className="hover:text-stone-900 transition-colors">Pricing</a>
          </div>
          <button
            onClick={onStart}
            className="px-5 py-2 bg-stone-900 text-white text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors"
          >
            Build Resume
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium mb-8 border border-teal-100">
            <Zap className="w-4 h-4" />
            Professional resumes for just ₹1
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-stone-900 tracking-tight leading-[1.05] mb-6">
            Build a resume that<br />
            <span className="text-teal-600">gets you hired.</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Create a polished, professional resume in minutes. Choose from
            8 premium templates, upload your existing resume to enhance it,
            and download as PDF — all for less than a cup of chai.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStart}
              className="group px-8 py-4 bg-teal-600 text-white text-base font-semibold rounded-xl hover:bg-teal-700 transition-all hover:shadow-lg hover:shadow-teal-600/20 flex items-center gap-2"
            >
              Start Building — Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={onUpload}
              className="group px-8 py-4 bg-white text-stone-900 text-base font-semibold rounded-xl border border-stone-200 hover:border-stone-300 transition-colors flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Existing Resume
            </button>
          </div>
          <p className="text-sm text-stone-400 mt-6">
            No sign-up required to start. Pay only ₹1 when you download.
          </p>
        </div>

        {/* Resume preview mockup */}
        <div className="max-w-4xl mx-auto mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-stone-50 to-transparent z-10 pointer-events-none" style={{ top: '70%' }} />
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-xl shadow-stone-300/40 p-6 transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
              <div className="h-3 w-24 bg-stone-800 rounded mb-4" />
              <div className="h-2 w-16 bg-teal-500 rounded mb-6" />
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-stone-200 rounded" />
                <div className="h-1.5 w-5/6 bg-stone-200 rounded" />
                <div className="h-1.5 w-4/6 bg-stone-200 rounded" />
              </div>
              <div className="h-2 w-20 bg-stone-300 rounded mt-5 mb-3" />
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-stone-100 rounded" />
                <div className="h-1.5 w-3/4 bg-stone-100 rounded" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-2xl shadow-stone-400/40 p-6 z-10 scale-105">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <span className="text-teal-700 font-bold text-lg">AR</span>
                </div>
                <div>
                  <div className="h-3 w-28 bg-stone-800 rounded mb-2" />
                  <div className="h-2 w-20 bg-teal-500 rounded" />
                </div>
              </div>
              <div className="space-y-2 mb-5">
                <div className="h-1.5 w-full bg-stone-200 rounded" />
                <div className="h-1.5 w-5/6 bg-stone-200 rounded" />
                <div className="h-1.5 w-4/6 bg-stone-200 rounded" />
              </div>
              <div className="h-2 w-16 bg-stone-300 rounded mt-5 mb-3" />
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-stone-100 rounded" />
                <div className="h-1.5 w-3/4 bg-stone-100 rounded" />
              </div>
              <div className="h-2 w-16 bg-stone-300 rounded mt-5 mb-3" />
              <div className="flex flex-wrap gap-1.5">
                <div className="h-4 w-12 bg-teal-50 rounded" />
                <div className="h-4 w-16 bg-teal-50 rounded" />
                <div className="h-4 w-10 bg-teal-50 rounded" />
                <div className="h-4 w-14 bg-teal-50 rounded" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-xl shadow-stone-300/40 p-6 transform rotate-[3deg] hover:rotate-0 transition-transform duration-500">
              <div className="border-l-4 border-stone-800 pl-4 mb-5">
                <div className="h-3 w-24 bg-stone-800 rounded mb-2" />
                <div className="h-2 w-16 bg-stone-400 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-stone-200 rounded" />
                <div className="h-1.5 w-5/6 bg-stone-200 rounded" />
              </div>
              <div className="h-2 w-20 bg-stone-300 rounded mt-5 mb-3" />
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-stone-100 rounded" />
                <div className="h-1.5 w-3/4 bg-stone-100 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-stone-900 tracking-tight mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-stone-600">
              Thoughtfully designed tools to help you stand out.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Build your resume in under 5 minutes with our intuitive editor and real-time preview.' },
              { icon: Palette, title: '8 Pro Templates', desc: 'Choose from modern, classic, minimal, compact, executive, creative, elegant, and technical layouts.' },
              { icon: Upload, title: 'Upload & Enhance', desc: 'Already have a resume? Upload it and we\'ll parse it so you can edit, enhance, and reformat instantly.' },
              { icon: Shield, title: 'Privacy First', desc: 'Your data is stored securely. We never share your information with third parties.' },
              { icon: FileText, title: 'ATS Optimized', desc: 'Clean, structured layouts that pass Applicant Tracking Systems used by major companies.' },
              { icon: Check, title: 'No Hidden Fees', desc: 'One flat price of ₹1 per download. Build and preview for free, pay only to export.' },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-stone-200 hover:border-teal-200 hover:shadow-lg hover:shadow-stone-200/50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-5 group-hover:bg-teal-100 transition-colors">
                  <f.icon className="w-6 h-6 text-teal-600" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{f.title}</h3>
                <p className="text-stone-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-stone-900 tracking-tight mb-4">
              Pick your template
            </h2>
            <p className="text-lg text-stone-600">
              Eight professionally designed templates, free to preview.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Modern', desc: 'Clean sidebar layout' },
              { name: 'Classic', desc: 'Traditional & formal' },
              { name: 'Minimal', desc: 'Simple & elegant' },
              { name: 'Compact', desc: 'Dense & efficient' },
              { name: 'Executive', desc: 'Bold & authoritative' },
              { name: 'Creative', desc: 'Vibrant & modern' },
              { name: 'Elegant', desc: 'Centered & refined' },
              { name: 'Technical', desc: 'Developer-focused' },
            ].map((t) => (
              <div key={t.name} className="group cursor-pointer" onClick={onStart}>
                <div className="aspect-[3/4] bg-white rounded-xl shadow-lg shadow-stone-300/40 border border-stone-200 p-5 group-hover:shadow-xl group-hover:shadow-stone-400/40 group-hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="h-2.5 w-20 bg-stone-800 rounded mb-3" />
                  <div className="h-1.5 w-14 bg-stone-400 rounded mb-5" />
                  <div className="space-y-1.5 mb-4">
                    <div className="h-1 w-full bg-stone-200 rounded" />
                    <div className="h-1 w-5/6 bg-stone-200 rounded" />
                    <div className="h-1 w-4/6 bg-stone-200 rounded" />
                  </div>
                  <div className="h-1.5 w-12 bg-stone-300 rounded mb-2" />
                  <div className="space-y-1 mb-4">
                    <div className="h-1 w-full bg-stone-100 rounded" />
                    <div className="h-1 w-3/4 bg-stone-100 rounded" />
                  </div>
                  <div className="h-1.5 w-12 bg-stone-300 rounded mb-2" />
                  <div className="flex flex-wrap gap-1">
                    <div className="h-2.5 w-8 bg-teal-50 rounded" />
                    <div className="h-2.5 w-10 bg-teal-50 rounded" />
                    <div className="h-2.5 w-6 bg-teal-50 rounded" />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-stone-900">{t.name}</h3>
                  <p className="text-sm text-stone-500">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-6 border border-amber-100">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            Simple, honest pricing
          </div>
          <h2 className="text-5xl font-bold text-stone-900 tracking-tight mb-4">
            One resume. One rupee.
          </h2>
          <p className="text-lg text-stone-600 mb-12 max-w-xl mx-auto">
            Build and preview your resume completely free. Pay just ₹1 when
            you're ready to download the PDF. No subscriptions, no hidden costs.
          </p>

          <div className="max-w-md mx-auto bg-stone-50 rounded-3xl border border-stone-200 p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-teal-100/40 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-end justify-center gap-1 mb-2">
                <span className="text-7xl font-bold text-stone-900">₹1</span>
                <span className="text-stone-500 mb-3 text-lg">/resume</span>
              </div>
              <p className="text-stone-500 mb-8">per PDF download</p>
              <div className="space-y-3 text-left mb-10">
                {[
                  'Unlimited free editing & preview',
                  '8 professional templates',
                  'Upload & enhance existing resumes',
                  'ATS-friendly PDF export',
                  'No account required',
                  'Secure payment via Razorpay',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-teal-600" strokeWidth={3} />
                    </div>
                    <span className="text-stone-700">{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={onStart}
                className="w-full py-4 bg-teal-600 text-white text-base font-semibold rounded-xl hover:bg-teal-700 transition-all hover:shadow-lg hover:shadow-teal-600/20"
              >
                Build Your Resume
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-stone-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">RezuMe</span>
          </div>
          <p className="text-stone-400 text-sm">
            Professional resumes for everyone. Just ₹1.
          </p>
        </div>
      </footer>
    </div>
  );
}
