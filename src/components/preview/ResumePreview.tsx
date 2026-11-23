import { useEffect, useRef, useState } from "react";
import type { PreviewLayoutProp } from "./PreviewLayout";

const PAPER_WIDTH = 794;

function ResumePreview({ resume }: PreviewLayoutProp) {
  const { contact, summary, experience, education, project, skills } = resume;

  const containerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [paperHeight, setPaperHeight] = useState(1123);

  useEffect(() => {
    const container = containerRef.current;
    const paper = paperRef.current;

    if (!container || !paper) return;

    const updateScale = () => {
      const availableWidth = container.clientWidth;

      const newScale = Math.min(1, availableWidth / PAPER_WIDTH);

      setScale(newScale);
      setPaperHeight(paper.offsetHeight * newScale);
    };

    const observer = new ResizeObserver(updateScale);

    observer.observe(container);
    observer.observe(paper);

    updateScale();

    return () => observer.disconnect();
  }, []);

  const validExperience = experience.filter((item) =>
    Object.values(item)
      .filter((value) => typeof value === "string")
      .some((value) => value.trim() !== ""),
  );

  const validEducation = education.filter((item) =>
    Object.values(item)
      .filter((value) => typeof value === "string")
      .some((value) => value.trim() !== ""),
  );

  const validProjects = project.filter((item) =>
    Object.values(item)
      .filter((value) => typeof value === "string")
      .some((value) => value.trim() !== ""),
  );

  return (
    <div className="paper-container" ref={containerRef}>
      <div className="paper-scaler" style={{ height: `${paperHeight}px` }}>
        <div
          className="paper"
          ref={paperRef}
          style={{
            transform: `scale(${scale})`,
          }}
          role="document"
        >
          <div className="paper-content">
            <header className="paper-header">
              <h1>{contact.fullName || "Your Name"}</h1>
              {contact.professionalTitle && (
                <p className="paper-title">{contact.professionalTitle}</p>
              )}
              <div className="contact-info">
                {contact.email.trim() && <span>{contact.email}</span>}
                {contact.phone.trim() && <span>{contact.phone}</span>}
                {contact.location.trim() && <span>{contact.location}</span>}
                {contact.website.trim() && (
                  <a href={contact.website} target="_blank" rel="noreferrer">
                    {contact.website}
                  </a>
                )}
                {contact.linkedIn.trim() && (
                  <a href={contact.linkedIn} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                )}
              </div>
            </header>

            {summary.trim() && (
              <section className="resume-section">
                <h2>Summary</h2>
                <p className="summary-text">{summary}</p>
              </section>
            )}

            {validExperience.length > 0 && (
              <section className="resume-section">
                <h2>Experience</h2>

                {validExperience.map((item) => (
                  <article className="resume-entry" key={item.id}>
                    <div className="entry-heading">
                      <h3>{item.role}</h3>
                      {(item.start || item.end) && (
                        <span className="entry-date">
                          {item.start}
                          {item.start && item.end && " – "}
                          {item.end}
                        </span>
                      )}
                    </div>

                    {(item.company || item.location) && (
                      <p className="entry-subtitle">
                        {[item.company, item.location]
                          .filter((value) => value.trim())
                          .join(" · ")}
                      </p>
                    )}

                    {item.highlight.trim() && (
                      <ul className="entry-details">
                        {item.highlight
                          .split("\n")
                          .filter((line) => line.trim())
                          .map((line, index) => (
                            <li key={index}>{line}</li>
                          ))}
                      </ul>
                    )}
                  </article>
                ))}
              </section>
            )}

            {validEducation.length > 0 && (
              <section className="resume-section">
                <h2>Education</h2>

                {validEducation.map((item) => (
                  <article className="resume-entry" key={item.id}>
                    <div className="entry-heading">
                      <h3>{item.degree}</h3>
                      {(item.start || item.end) && (
                        <span className="entry-date">
                          {item.start}
                          {item.start && item.end && " – "}
                          {item.end}
                        </span>
                      )}
                    </div>

                    {(item.school || item.location) && (
                      <p className="entry-subtitle">
                        {[item.school, item.location]
                          .filter((value) => value.trim())
                          .join(" · ")}
                      </p>
                    )}

                    {item.details.trim() && (
                      <p className="entry-description">{item.details}</p>
                    )}
                  </article>
                ))}
              </section>
            )}

            {validProjects.length > 0 && (
              <section className="resume-section projects">
                <h2>Projects</h2>

                {validProjects.map((item) => (
                  <article className="resume-entry" key={item.id}>
                    <div className="entry-heading">
                      <h3>{item.name}</h3>

                      {item.link.trim() && (
                        <a
                          className="project-link"
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.link}
                        </a>
                      )}
                    </div>

                    {item.description.trim() && (
                      <p className="entry-description">{item.description}</p>
                    )}
                  </article>
                ))}
              </section>
            )}

            {skills.trim() && (
              <section className="resume-section">
                <h2>Skills</h2>
                <p className="skills-text">{skills}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
