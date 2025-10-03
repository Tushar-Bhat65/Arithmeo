import React, { useMemo } from "react";
import WordCloudView from "./WordCloudView";

// Function to extract keywords from text
export function getKeywords(text) {
  if (!text) return {};

  const words = text
    .toLowerCase()
    .match(/\b[a-zA-Z]{2,}\b/g); // only alphabetic words, at least 2 chars

  if (!words) return {};

  const keywordCount = {};
  for (let word of words) {
    if (word.length > 2) keywordCount[word] = (keywordCount[word] || 0) + 1;
  }

  return keywordCount;
}

const KeywordStats = ({ text }) => {
  const keywordObj = useMemo(() => getKeywords(text), [text]);

  // Convert to array and sort by count
  const topKeywords = useMemo(() => {
    return Object.entries(keywordObj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50); // Top 50 keywords for cloud
  }, [keywordObj]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Top Keywords</h2>
      {topKeywords.length === 0 ? (
        <p style={{ color: "gray", fontStyle: "italic" }}>No keywords found.</p>
      ) : (
        <ul className="mb-4">
          {topKeywords.slice(0, 10).map(([word, count]) => (
            <li key={word}>
              {word}: {count} times
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-xl font-bold mb-2">Keyword Word Cloud</h2>
      <WordCloudView wordsArray={topKeywords.map(([word, count]) => ({ text: word, value: count }))} />
    </div>
  );
};

export default KeywordStats;
