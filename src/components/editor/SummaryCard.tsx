import type { Resume } from "../../resume/resumeData";
import { TextArea } from "./Fields";
import { SectionCard } from "./SectionCard";

interface SummaryCardProps {
  summary: Resume["summary"];
  onChange: (value: Resume[keyof Resume]) => void;
}

function SummaryCard({ summary, onChange }: SummaryCardProps) {
  return (
    <SectionCard id={"summary"} idx={"02"} title="Summary">
      <TextArea
        label={"Professional Summary"}
        value={summary}
        placeHolder={
          "Frontend Developer Skilled in Building React Based Components, web applications..."
        }
        className="field-wide"
        fnc={(value) => onChange(value)}
      />
    </SectionCard>
  );
}

export default SummaryCard;
