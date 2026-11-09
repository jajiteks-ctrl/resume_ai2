
import React from "react";
import { Briefcase } from "lucide-react";

function JobDescription({ jobDescription, setJobDescription }) {
  return (
    <div className="job-description">

      <div className="job-title">
        <Briefcase size={22} />
        <h2>Job Description</h2>
      </div>

      <p>
        Paste the job description to compare it with your resume.
      </p>

      <textarea
        placeholder="Paste your job description here...

Example:
We are looking for a React Developer with experience in JavaScript, HTML, CSS, REST APIs and MongoDB..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={9}
      />

      <span>
        {jobDescription.trim().split(/\s+/).filter(Boolean).length} words
      </span>

    </div>
  );
}

export default JobDescription;
