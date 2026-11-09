
import React from "react";
import {
  CheckCircle,
  XCircle,
  Target,
  FileText
} from "lucide-react";

function ATSScore({ result }) {

  if (!result) return null;

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Needs Improvement";
  };

  return (
    <div className="ats-results">

      <h2>Resume Analysis Results</h2>

      <div className="score-card">

        <Target size={30} />

        <div className="score-circle">
          <h1>{result.score}</h1>
          <span>/100</span>
        </div>

        <h3>{getScoreLabel(result.score)}</h3>

        <p>Overall ATS Compatibility Score</p>

      </div>

      <div className="analysis-grid">

        <div className="analysis-card">
          <h3>Keyword Score</h3>
          <h2>{result.keywordScore}/35</h2>
        </div>

        <div className="analysis-card">
          <h3>Sections Score</h3>
          <h2>{result.sectionScore}/15</h2>
        </div>

        <div className="analysis-card">
          <h3>Contact Score</h3>
          <h2>{result.contactScore}/10</h2>
        </div>

        <div className="analysis-card">
          <h3>Length Score</h3>
          <h2>{result.lengthScore}/10</h2>
        </div>

        <div className="analysis-card">
          <h3>Action Verbs</h3>
          <h2>{result.actionScore}/10</h2>
        </div>

      </div>

      <div className="keyword-section">

        <h3>
          <CheckCircle color="green" />
          Matched Keywords ({result.matchedKeywords.length})
        </h3>

        <div className="keyword-list">
          {result.matchedKeywords.length > 0 ? (
            result.matchedKeywords.map((word, index) => (
              <span className="matched" key={index}>
                {word}
              </span>
            ))
          ) : (
            <p>No matching keywords found.</p>
          )}
        </div>

      </div>

      <div className="keyword-section">

        <h3>
          <XCircle color="red" />
          Missing Keywords ({result.missingKeywords.length})
        </h3>

        <div className="keyword-list">
          {result.missingKeywords.length > 0 ? (
            result.missingKeywords.map((word, index) => (
              <span className="missing" key={index}>
                {word}
              </span>
            ))
          ) : (
            <p>No missing keywords found.</p>
          )}
        </div>

      </div>

      <div className="keyword-section">
        <h3>
          <FileText />
          Resume Sections
        </h3>

        <p>Found: {result.foundSections.join(", ") || "None"}</p>

        <p>Missing: {result.missingSections.join(", ") || "None"}</p>
      </div>

    </div>
  );
}

export default ATSScore;
