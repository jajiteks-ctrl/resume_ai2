
import { matchKeywords } from "./keywordMatcher";

export const analyzeResume = (resumeText, jobDescription) => {

  if (!resumeText.trim() || !jobDescription.trim()) {
    return null;
  }

  const resume = resumeText.toLowerCase();

  // Keyword analysis
  const keywordResults = matchKeywords(
    resumeText,
    jobDescription
  );

  const totalKeywords = keywordResults.jobKeywords.length;

  const matchedCount = keywordResults.matchedKeywords.length;

  const keywordScore = totalKeywords > 0
    ? (matchedCount / totalKeywords) * 35
    : 0;

  // Resume sections
  const sections = [
    "education",
    "experience",
    "skills",
    "projects"
  ];

  const foundSections = sections.filter(section =>
    resume.includes(section)
  );

  const sectionScore =
    (foundSections.length / sections.length) * 15;

  // Contact information
  const emailFound =
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resume);

  const phoneFound =
    /(\+?\d[\d\s()-]{8,}\d)/.test(resume);

  const contactScore =
    (emailFound ? 5 : 0) +
    (phoneFound ? 5 : 0);

  // Resume length
  const wordCount = resumeText.trim().split(/\s+/).length;

  let lengthScore = 0;

  if (wordCount >= 300 && wordCount <= 1000) {
    lengthScore = 10;
  } else if (wordCount >= 150 && wordCount < 300) {
    lengthScore = 6;
  } else if (wordCount > 1000 && wordCount <= 1500) {
    lengthScore = 7;
  } else {
    lengthScore = 3;
  }

  // Action verbs
  const actionVerbs = [
    "developed",
    "created",
    "managed",
    "designed",
    "implemented",
    "improved",
    "built",
    "led",
    "analyzed",
    "optimized"
  ];

  const actionVerbCount = actionVerbs.filter(verb =>
    resume.includes(verb)
  ).length;

  const actionScore = Math.min(actionVerbCount, 5) * 2;

  // Final ATS score
  const totalScore = Math.round(
    keywordScore +
    sectionScore +
    contactScore +
    lengthScore +
    actionScore
  );

  return {
    score: Math.min(totalScore, 100),

    keywordScore: Math.round(keywordScore),
    sectionScore: Math.round(sectionScore),
    contactScore,
    lengthScore,
    actionScore,

    totalKeywords,
    matchedCount,

    matchedKeywords: keywordResults.matchedKeywords,
    missingKeywords: keywordResults.missingKeywords,

    foundSections,
    missingSections: sections.filter(section =>
      !foundSections.includes(section)
    ),

    emailFound,
    phoneFound,
    wordCount,
    actionVerbCount
  };
};
