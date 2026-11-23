import { useState } from "react";
import EditorLayout from "./components/editor/EditorLayout";
import PreviewLayout from "./components/preview/PreviewLayout";
import { initialResume, type Resume } from "./resume/resumeData.ts";
// import { AlexResume } from "./resume/AlexMorgan.ts";

function App() {
  const [resume, setResume] = useState<Resume>(initialResume);
  const [view, setView] = useState("editor");

  const handleDownload = async () => {
    try {
      const { downloadResumePdf } = await import("./resume/downloadResume.tsx");
      await downloadResumePdf(resume);
    } catch (error) {
      console.log("Error Generating PDF", error);
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h2 className="title">CV Application</h2>
        <button onClick={handleDownload} className="btn download-btn">
          Download PDF
        </button>
      </header>
      <main className="layout">
        <div className="view-tabs">
          <button
            type="button"
            onClick={() => setView("editor")}
            className={`btn tabs-btn ${view === "editor" ? "is-active" : ""}`}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => setView("preview")}
            className={`btn tabs-btn ${view === "preview" ? "is-active" : ""}`}
          >
            Preview
          </button>
        </div>
        <div
          className={`editor-panel ${view === "preview" ? "is-hidden-mobile" : ""}`}
        >
          <EditorLayout resume={resume} setResume={setResume} />
        </div>
        <div
          className={`preview-panel ${view === "editor" ? "is-hidden-mobile" : ""}`}
        >
          <PreviewLayout resume={resume} />
        </div>
      </main>
    </div>
  );
}

export default App;
