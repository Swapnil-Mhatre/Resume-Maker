import { SectionCard } from "./SectionCard";
import { TextField } from "./Fields";
import type { Resume } from "../../resume/resumeData.ts";

interface ContactCardProps {
  contact: Resume["contact"];
  onChange: (value: Resume[keyof Resume]) => void;
}

export interface InputProps {
  key: keyof Resume["contact"];
  label: string;
  placeholder: string;
  className?: string;
}

const contactField: InputProps[] = [
  { key: "fullName", label: "Full Name", placeholder: "e.g. Swapnil Mhatre" },
  {
    key: "professionalTitle",
    label: "Professional Title",
    placeholder: "e.g. Frontend Developer",
  },
  {
    key: "email",
    label: "Email ",
    placeholder: "e.g. swapnilmhatre@gmail.com",
  },
  {
    key: "phone",
    label: "Phone Number",
    placeholder: "e.g. +91 99000 31000",
  },
  { key: "location", label: "Location", placeholder: "e.g. City, Country" },
  { key: "website", label: "Website", placeholder: "websitename.com" },
  {
    key: "linkedIn",
    label: "LinkedIn",
    placeholder: "linkedin.com/yourname",
    className: "field-wide",
  },
];

function ContactCard({ contact, onChange }: ContactCardProps) {
  const update = (key: keyof Resume["contact"], value: string) =>
    onChange({ ...contact, [key]: value });

  return (
    <SectionCard id={"personal"} idx={"01"} title="Contact">
      {contactField.map((field) => {
        return (
          <TextField
            label={field.label}
            value={contact[field.key]}
            key={field.key}
            fnc={(value) => update(field.key, value)}
            placeHolder={field.placeholder}
            className={field.className}
          />
        );
      })}
    </SectionCard>
  );
}

export default ContactCard;
