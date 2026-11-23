export interface Resume {
  contact: {
    fullName: string;
    professionalTitle: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedIn: string;
  };
  summary: string;
  experience: {
    id: string;
    role: string;
    company: string;
    location: string;
    start: string;
    end: string;
    highlight: string;
  }[];
  education: {
    id: string;
    degree: string;
    school: string;
    location: string;
    start: string;
    end: string;
    details: string;
  }[];
  project: {
    id: string;
    name: string;
    link: string;
    description: string;
  }[];
  skills: string;
}

export const initialResume: Resume = {
  contact: {
    fullName: "",
    professionalTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedIn: "",
  },
  summary: "",
  experience: [],
  education: [],
  project: [],
  skills: "",
};

export function createExperience() {
  return {
    id: crypto.randomUUID(),
    role: "",
    company: "",
    location: "",
    start: "",
    end: "",
    highlight: "",
  };
}

export function createEducation() {
  return {
    id: crypto.randomUUID(),
    degree: "",
    school: "",
    location: "",
    start: "",
    end: "",
    details: "",
  };
}

export function createProject() {
  return {
    id: crypto.randomUUID(),
    name: "",
    link: "",
    description: "",
  };
}
