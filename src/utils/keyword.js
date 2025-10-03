// src/utils/keywords.js

// Common stopwords we don't want to count as keywords
const stopwords = new Set([
  "the", "is", "in", "and", "to", "a", "of", "it", "for", "on",
  "with", "as", "this", "that", "by", "an", "be", "are", "at",
  "from", "or", "not", "your", "you", "we", "our"
]);

// Extract keywords from given text
// src/utils/keyword.js
export function getKeywords(text) {
  if (!text) return {};

  // Convert to lowercase, remove punctuation except letters and numbers
  const cleanedText = text.toLowerCase().replace(/[^a-z0-9\s]/g, "");

  const words = cleanedText.split(/\s+/);
  const counts = {};

  for (const word of words) {
    if (!word) continue;          // skip empty strings
    counts[word] = (counts[word] || 0) + 1;
  }

  return counts;
}

// Transform for Word Cloud
export function getWordCloudData(keywordObj) {
  if (!keywordObj || Object.keys(keywordObj).length === 0) return [];

  // Convert to array of {text, value}, filter only alphabetic words
  return Object.entries(keywordObj)
    .filter(([word]) => /^[a-zA-Z]+$/.test(word))  // remove numbers/special chars
    .map(([word, value]) => ({ text: word, value }));
}
