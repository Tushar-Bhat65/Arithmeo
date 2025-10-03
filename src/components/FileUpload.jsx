import React from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const FileUpload = ({ setText }) => {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    let text = "";

    try {
      if (fileName.endsWith(".txt")) {
        text = await file.text();
      } else if (fileName.endsWith(".pdf")) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item) => item.str);
          text += strings.join(" ") + "\n";
        }
      } else if (fileName.endsWith(".docx")) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else {
        alert("Unsupported file type");
        return;
      }

      setText(text);
    } catch (err) {
      console.error("Error reading file:", err);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        onChange={handleFile}
        accept=".txt,.pdf,.docx"
        className="text-white"
      />
    </div>
  );
};

export default FileUpload;
