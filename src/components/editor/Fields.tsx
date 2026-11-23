import { useId } from "react";

export interface FieldProps {
  label: string;
  fieldType?: string;
  value: string;
  className?: string;
  placeHolder?: string;
  rows?: number;
  fnc?: (value: string) => void;
}

export function TextField({
  label,
  fieldType = "text",
  value,
  placeHolder,
  className = "",
  fnc,
}: FieldProps) {
  const id = useId();

  return (
    <div className={`field ${className}`}>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="field-input"
        name={id}
        type={fieldType}
        id={id}
        placeholder={placeHolder}
        value={value}
        onChange={(event) => fnc?.(event.target.value)}
      />
    </div>
  );
}

export function TextArea({
  label,
  value,
  placeHolder,
  className = "",
  rows = 4,
  fnc,
}: FieldProps) {
  const id = useId();
  return (
    <div className={`field ${className}`}>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <textarea
        className="field-textarea"
        name={id}
        id={id}
        placeholder={placeHolder}
        value={value}
        onChange={(event) => fnc?.(event.target.value)}
        rows={rows}
      />
    </div>
  );
}
