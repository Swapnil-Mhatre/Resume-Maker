import { pdf } from "@react-pdf/renderer";
import type { Resume } from "./resumeData";
import ResumeDocument from "./ResumeDocument";

export async function downloadResumePdf(resume: Resume) {
  const blob = await pdf(<ResumeDocument resume={resume} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${resume?.contact?.fullName.replace(" ", "-") || "resume"}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
