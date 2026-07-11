import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, User, Briefcase, GraduationCap, Wrench, FolderGit2 } from 'lucide-react';
import type { ResumeData, Experience, Education, Project } from '../types/resume';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

function uid() {
  return Math.random().toString(36).substring(2, 11);
}

function SectionHeader({ icon: Icon, title, count }: { icon: typeof User; title: string; count?: number }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
        <Icon className="w-4 h-4 text-teal-600" strokeWidth={2} />
      </div>
      <h3 className="text-base font-bold text-stone-900">{title}</h3>
      {count !== undefined && (
        <span className="text-xs text-stone-400 font-medium">({count})</span>
      )}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all';

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
  });

  const toggle = (key: string) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  const updatePersonal = (field: string, value: string) =>
    onChange({ ...data, personal: { ...data.personal, [field]: value } });

  const addExperience = () => {
    const newExp: Experience = {
      id: uid(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExperience = (id: string, field: string, value: string | boolean) =>
    onChange({
      ...data,
      experience: data.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });

  const removeExperience = (id: string) =>
    onChange({ ...data, experience: data.experience.filter((e) => e.id !== id) });

  const moveExperience = (id: string, dir: -1 | 1) => {
    const idx = data.experience.findIndex((e) => e.id === id);
    if (idx < 0) return;
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= data.experience.length) return;
    const arr = [...data.experience];
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
    onChange({ ...data, experience: arr });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: uid(),
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      grade: '',
      description: '',
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: string, value: string) =>
    onChange({
      ...data,
      education: data.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });

  const removeEducation = (id: string) =>
    onChange({ ...data, education: data.education.filter((e) => e.id !== id) });

  const addProject = () => {
    const newProj: Project = {
      id: uid(),
      name: '',
      link: '',
      description: '',
    };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const updateProject = (id: string, field: string, value: string) =>
    onChange({
      ...data,
      projects: data.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });

  const removeProject = (id: string) =>
    onChange({ ...data, projects: data.projects.filter((p) => p.id !== id) });

  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !data.skills.includes(trimmed)) {
      onChange({ ...data, skills: [...data.skills, trimmed] });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) =>
    onChange({ ...data, skills: data.skills.filter((s) => s !== skill) });

  return (
    <div className="space-y-4">
      {/* Personal Info */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <button
          onClick={() => toggle('personal')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors"
        >
          <SectionHeader icon={User} title="Personal Information" />
          {openSections.personal ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
        </button>
        {openSections.personal && (
          <div className="px-5 pb-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Full Name">
                <input
                  className={inputClass}
                  value={data.personal.fullName}
                  onChange={(e) => updatePersonal('fullName', e.target.value)}
                  placeholder="Aarav Sharma"
                />
              </Field>
              <Field label="Job Title">
                <input
                  className={inputClass}
                  value={data.personal.title}
                  onChange={(e) => updatePersonal('title', e.target.value)}
                  placeholder="Software Engineer"
                />
              </Field>
              <Field label="Email">
                <input
                  className={inputClass}
                  value={data.personal.email}
                  onChange={(e) => updatePersonal('email', e.target.value)}
                  placeholder="aarav@example.com"
                />
              </Field>
              <Field label="Phone">
                <input
                  className={inputClass}
                  value={data.personal.phone}
                  onChange={(e) => updatePersonal('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </Field>
              <Field label="Location">
                <input
                  className={inputClass}
                  value={data.personal.location}
                  onChange={(e) => updatePersonal('location', e.target.value)}
                  placeholder="Mumbai, India"
                />
              </Field>
              <Field label="Website / LinkedIn">
                <input
                  className={inputClass}
                  value={data.personal.website}
                  onChange={(e) => updatePersonal('website', e.target.value)}
                  placeholder="linkedin.com/in/aarav"
                />
              </Field>
            </div>
            <Field label="Professional Summary">
              <textarea
                className={inputClass + ' min-h-[80px] resize-y'}
                value={data.personal.summary}
                onChange={(e) => updatePersonal('summary', e.target.value)}
                placeholder="A brief 2-3 line summary of your professional background and key strengths..."
              />
            </Field>
          </div>
        )}
      </div>

      {/* Experience */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <button
          onClick={() => toggle('experience')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors"
        >
          <SectionHeader icon={Briefcase} title="Work Experience" count={data.experience.length} />
          {openSections.experience ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
        </button>
        {openSections.experience && (
          <div className="px-5 pb-5 space-y-3">
            {data.experience.map((exp, idx) => (
              <div key={exp.id} className="border border-stone-200 rounded-lg p-4 space-y-3 bg-stone-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-400">EXPERIENCE {idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveExperience(exp.id, -1)}
                      disabled={idx === 0}
                      className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveExperience(exp.id, 1)}
                      disabled={idx === data.experience.length - 1}
                      className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Company">
                    <input
                      className={inputClass}
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="TCS"
                    />
                  </Field>
                  <Field label="Position">
                    <input
                      className={inputClass}
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      placeholder="Senior Developer"
                    />
                  </Field>
                  <Field label="Start Date">
                    <input
                      className={inputClass}
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="Jan 2022"
                    />
                  </Field>
                  <Field label="End Date">
                    <input
                      className={inputClass}
                      value={exp.current ? 'Present' : exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="Dec 2023"
                      disabled={exp.current}
                    />
                  </Field>
                </div>
                <label className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="w-4 h-4 rounded border-stone-300 text-teal-600 focus:ring-teal-500/20"
                  />
                  I currently work here
                </label>
                <Field label="Description">
                  <textarea
                    className={inputClass + ' min-h-[70px] resize-y'}
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    placeholder="• Led development of...&#10;• Improved performance by 40%..."
                  />
                </Field>
              </div>
            ))}
            <button
              onClick={addExperience}
              className="w-full py-2.5 border-2 border-dashed border-stone-200 rounded-lg text-sm font-semibold text-stone-500 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/30 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <button
          onClick={() => toggle('education')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors"
        >
          <SectionHeader icon={GraduationCap} title="Education" count={data.education.length} />
          {openSections.education ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
        </button>
        {openSections.education && (
          <div className="px-5 pb-5 space-y-3">
            {data.education.map((edu, idx) => (
              <div key={edu.id} className="border border-stone-200 rounded-lg p-4 space-y-3 bg-stone-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-400">EDUCATION {idx + 1}</span>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Institution">
                    <input
                      className={inputClass}
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="IIT Bombay"
                    />
                  </Field>
                  <Field label="Degree">
                    <input
                      className={inputClass}
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="B.Tech in Computer Science"
                    />
                  </Field>
                  <Field label="Start Date">
                    <input
                      className={inputClass}
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      placeholder="2018"
                    />
                  </Field>
                  <Field label="End Date">
                    <input
                      className={inputClass}
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      placeholder="2022"
                    />
                  </Field>
                  <Field label="Grade / CGPA">
                    <input
                      className={inputClass}
                      value={edu.grade}
                      onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                      placeholder="8.7 CGPA"
                    />
                  </Field>
                </div>
                <Field label="Description (optional)">
                  <textarea
                    className={inputClass + ' min-h-[60px] resize-y'}
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                    placeholder="Relevant coursework, honors, activities..."
                  />
                </Field>
              </div>
            ))}
            <button
              onClick={addEducation}
              className="w-full py-2.5 border-2 border-dashed border-stone-200 rounded-lg text-sm font-semibold text-stone-500 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/30 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </button>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <button
          onClick={() => toggle('skills')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors"
        >
          <SectionHeader icon={Wrench} title="Skills" count={data.skills.length} />
          {openSections.skills ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
        </button>
        {openSections.skills && (
          <div className="px-5 pb-5 space-y-3">
            <div className="flex gap-2">
              <input
                className={inputClass}
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Type a skill and press Enter"
              />
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            {data.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 text-sm font-medium rounded-lg border border-teal-100"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-teal-400 hover:text-teal-700 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <button
          onClick={() => toggle('projects')}
          className="w-full px-5 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors"
        >
          <SectionHeader icon={FolderGit2} title="Projects" count={data.projects.length} />
          {openSections.projects ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
        </button>
        {openSections.projects && (
          <div className="px-5 pb-5 space-y-3">
            {data.projects.map((proj, idx) => (
              <div key={proj.id} className="border border-stone-200 rounded-lg p-4 space-y-3 bg-stone-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-400">PROJECT {idx + 1}</span>
                  <button
                    onClick={() => removeProject(proj.id)}
                    className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Project Name">
                    <input
                      className={inputClass}
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                      placeholder="E-commerce Platform"
                    />
                  </Field>
                  <Field label="Link (optional)">
                    <input
                      className={inputClass}
                      value={proj.link}
                      onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                      placeholder="github.com/aarav/ecom"
                    />
                  </Field>
                </div>
                <Field label="Description">
                  <textarea
                    className={inputClass + ' min-h-[60px] resize-y'}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    placeholder="Built a full-stack e-commerce platform with..."
                  />
                </Field>
              </div>
            ))}
            <button
              onClick={addProject}
              className="w-full py-2.5 border-2 border-dashed border-stone-200 rounded-lg text-sm font-semibold text-stone-500 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50/30 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
