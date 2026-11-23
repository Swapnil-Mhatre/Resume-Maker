import type { Resume } from "../../resume/resumeData";
import { TextArea } from "./Fields";
import { SectionCard } from "./SectionCard";

interface SkillCardProps {
  skill: Resume["skills"];
  onChange: (value: Resume[keyof Resume]) => void;
}

function SkillCard({ skill, onChange }: SkillCardProps) {
  return (
    <SectionCard id={"skills"} idx={"06"} title="Skills">
      <TextArea
        label={"Skills"}
        value={skill}
        placeHolder={
          "HTML, CSS, JavaScript, React, Redux, Git, Github, TypeScript"
        }
        className="field-wide"
        fnc={(value) => onChange(value)}
      />
    </SectionCard>
  );
}

export default SkillCard;
