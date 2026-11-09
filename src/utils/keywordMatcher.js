
const skillKeywords = [
  "javascript",
  "react",
  "node.js",
  "python",
  "java",
  "html",
  "css",
  "sql",
  "mongodb",
  "express",
  "typescript",
  "angular",
  "vue",
  "aws",
  "azure",
  "docker",
  "kubernetes",
  "git",
  "github",
  "rest api",
  "machine learning",
  "data analysis",
  "communication",
  "leadership",
  "problem solving",
  "teamwork",
  "project management"
];

export const matchKeywords = (resumeText, jobDescription) => {
  const resume = resumeText.toLowerCase();
  const job = jobDescription.toLowerCase();

  const jobKeywords = skillKeywords.filter(skill =>
    job.includes(skill)
  );

  const matchedKeywords = jobKeywords.filter(skill =>
    resume.includes(skill)
  );

  const missingKeywords = jobKeywords.filter(skill =>
    !resume.includes(skill)
  );

  return {
    jobKeywords,
    matchedKeywords,
    missingKeywords
  };
};
