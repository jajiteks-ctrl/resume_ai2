
import React from "react";
import {
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

function Suggestions({ result }) {

  if (!result) return null;

  const suggestions = [];

  // Missing keywords
  if (result.missingKeywords.length > 0) {
    suggestions.push({
      type: "warning",
      title: "Add Missing Keywords",
      description:
        `Your resume is missing these job-related keywords: ${result.missingKeywords.join(", ")}. Add them naturally where they reflect your actual skills and experience.`,
      icon: <AlertTriangle />
    });
  }

  // Missing sections
  if (result.missingSections.length > 0) {
    suggestions.push({
      type: "warning",
      title: "Improve Resume Sections",
      description:
        `Consider adding these sections: ${result.missingSections.join(", ")}.`,
      icon: <AlertTriangle />
    });
  }

  // Contact information
  if (!result.emailFound) {
    suggestions.push({
      type: "warning",
      title: "Add Email Address",
      description:
        "Include a professional email address in your resume.",
      icon: <AlertTriangle />
    });
  }

  if (!result.phoneFound) {
    suggestions.push({
      type: "warning",
      title: "Add Phone Number",
      description:
        "Include a valid contact number so recruiters can reach you.",
      icon: <AlertTriangle />
    });
  }

  // Resume length
  if (result.wordCount < 300) {
    suggestions.push({
      type: "info",
      title: "Add More Details",
      description:
        "Your resume is relatively short. Consider adding relevant projects, achievements, skills, and experience.",
      icon: <Lightbulb />
    });
  }

  if (result.wordCount > 1000) {
    suggestions.push({
      type: "info",
      title: "Reduce Resume Length",
      description:
        "Your resume is lengthy. Remove repetitive or irrelevant information and focus on relevant achievements.",
      icon: <Lightbulb />
    });
  }

  // Action verbs
  if (result.actionVerbCount < 3) {
    suggestions.push({
      type: "info",
      title: "Use Strong Action Verbs",
      description:
        "Use words like Developed, Implemented, Designed, Optimized, and Managed to describe your accomplishments.",
      icon: <TrendingUp />
    });
  }

  // Keyword matching
  if (result.score >= 80) {
    suggestions.push({
      type: "success",
      title: "Strong Resume Match",
      description:
        "Your resume has a strong keyword match with this job description. Continue tailoring it to the specific role.",
      icon: <CheckCircle />
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      type: "success",
      title: "Looking Good!",
      description:
        "No major issues were detected by this basic analyzer. Review your resume for accuracy and relevance.",
      icon: <CheckCircle />
    });
  }

  return (
    <div className="suggestions-container">

      <div className="suggestions-heading">
        <Lightbulb size={26} />
        <div>
          <h2>Resume Improvement Suggestions</h2>
          <p>
            Recommendations to improve your resume
            for the selected job.
          </p>
        </div>
      </div>

      <div className="suggestions-list">

        {suggestions.map((suggestion, index) => (

          <div
            className={`suggestion-card ${suggestion.type}`}
            key={index}
          >

            <div className="suggestion-icon">
              {suggestion.icon}
            </div>

            <div className="suggestion-content">
              <h3>{suggestion.title}</h3>
              <p>{suggestion.description}</p>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Suggestions;
