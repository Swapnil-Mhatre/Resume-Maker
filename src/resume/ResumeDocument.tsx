import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";

import type { Resume } from "./resumeData";

interface ResumeDocumentProps {
  resume: Resume;
}

const colors = {
  heading: "#202c3d",
  paragraph: "#263244",
  subtitle: "#64748b",
  border: "#dce3e9",
  skyblue: "#00ADB5",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 38,
    paddingHorizontal: 42,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: colors.paragraph,
    lineHeight: 1.45,
  },

  // Header
  header: {
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.skyblue,
    marginBottom: 10,
  },

  name: {
    fontSize: 25,
    fontFamily: "Helvetica-Bold",
    color: colors.heading,
    lineHeight: 1.2,
  },

  title: {
    marginTop: 3,
    marginBottom: 6,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: colors.skyblue,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },

  contactText: {
    fontSize: 8,
    color: colors.subtitle,
    marginRight: 7,
    marginBottom: 2,
  },

  contactLink: {
    fontSize: 8,
    color: colors.skyblue,
    marginRight: 7,
    marginBottom: 2,
    textDecoration: "none",
  },

  // Sections
  section: {
    marginTop: 9,
  },

  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: colors.skyblue,
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingBottom: 4,
    marginBottom: 7,
    borderBottomWidth: 0.6,
    borderBottomColor: colors.border,
  },

  sectionText: {
    fontSize: 10,
    color: colors.paragraph,
    lineHeight: 1.5,
  },

  // Entries
  entry: {
    marginBottom: 8,
  },

  entryHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  entryTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: colors.heading,
    flexGrow: 1,
  },

  entryDate: {
    fontSize: 8,
    color: colors.subtitle,
    marginLeft: 8,
  },

  entrySubtitle: {
    fontSize: 10,
    color: colors.subtitle,
    marginTop: 1,
    marginBottom: 2,
  },

  entryDescription: {
    fontSize: 10,
    color: colors.paragraph,
    lineHeight: 1.5,
    marginTop: 2,
  },

  // Experience highlights
  bulletList: {
    marginTop: 2,
  },

  bulletRow: {
    flexDirection: "row",
    marginBottom: 2,
  },

  bullet: {
    width: 9,
    fontSize: 10,
    color: colors.skyblue,
  },

  bulletText: {
    flex: 1,
    fontSize: 10,
    color: colors.paragraph,
    lineHeight: 1.4,
  },

  projectLink: {
    fontSize: 8,
    color: colors.skyblue,
    textDecoration: "none",
    marginLeft: 8,
  },
});

function ResumeDocument({ resume }: ResumeDocumentProps) {
  const { contact, summary, experience, education, project, skills } = resume;

  const hasContact = Object.values(contact).some(
    (value) => value.trim() !== "",
  );

  const validExperience = experience.filter((item) =>
    [
      item.role,
      item.company,
      item.location,
      item.start,
      item.end,
      item.highlight,
    ].some((value) => value.trim() !== ""),
  );

  const validEducation = education.filter((item) =>
    [
      item.degree,
      item.school,
      item.location,
      item.start,
      item.end,
      item.details,
    ].some((value) => value.trim() !== ""),
  );

  const validProjects = project.filter((item) =>
    [item.name, item.link, item.description].some(
      (value) => value.trim() !== "",
    ),
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        {hasContact && (
          <View style={styles.header}>
            {contact.fullName.trim() && (
              <Text style={styles.name}>{contact.fullName}</Text>
            )}

            {contact.professionalTitle.trim() && (
              <Text style={styles.title}>{contact.professionalTitle}</Text>
            )}

            <View style={styles.contactInfo}>
              {contact.email.trim() !== "" && (
                <Text style={styles.contactText}>{contact.email}</Text>
              )}

              {contact.phone.trim() !== "" && (
                <Text style={styles.contactText}>{contact.phone}</Text>
              )}

              {contact.location.trim() !== "" && (
                <Text style={styles.contactText}>{contact.location}</Text>
              )}

              {contact.website.trim() !== "" && (
                <Link src={contact.website} style={styles.contactLink}>
                  {contact.website}
                </Link>
              )}

              {contact.linkedIn.trim() !== "" && (
                <Link src={contact.linkedIn} style={styles.contactLink}>
                  LinkedIn
                </Link>
              )}
            </View>
          </View>
        )}

        {/* Summary */}
        {summary.trim() !== "" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.sectionText}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {validExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>

            {validExperience.map((item) => (
              <View key={item.id} style={styles.entry} wrap={false}>
                <View style={styles.entryHeading}>
                  {item.role.trim() !== "" && (
                    <Text style={styles.entryTitle}>{item.role}</Text>
                  )}

                  {(item.start || item.end) && (
                    <Text style={styles.entryDate}>
                      {item.start}
                      {item.start && item.end ? " – " : ""}
                      {item.end}
                    </Text>
                  )}
                </View>

                {(item.company || item.location) && (
                  <Text style={styles.entrySubtitle}>
                    {[item.company, item.location]
                      .filter((value) => value.trim() !== "")
                      .join(" · ")}
                  </Text>
                )}

                {item.highlight.trim() !== "" && (
                  <View style={styles.bulletList}>
                    {item.highlight
                      .split("\n")
                      .filter((line) => line.trim() !== "")
                      .map((line, index) => (
                        <View key={index} style={styles.bulletRow}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.bulletText}>{line}</Text>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {validEducation.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>

            {validEducation.map((item) => (
              <View key={item.id} style={styles.entry} wrap={false}>
                <View style={styles.entryHeading}>
                  {item.degree.trim() !== "" && (
                    <Text style={styles.entryTitle}>{item.degree}</Text>
                  )}

                  {(item.start || item.end) && (
                    <Text style={styles.entryDate}>
                      {item.start}
                      {item.start && item.end ? " – " : ""}
                      {item.end}
                    </Text>
                  )}
                </View>

                {(item.school || item.location) && (
                  <Text style={styles.entrySubtitle}>
                    {[item.school, item.location]
                      .filter((value) => value.trim() !== "")
                      .join(" · ")}
                  </Text>
                )}

                {item.details.trim() !== "" && (
                  <Text style={styles.entryDescription}>{item.details}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {validProjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>

            {validProjects.map((item) => (
              <View key={item.id} style={styles.entry} wrap={false}>
                <View style={styles.entryHeading}>
                  {item.name.trim() !== "" && (
                    <Text style={styles.entryTitle}>{item.name}</Text>
                  )}

                  {item.link.trim() !== "" && (
                    <Link src={item.link} style={styles.projectLink}>
                      {item.link}
                    </Link>
                  )}
                </View>

                {item.description.trim() !== "" && (
                  <Text style={styles.entryDescription}>
                    {item.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.trim() !== "" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.sectionText}>{skills}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}

export default ResumeDocument;
