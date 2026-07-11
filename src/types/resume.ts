export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  grade: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  link: string;
  description: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
}

export type TemplateId =
  | 'modern'
  | 'classic'
  | 'minimal'
  | 'compact'
  | 'executive'
  | 'creative'
  | 'elegant'
  | 'technical';

export interface Resume {
  id: string;
  data: ResumeData;
  template: TemplateId;
  is_paid: boolean;
  payment_ref: string | null;
  created_at: string;
  updated_at: string;
}

export const emptyResume: ResumeData = {
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
