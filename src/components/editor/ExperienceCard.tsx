import { createExperience, type Resume } from "../../resume/resumeData";
import EmptyDiv from "./EmptyDiv";
import EntryCard from "./EntryCard";
import { TextArea, TextField } from "./Fields";
import { SectionCard } from "./SectionCard";

interface ExperienceCardProps {
  experience: Resume["experience"];
  onChange: (value: Resume[keyof Resume]) => void;
}

function ExperienceCard({ experience, onChange }: ExperienceCardProps) {
  const update = (id: string, field: string, value: string) =>
    onChange(
      experience.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

  const add = () => {
    onChange([...experience, createExperience()]);
  };

  const remove = (id: string) =>
    onChange(experience.filter((item) => item.id !== id));

  return (
    <SectionCard
      id={"experience"}
      idx={"03"}
      title="Experience"
      actionBtn={
        <button type="button" className="btn add-btn" onClick={add}>
          Add role
        </button>
      }
    >
      <div className="entry-list field-wide">
        {experience.length === 0 && <EmptyDiv text="No Experience added yet" />}

        {experience.map((card, idx) => (
          <EntryCard
            key={card.id}
            title={card.role || `Role ${idx + 1}`}
            subtitle={[card.company, card.location].filter(Boolean).join(" , ")}
            removeFnc={() => remove(card.id)}
          >
            <TextField
              label="Job Title"
              value={card.role}
              placeHolder="Frontend Web Developer"
              fnc={(value) => {
                update(card.id, "role", value);
              }}
            />
            <TextField
              label="Company"
              value={card.company}
              placeHolder="Solution Ltd"
              fnc={(value) => {
                update(card.id, "company", value);
              }}
            />
            <TextField
              label="Location"
              value={card.location}
              placeHolder="Navi Mumbai, Maharashtra"
              className="field-wide"
              fnc={(value) => {
                update(card.id, "location", value);
              }}
            />
            <TextField
              label="Start Date"
              value={card.start}
              placeHolder="Jan 2026"
              fnc={(value) => {
                update(card.id, "start", value);
              }}
            />
            <TextField
              label="End Date"
              value={card.end}
              placeHolder="Till Now"
              fnc={(value) => {
                update(card.id, "end", value);
              }}
            />
            <TextArea
              label="Highlights"
              value={card.highlight}
              className="field-wide"
              placeHolder="Improvised a Feature for effeciency..."
              fnc={(value) => {
                update(card.id, "highlight", value);
              }}
            />
          </EntryCard>
        ))}
      </div>
    </SectionCard>
  );
}

export default ExperienceCard;
