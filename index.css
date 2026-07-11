import type { ResumeData, Experience, Education, Project } from '../types/resume';

function uid() {
  return Math.random().toString(36).substring(2, 11);
}

export function parseResumeText(text: string): ResumeData {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const data: ResumeData = {
    personal: {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
  };

  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  if (emailMatch) data.personal.email = emailMatch[0];

  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{3,5}[-.\s]?\d{0,5}/);
  if (phoneMatch) data.personal.phone = phoneMatch[0].trim();

  const urlMatch = text.match(/(https?:\/\/)?(www\.)?[\w-]+\.(com|in|io|org|net|dev)(\/\S*)?/i);
  if (urlMatch) data.personal.website = urlMatch[0];

  data.personal.fullName = lines[0] || '';

  if (lines[1]) {
    const titleLine = lines[1];
    if (!titleLine.match(/@|\d{3,}/)) {
      data.personal.title = titleLine;
    }
  }

  const lowerText = text.toLowerCase();

  const summaryIdx = lowerText.search(/summary|objective|profile|about/i);
  if (summaryIdx >= 0) {
    const afterSummary = text.substring(summaryIdx).split('\n').slice(1, 5).join(' ').trim();
    if (afterSummary) data.personal.summary = afterSummary.substring(0, 300);
  }

  const skillsSection = text.match(/skills?\s*:?\s*([\s\S]*?)(?=\n\s*\n|experience|education|project|$)/i);
  if (skillsSection) {
    const skillsText = skillsSection[1];
    const skills = skillsText
      .split(/[,\n•·|]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 1 && s.length < 40 && !s.match(/^\d/));
    data.skills = [...new Set(skills)].slice(0, 20);
  }

  const expSection = text.match(/experience\s*:?\s*([\s\S]*?)(?=\n\s*(?:education|skills|projects?)\b|$)/i);
  if (expSection) {
    const expText = expSection[1];
    const expBlocks = expText.split(/\n\s*\n/).filter((b) => b.trim());
    for (const block of expBlocks.slice(0, 5)) {
      const blockLines = block.split('\n').map((l) => l.trim()).filter(Boolean);
      if (blockLines.length < 1) continue;
      const firstLine = blockLines[0];
      const atCompany = firstLine.match(/at\s+(.+)|,\s*(.+)/i);
      const dateMatch = block.match(/((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{4})\s*[-–—to]+\s*(?:present|current|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{4}))/i);

      const exp: Experience = {
        id: uid(),
        company: atCompany ? (atCompany[1] || atCompany[2] || '').trim() : '',
        position: firstLine.split(/\s+at\s+|,\s*/i)[0].trim() || firstLine,
        startDate: dateMatch ? dateMatch[1].split(/[-–—to]+/i)[0].trim() : '',
        endDate: dateMatch ? dateMatch[1].split(/[-–—to]+/i)[1].trim() : '',
        current: dateMatch ? /present|current/i.test(dateMatch[1]) : false,
        description: blockLines.slice(1).join('\n'),
      };
      data.experience.push(exp);
    }
  }

  const eduSection = text.match(/education\s*:?\s*([\s\S]*?)(?=\n\s*(?:experience|skills|projects?)\b|$)/i);
  if (eduSection) {
    const eduText = eduSection[1];
    const eduBlocks = eduText.split(/\n\s*\n/).filter((b) => b.trim());
    for (const block of eduBlocks.slice(0, 4)) {
      const blockLines = block.split('\n').map((l) => l.trim()).filter(Boolean);
      if (blockLines.length < 1) continue;
      const dateMatch = block.match(/(\d{4})\s*[-–—to]+\s*(\d{4}|present)/i);
      const edu: Education = {
        id: uid(),
        degree: blockLines[0],
        institution: blockLines[1] || '',
        startDate: dateMatch ? dateMatch[1] : '',
        endDate: dateMatch ? dateMatch[2] : '',
        grade: '',
        description: blockLines.slice(2).join('\n'),
      };
      data.education.push(edu);
    }
  }

  const projSection = text.match(/projects?\s*:?\s*([\s\S]*?)(?=\n\s*(?:experience|education|skills)\b|$)/i);
  if (projSection) {
    const projText = projSection[1];
    const projBlocks = projText.split(/\n\s*\n/).filter((b) => b.trim());
    for (const block of projBlocks.slice(0, 5)) {
      const blockLines = block.split('\n').map((l) => l.trim()).filter(Boolean);
      if (blockLines.length < 1) continue;
      const linkMatch = block.match(/(https?:\/\/|github\.com|linkedin\.com)\S+/i);
      const proj: Project = {
        id: uid(),
        name: blockLines[0],
        link: linkMatch ? linkMatch[0] : '',
        description: blockLines.slice(1).join('\n'),
      };
      data.projects.push(proj);
    }
  }

  return data;
}

export function parseResumeJSON(json: string): ResumeData {
  const parsed = JSON.parse(json);
  const normalize = (arr: any[], factory: (item: any) => any) =>
    Array.isArray(arr) ? arr.map(factory) : [];

  return {
    personal: {
      fullName: parsed.personal?.fullName || parsed.name || parsed.fullName || '',
      title: parsed.personal?.title || parsed.title || '',
      email: parsed.personal?.email || parsed.email || '',
      phone: parsed.personal?.phone || parsed.phone || '',
      location: parsed.personal?.location || parsed.location || '',
      website: parsed.personal?.website || parsed.website || parsed.url || '',
      summary: parsed.personal?.summary || parsed.summary || parsed.objective || '',
    },
    experience: normalize(parsed.experience || parsed.work, (e: any) => ({
      id: uid(),
      company: e.company || e.organization || '',
      position: e.position || e.role || e.title || '',
      startDate: e.startDate || e.start || '',
      endDate: e.endDate || e.end || '',
      current: e.current || false,
      description: e.description || e.summary || '',
    })),
    education: normalize(parsed.education, (e: any) => ({
      id: uid(),
      institution: e.institution || e.school || '',
      degree: e.degree || e.qualification || '',
      startDate: e.startDate || e.start || '',
      endDate: e.endDate || e.end || '',
      grade: e.grade || e.gpa || e.score || '',
      description: e.description || '',
    })),
    skills: Array.isArray(parsed.skills) ? parsed.skills : [],
    projects: normalize(parsed.projects, (p: any) => ({
      id: uid(),
      name: p.name || p.title || '',
      link: p.link || p.url || '',
      description: p.description || p.summary || '',
    })),
  };
}
