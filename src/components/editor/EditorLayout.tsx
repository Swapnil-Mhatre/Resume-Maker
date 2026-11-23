import type { Dispatch, SetStateAction } from "react";
import type { Resume } from "../../resume/resumeData.ts";
import ContactCard from "./ContactCard";
import SummaryCard from "./SummaryCard.tsx";
import ExperienceCard from "./ExperienceCard.tsx";
import EducationCard from "./EducationCard.tsx";
import ProjectCard from "./ProjectCard.tsx";
import SkillCard from "./SkillCard.tsx";

interface EditorLayoutProps {
  resume: Resume;
  setResume: Dispatch<SetStateAction<Resume>>;
}

function EditorLayout({ resume, setResume }: EditorLayoutProps) {
  function updateSection(section: keyof Resume, value: Resume[keyof Resume]) {
    setResume((current) => ({
      ...current,
      [section]: value,
    }));
  }

  return (
    <div className="editor">
      <ContactCard
        contact={resume.contact}
        onChange={(value) => updateSection("contact", value)}
      />
      <SummaryCard
        summary={resume.summary}
        onChange={(value) => updateSection("summary", value)}
      />
      <ExperienceCard
        experience={resume.experience}
        onChange={(value) => updateSection("experience", value)}
      />
      <EducationCard
        education={resume.education}
        onChange={(value) => updateSection("education", value)}
      />
      <ProjectCard
        project={resume.project}
        onChange={(value) => updateSection("project", value)}
      />
      <SkillCard
        skill={resume.skills}
        onChange={(value) => updateSection("skills", value)}
      />
    </div>
  );
}

export default EditorLayout;
