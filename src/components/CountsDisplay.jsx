import React, { useState } from "react";
import { getCounts } from "../utils/counts";
import { getReadability } from "../utils/readability";

// Helper functions for interpretations
const interpretFlesch = (score) => {
  if (score >= 90) return "Very easy to read";
  if (score >= 80) return "Easy to read";
  if (score >= 70) return "Fairly easy to read";
  if (score >= 60) return "Plain English, moderately easy";
  if (score >= 50) return "Fairly difficult";
  if (score >= 30) return "Difficult to read";
  return "Very difficult";
};

const interpretFKGrade = (grade) => {
  if (grade < 6) return "Elementary school level";
  if (grade < 9) return "Middle school level";
  if (grade < 12) return "High school level";
  if (grade < 16) return "College level";
  return "Advanced / Professional level";
};

const CountsDisplay = ({ text }) => {
  const [withSpaces, setWithSpaces] = useState(true);

  const counts = getCounts(text, withSpaces);
  const readability = getReadability(text);

  return (
    <div className="mb-4 p-4 border rounded bg-gray-800 text-white">
      <h2 className="font-bold mb-2 text-xl">Text Counts & Readability</h2>

      {/* Tick button for characters */}
      <div className="mb-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={withSpaces}
            onChange={() => setWithSpaces(!withSpaces)}
            className="accent-blue-500"
          />
          <span>Count characters with spaces</span>
        </label>
      </div>

      <p>Words: {counts.words}</p>
      <p>Characters: {counts.characters}</p>
      <p>Sentences: {counts.sentences}</p>
      <p>Estimated Reading Time: {counts.readingTime} min</p>

      {/* Readability scores */}
      <h3 className="font-semibold mt-4 mb-1">Readability Scores:</h3>
      <p>
        Flesch Reading Ease: {readability.fleschReadingEase} —{" "}
        {interpretFlesch(readability.fleschReadingEase)}
      </p>
      <p>
        Flesch-Kincaid Grade Level: {readability.fleschKincaid} —{" "}
        {interpretFKGrade(readability.fleschKincaid)}
      </p>
    </div>
  );
};

export default CountsDisplay;
