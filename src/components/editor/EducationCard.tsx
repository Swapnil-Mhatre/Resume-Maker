import { createEducation, type Resume } from "../../resume/resumeData";
import EmptyDiv from "./EmptyDiv";
import EntryCard from "./EntryCard";
import { TextArea, TextField } from "./Fields";
import { SectionCard } from "./SectionCard";

interface EducationCardProps {
  education: Resume["education"];
  onChange: (value: Resume[keyof Resume]) => void;
}

function EducationCard({ education, onChange }: EducationCardProps) {
  const update = (id: string, field: string, value: string) =>
    onChange(
      education.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

  const add = () => {
    onChange([...education, createEducation()]);
  };

  const remove = (id: string) =>
    onChange(education.filter((item) => item.id !== id));

  return (
    <SectionCard
      id={"education"}
      idx={"04"}
      title="Education"
      actionBtn={
        <button type="button" className="btn add-btn" onClick={add}>
          Add education
        </button>
      }
    >
      <div className="entry-list field-wide">
        {education.length === 0 && <EmptyDiv text="No Experience added yet" />}

        {education.map((card, idx) => (
          <EntryCard
            key={card.id}
            title={card.degree || `Education ${idx + 1}`}
            subtitle={[card.school, card.location].filter(Boolean).join(" , ")}
            removeFnc={() => remove(card.id)}
          >
            <TextField
              label="Degree or Program"
              value={card.degree}
              placeHolder="B.Tech in Computer Science"
              fnc={(value) => {
                update(card.id, "degree", value);
              }}
            />
            <TextField
              label="School"
              value={card.school}
              placeHolder="IIT Bombay"
              fnc={(value) => {
                update(card.id, "school", value);
              }}
            />
            <TextField
              label="Location"
              value={card.location}
              placeHolder="Mumbai, Maharashtra"
              className="field-wide"
              fnc={(value) => {
                update(card.id, "location", value);
              }}
            />
            <TextField
              label="Start Date"
              value={card.start}
              placeHolder="2021"
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
              value={card.details}
              className="field-wide"
              placeHolder="C.G.P.A: 9 / 10,Participated in extra curricular activities..."
              fnc={(value) => {
                update(card.id, "details", value);
              }}
            />
          </EntryCard>
        ))}
      </div>
    </SectionCard>
  );
}

export default EducationCard;
