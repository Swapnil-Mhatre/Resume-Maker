import type { Resume } from "../../resume/resumeData";
import ResumePreview from "./ResumePreview";

export interface PreviewLayoutProp {
  resume: Resume;
}

function PreviewLayout({ resume }: PreviewLayoutProp) {
  return (
    <div className="preview">
      <div className="preview-heading">
        <h4 className="preview-title">Live Preview</h4>
        <span className="preview-bagde">ATS-READY</span>
      </div>
      <ResumePreview resume={resume} />
    </div>
  );
}

export default PreviewLayout;
