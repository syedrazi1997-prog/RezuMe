import type { ResumeData, TemplateId } from '../types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateId;
}

function formatDateRange(start: string, end: string, current?: boolean) {
  const e = current ? 'Present' : end;
  if (start && e) return `${start} — ${e}`;
  return start || e || '';
}

function ModernTemplate({ data }: { data: ResumeData }) {
  const { personal, experience, education, skills, projects } = data;
  return (
    <div className="resume-page bg-white text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="flex">
        <div className="w-1/3 bg-stone-800 text-white p-7 min-h-full">
          <div className="mb-6">
            <h1 className="text-2xl font-bold leading-tight mb-1">{personal.fullName || 'Your Name'}</h1>
            <p className="text-teal-300 text-sm">{personal.title || 'Job Title'}</p>
          </div>
          <div className="space-y-2 text-xs mb-6">
            {personal.email && <div className="flex items-start gap-2"><Mail className="w-3 h-3 mt-0.5 flex-shrink-0 text-teal-300" /><span className="break-all">{personal.email}</span></div>}
            {personal.phone && <div className="flex items-start gap-2"><Phone className="w-3 h-3 mt-0.5 flex-shrink-0 text-teal-300" /><span>{personal.phone}</span></div>}
            {personal.location && <div className="flex items-start gap-2"><MapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-teal-300" /><span>{personal.location}</span></div>}
            {personal.website && <div className="flex items-start gap-2"><Globe className="w-3 h-3 mt-0.5 flex-shrink-0 text-teal-300" /><span className="break-all">{personal.website}</span></div>}
          </div>
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-2.5 border-b border-stone-600 pb-1.5">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span key={s} className="text-xs bg-stone-700 px-2 py-0.5 rounded">{s}</span>
                ))}
              </div>
            </div>
          )}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-2.5 border-b border-stone-600 pb-1.5">Education</h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-sm font-semibold">{edu.degree || 'Degree'}</p>
                    <p className="text-xs text-stone-300">{edu.institution}</p>
                    <p className="text-xs text-stone-400">{formatDateRange(edu.startDate, edu.endDate)}</p>
                    {edu.grade && <p className="text-xs text-stone-300 mt-0.5">{edu.grade}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-2/3 p-7">
          {personal.summary && (
            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-800 mb-2 border-b-2 border-teal-500 pb-1">Summary</h2>
              <p className="text-xs leading-relaxed text-stone-600">{personal.summary}</p>
            </div>
          )}
          {experience.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-800 mb-3 border-b-2 border-teal-500 pb-1">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-bold text-stone-800">{exp.position || 'Position'}</p>
                      <p className="text-xs text-stone-500">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                    </div>
                    <p className="text-xs text-teal-600 font-semibold mb-1">{exp.company}</p>
                    <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {projects.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-800 mb-3 border-b-2 border-teal-500 pb-1">Projects</h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-bold text-stone-800">{proj.name || 'Project Name'}</p>
                      {proj.link && <p className="text-xs text-teal-600">{proj.link}</p>}
                    </div>
                    <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personal, experience, education, skills, projects } = data;
  return (
    <div className="resume-page bg-white text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="text-center border-b-2 border-stone-800 pb-4 mb-5">
        <h1 className="text-2xl font-bold tracking-wide uppercase mb-1">{personal.fullName || 'Your Name'}</h1>
        <p className="text-sm text-stone-600 mb-2">{personal.title || 'Job Title'}</p>
        <div className="flex justify-center flex-wrap gap-3 text-xs text-stone-600">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.website && <span>• {personal.website}</span>}
        </div>
      </div>
      {personal.summary && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-stone-300 pb-1">Summary</h2>
          <p className="text-xs leading-relaxed">{personal.summary}</p>
        </div>
      )}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-stone-300 pb-1">Experience</h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-bold">{exp.position || 'Position'}</p>
                  <p className="text-xs text-stone-500">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                </div>
                <p className="text-xs italic text-stone-600 mb-1">{exp.company}</p>
                <p className="text-xs leading-relaxed whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-stone-300 pb-1">Education</h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-bold">{edu.degree || 'Degree'}</p>
                  <p className="text-xs text-stone-600">{edu.institution}{edu.grade ? ` — ${edu.grade}` : ''}</p>
                </div>
                <p className="text-xs text-stone-500">{formatDateRange(edu.startDate, edu.endDate)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-stone-300 pb-1">Skills</h2>
          <p className="text-xs leading-relaxed">{skills.join(' • ')}</p>
        </div>
      )}
      {projects.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-stone-300 pb-1">Projects</h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <p className="text-sm font-bold">{proj.name}{proj.link && <span className="text-xs font-normal text-stone-500"> — {proj.link}</span>}</p>
                <p className="text-xs leading-relaxed whitespace-pre-line">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personal, experience, education, skills, projects } = data;
  return (
    <div className="resume-page bg-white text-stone-800" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="mb-6">
        <h1 className="text-3xl font-light tracking-tight mb-1">{personal.fullName || 'Your Name'}</h1>
        <p className="text-sm text-stone-500 mb-3">{personal.title || 'Job Title'}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-400">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>
      {personal.summary && (
        <div className="mb-5">
          <p className="text-sm leading-relaxed text-stone-600 italic">{personal.summary}</p>
        </div>
      )}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 mb-3">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <p className="text-xs text-stone-400">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  <p className="text-sm font-medium text-stone-700">{exp.company}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-semibold mb-1">{exp.position || 'Position'}</p>
                  <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 mb-3">Education</h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <p className="text-xs text-stone-400">{formatDateRange(edu.startDate, edu.endDate)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-semibold">{edu.degree || 'Degree'}</p>
                  <p className="text-xs text-stone-600">{edu.institution}{edu.grade ? ` — ${edu.grade}` : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="text-xs text-stone-600 border-b border-stone-300">{s}</span>
            ))}
          </div>
        </div>
      )}
      {projects.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 mb-3">Projects</h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <p className="text-sm font-semibold">{proj.name}{proj.link && <span className="text-xs font-normal text-stone-400"> — {proj.link}</span>}</p>
                <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CompactTemplate({ data }: { data: ResumeData }) {
  const { personal, experience, education, skills, projects } = data;
  return (
    <div className="resume-page bg-white text-stone-800" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="flex justify-between items-start mb-4 border-b-2 border-emerald-600 pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight">{personal.fullName || 'Your Name'}</h1>
          <p className="text-xs text-emerald-600 font-medium">{personal.title || 'Job Title'}</p>
        </div>
        <div className="text-right text-xs text-stone-500 space-y-0.5">
          {personal.email && <p>{personal.email}</p>}
          {personal.phone && <p>{personal.phone}</p>}
          {personal.location && <p>{personal.location}</p>}
          {personal.website && <p>{personal.website}</p>}
        </div>
      </div>
      {personal.summary && (
        <p className="text-xs leading-relaxed text-stone-600 mb-4">{personal.summary}</p>
      )}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          {experience.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">Experience</h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <p className="text-xs font-bold">{exp.position || 'Position'} <span className="font-normal text-stone-500">— {exp.company}</span></p>
                      <p className="text-xs text-stone-400">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                    </div>
                    <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line mt-0.5">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">Projects</h2>
              <div className="space-y-2">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <p className="text-xs font-bold">{proj.name}{proj.link && <span className="font-normal text-stone-500"> — {proj.link}</span>}</p>
                    <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="col-span-1">
          {education.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">Education</h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-xs font-bold">{edu.degree || 'Degree'}</p>
                    <p className="text-xs text-stone-500">{edu.institution}</p>
                    <p className="text-xs text-stone-400">{formatDateRange(edu.startDate, edu.endDate)}</p>
                    {edu.grade && <p className="text-xs text-stone-500">{edu.grade}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((s) => (
                  <span key={s} className="text-xs bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const { personal, experience, education, skills, projects } = data;
  return (
    <div className="resume-page bg-white text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="border-b-[3px] border-stone-900 pb-5 mb-5">
        <h1 className="text-3xl font-bold tracking-[0.15em] uppercase text-stone-900 mb-1">{personal.fullName || 'Your Name'}</h1>
        <div className="flex justify-between items-center">
          <p className="text-sm text-stone-600 italic">{personal.title || 'Job Title'}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-stone-500">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.website && <span>{personal.website}</span>}
          </div>
        </div>
      </div>
      {personal.summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-2">Executive Summary</h2>
          <p className="text-xs leading-relaxed text-stone-700">{personal.summary}</p>
        </div>
      )}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-3 border-b border-stone-300 pb-1">Professional Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="text-sm font-bold text-stone-900">{exp.position || 'Position'} <span className="font-normal text-stone-600">| {exp.company}</span></p>
                  <p className="text-xs text-stone-500 font-medium">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                </div>
                <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-2 border-b border-stone-300 pb-1">Education</h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-xs font-bold">{edu.degree || 'Degree'}</p>
                  <p className="text-xs text-stone-600">{edu.institution}</p>
                  <p className="text-xs text-stone-500">{formatDateRange(edu.startDate, edu.endDate)}{edu.grade ? ` | ${edu.grade}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-2 border-b border-stone-300 pb-1">Core Competencies</h2>
            <p className="text-xs leading-relaxed text-stone-600">{skills.join(' • ')}</p>
          </div>
        )}
      </div>
      {projects.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-2 border-b border-stone-300 pb-1">Key Projects</h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <p className="text-xs font-bold">{proj.name}{proj.link && <span className="font-normal text-stone-500"> — {proj.link}</span>}</p>
                <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personal, experience, education, skills, projects } = data;
  return (
    <div className="resume-page bg-white text-stone-800" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="bg-gradient-to-br from-rose-500 to-orange-500 p-7 text-white">
        <h1 className="text-3xl font-bold tracking-tight mb-1">{personal.fullName || 'Your Name'}</h1>
        <p className="text-base text-white/90 mb-3">{personal.title || 'Job Title'}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/80">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>
      <div className="p-7">
        {personal.summary && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-rose-600 mb-2 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-rose-500" />
              About Me
            </h2>
            <p className="text-xs leading-relaxed text-stone-600">{personal.summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-rose-600 mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-rose-500" />
              Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-rose-200 pl-3">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-stone-800">{exp.position || 'Position'}</p>
                    <p className="text-xs text-stone-400">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  </div>
                  <p className="text-xs text-rose-500 font-semibold mb-1">{exp.company}</p>
                  <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {projects.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-rose-600 mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-rose-500" />
              Projects
            </h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id} className="border-l-2 border-rose-200 pl-3">
                  <p className="text-sm font-bold">{proj.name}{proj.link && <span className="text-xs font-normal text-stone-500"> — {proj.link}</span>}</p>
                  <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-5">
          {education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-rose-600 mb-2 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-rose-500" />
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-xs font-bold">{edu.degree || 'Degree'}</p>
                    <p className="text-xs text-stone-600">{edu.institution}</p>
                    <p className="text-xs text-stone-400">{formatDateRange(edu.startDate, edu.endDate)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-rose-600 mb-2 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-rose-500" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span key={s} className="text-xs bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ElegantTemplate({ data }: { data: ResumeData }) {
  const { personal, experience, education, skills, projects } = data;
  return (
    <div className="resume-page bg-white text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="text-center py-6 border-b border-stone-300">
        <h1 className="text-2xl font-bold tracking-[0.3em] uppercase text-stone-900 mb-2">{personal.fullName || 'Your Name'}</h1>
        <div className="w-16 h-px bg-stone-400 mx-auto mb-2" />
        <p className="text-sm text-stone-600 italic mb-2">{personal.title || 'Job Title'}</p>
        <div className="flex justify-center flex-wrap gap-x-3 gap-y-0.5 text-xs text-stone-500">
          {personal.email && <span>{personal.email}</span>}
          {personal.email && personal.phone && <span className="text-stone-300">|</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span className="text-stone-300">|</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span className="text-stone-300">|</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>
      <div className="p-7">
        {personal.summary && (
          <div className="mb-5 text-center">
            <p className="text-xs leading-relaxed text-stone-600 italic max-w-md mx-auto">{personal.summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-3 text-center">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="text-center">
                  <p className="text-sm font-bold text-stone-800">{exp.position || 'Position'}</p>
                  <p className="text-xs text-stone-500 italic mb-1">{exp.company} | {formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line text-left max-w-lg mx-auto">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-3 text-center">Education</h2>
            <div className="space-y-2 text-center">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-sm font-bold">{edu.degree || 'Degree'}</p>
                  <p className="text-xs text-stone-500 italic">{edu.institution} | {formatDateRange(edu.startDate, edu.endDate)}{edu.grade ? ` | ${edu.grade}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {skills.length > 0 && (
          <div className="mb-5 text-center">
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-2">Skills</h2>
            <p className="text-xs leading-relaxed text-stone-600">{skills.join(' · ')}</p>
          </div>
        )}
        {projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-stone-900 mb-3 text-center">Projects</h2>
            <div className="space-y-2 text-center">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p className="text-sm font-bold">{proj.name}{proj.link && <span className="text-xs font-normal text-stone-500"> — {proj.link}</span>}</p>
                  <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TechnicalTemplate({ data }: { data: ResumeData }) {
  const { personal, experience, education, skills, projects } = data;
  return (
    <div className="resume-page bg-white text-stone-800" style={{ fontFamily: "Courier New, monospace" }}>
      <div className="bg-stone-900 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-white mb-1">{personal.fullName || 'Your Name'}</h1>
            <p className="text-sm text-teal-400 font-mono">{personal.title || 'Job Title'}</p>
          </div>
          <div className="text-right text-xs text-stone-400 space-y-0.5">
            {personal.email && <p>{personal.email}</p>}
            {personal.phone && <p>{personal.phone}</p>}
            {personal.location && <p>{personal.location}</p>}
            {personal.website && <p className="text-teal-400">{personal.website}</p>}
          </div>
        </div>
      </div>
      <div className="p-6">
        {personal.summary && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-stone-900 mb-2 font-mono">// Summary</h2>
            <p className="text-xs leading-relaxed text-stone-600 pl-3 border-l-2 border-stone-200">{personal.summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-stone-900 mb-3 font-mono">// Experience</h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="pl-3 border-l-2 border-stone-200">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-stone-900">{exp.position || 'Position'}</p>
                    <p className="text-xs text-stone-400 font-mono">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                  </div>
                  <p className="text-xs text-teal-600 font-mono mb-1">@ {exp.company}</p>
                  <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {projects.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-stone-900 mb-3 font-mono">// Projects</h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id} className="pl-3 border-l-2 border-stone-200">
                  <p className="text-sm font-bold text-stone-900">{proj.name}</p>
                  {proj.link && <p className="text-xs text-teal-600 font-mono mb-0.5">{proj.link}</p>}
                  <p className="text-xs leading-relaxed text-stone-600 whitespace-pre-line">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {skills.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-stone-900 mb-2 font-mono">// Tech Stack</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s} className="text-xs bg-stone-100 text-stone-700 px-2 py-1 rounded font-mono border border-stone-200">{s}</span>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-stone-900 mb-2 font-mono">// Education</h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="pl-3 border-l-2 border-stone-200">
                  <p className="text-sm font-bold">{edu.degree || 'Degree'}</p>
                  <p className="text-xs text-stone-500">{edu.institution} | {formatDateRange(edu.startDate, edu.endDate)}{edu.grade ? ` | ${edu.grade}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const templates: Record<TemplateId, React.FC<{ data: ResumeData }>> = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
    compact: CompactTemplate,
    executive: ExecutiveTemplate,
    creative: CreativeTemplate,
    elegant: ElegantTemplate,
    technical: TechnicalTemplate,
  };
  const Template = templates[template] || ModernTemplate;
  return <Template data={data} />;
}
