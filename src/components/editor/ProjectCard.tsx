import { createProject, type Resume } from "../../resume/resumeData";
import EmptyDiv from "./EmptyDiv";
import EntryCard from "./EntryCard";
import { TextArea, TextField } from "./Fields";
import { SectionCard } from "./SectionCard";

interface ProjectCardProps {
  project: Resume["project"];
  onChange: (value: Resume[keyof Resume]) => void;
}

function ProjectCard({ project, onChange }: ProjectCardProps) {
  const update = (id: string, field: string, value: string) =>
    onChange(
      project.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

  const add = () => {
    onChange([...project, createProject()]);
  };

  const remove = (id: string) =>
    onChange(project.filter((item) => item.id !== id));

  return (
    <SectionCard
      id={"project"}
      idx={"05"}
      title="Project"
      actionBtn={
        <button type="button" className="btn add-btn" onClick={add}>
          Add Project
        </button>
      }
    >
      <div className="entry-list field-wide">
        {project.length === 0 && <EmptyDiv text="No project added yet" />}

        {project.map((card, idx) => (
          <EntryCard
            key={card.id}
            title={card.name || `Project ${idx + 1}`}
            subtitle={card.link}
            removeFnc={() => remove(card.id)}
          >
            <TextField
              label="Project Name"
              value={card.name}
              placeHolder="Budget Buddy"
              fnc={(value) => {
                update(card.id, "name", value);
              }}
            />
            <TextField
              label="Project Link"
              value={card.link}
              placeHolder="budget-buddy-swart-phi.vercel.app/"
              fnc={(value) => {
                update(card.id, "link", value);
              }}
            />
            <TextArea
              label="Description"
              value={card.description}
              className="field-wide"
              placeHolder="Developed a React Based Expense Tracker...."
              fnc={(value) => {
                update(card.id, "description", value);
              }}
            />
          </EntryCard>
        ))}
      </div>
    </SectionCard>
  );
}

export default ProjectCard;
