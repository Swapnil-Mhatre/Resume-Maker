import type { ReactNode } from "react";

interface SectionCardProps {
  id: string;
  idx: string;
  title: string;
  actionBtn?: ReactNode;
  children?: ReactNode;
}

export function SectionCard({
  id,
  idx,
  title,
  actionBtn,
  children,
}: SectionCardProps) {
  return (
    <section className="section-card" id={id}>
      <header className="section-header">
        <div className="header-heading">
          <span className="card-idx">{idx}</span>
          <h3 className="section-title">{title}</h3>
        </div>
        {actionBtn && <div className="header-action">{actionBtn}</div>}
      </header>
      <fieldset className="field-grid">{children}</fieldset>
    </section>
  );
}
