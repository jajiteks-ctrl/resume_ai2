
import React, { useState } from "react";
import Suggestions from "./Suggestions";

import {
  Target,
  Briefcase,
  TrendingUp
} from "lucide-react";

import ResumeUpload from "./ResumeUpload";
import JobDescription from "./JobDescription";
import ATSScore from "./ATSScore";

import { analyzeResume } from "../utils/atsAnalyzer";

function Dashboard() {

  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {

    if (!resumeText.trim()) {
      alert("Please upload your resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    const analysis = analyzeResume(
      resumeText,
      jobDescription
    );

    setResult(analysis);
  };

  const handleResumeExtracted = (text) => {
    setResumeText(text);
    setResult(null);
  };

  return (
    <div className="dashboard">

      <div className="welcome-section">
        <h1>AI Resume Analyzer</h1>

        <p>
          Analyze your resume and improve your ATS compatibility.
        </p>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Resume Upload</h3>
          <p>Upload PDF or DOCX resume</p>
        </div>

        <div className="stat-card">
          <Target />
          <h3>ATS Score</h3>
          <p>Check compatibility</p>
        </div>

        <div className="stat-card">
          <Briefcase />
          <h3>Job Matching</h3>
          <p>Compare job requirements</p>
        </div>

        <div className="stat-card">
          <TrendingUp />
          <h3>Improvements</h3>
          <p>Find missing keywords</p>
        </div>

      </div>

      <div className="upload-section">

        <ResumeUpload
          onTextExtracted={handleResumeExtracted}
        />

      </div>

      {resumeText && (
        <>
          <JobDescription
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
          />

          <button
            className="analyze-btn"
            onClick={handleAnalyze}
          >
            Analyze My Resume
          </button>
        </>
      )}

      {result && (
  <>
    <ATSScore result={result} />

    <Suggestions result={result} />
  </>
)}

    </div>
  );
}

export default Dashboard;
