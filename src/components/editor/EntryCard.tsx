import type { ReactNode } from "react";

interface EntryCardProps {
  title: string;
  subtitle: string;
  removeFnc: () => void;
  children?: ReactNode;
}

function EntryCard({ title, subtitle, removeFnc, children }: EntryCardProps) {
  return (
    <div className="entry-card">
      <header className="entry-card-header">
        <div className="header-heading">
          <h3 className="section-title">{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <button type="button" className="btn rm-btn" onClick={removeFnc}>
          Remove
        </button>
      </header>
      <div className="entry-card-body field-grid">{children}</div>
    </div>
  );
}

export default EntryCard;
