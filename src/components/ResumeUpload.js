
import React, { useState } from "react";
import { FileUp, FileText, X, CheckCircle } from "lucide-react";

import { extractPDFText } from "../utils/pdfParser";
import { extractDOCXText } from "../utils/docxParser";

function ResumeUpload({ onTextExtracted }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resumeText, setResumeText] = useState("");

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    setError("");
    setResumeText("");

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF or DOCX file.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
    setLoading(true);

    try {
      let text = "";

      if (selectedFile.type === "application/pdf") {
        text = await extractPDFText(selectedFile);
      } else {
        text = await extractDOCXText(selectedFile);
      }

      if (!text.trim()) {
        throw new Error(
          "No text found. Please upload a text-based resume."
        );
      }

      setResumeText(text);

      if (onTextExtracted) {
        onTextExtracted(text, selectedFile);
      }

    } catch (err) {
      setError(err.message || "Unable to read the resume.");
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setResumeText("");
    setError("");
    onTextExtracted("", null);
  };

  return (
    <div className="resume-upload">

      <label className="upload-dropzone">

        <FileUp size={40} />

        <h3>Upload Your Resume</h3>

        <p>Drag and drop or click to upload</p>

        <span>PDF or DOCX • Maximum 5 MB</span>

        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          hidden
        />

      </label>

      {loading && (
        <p className="upload-loading">
          Extracting resume text...
        </p>
      )}

      {error && (
        <p className="upload-error">{error}</p>
      )}

      {file && !loading && resumeText && (
        <div className="uploaded-file">

          <FileText size={25} />

          <div className="file-details">
            <strong>{file.name}</strong>
            <span>
              <CheckCircle size={14} /> Successfully uploaded
            </span>
          </div>

          <button onClick={removeFile} className="remove-btn">
            <X size={20} />
          </button>

        </div>
      )}

      {resumeText && (
        <div className="extracted-text">
          <h3>Extracted Resume Text</h3>
          <textarea
            value={resumeText}
            readOnly
            rows={10}
          />
        </div>
      )}

    </div>
  );
}

export default ResumeUpload;
