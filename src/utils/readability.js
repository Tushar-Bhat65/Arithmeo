export const getReadability = (text) => {
  const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
  const words = text.trim().split(/\s+/).filter(Boolean).length || 1;
  const characters = text.replace(/\s/g, "").length;

  const syllableCount = (word) => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    const vowels = word.match(/[aeiouy]{1,2}/g);
    return vowels ? vowels.length : 1;
  };

  const syllables = text
    .split(/\s+/)
    .filter(Boolean)
    .reduce((acc, w) => acc + syllableCount(w), 0);

  const wordsPerSentence = words / sentences;
  const syllablesPerWord = syllables / words;

  // Flesch Reading Ease
  const fleschReadingEase = 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord;

  // Flesch-Kincaid Grade Level
  const fleschKincaid = 0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59;

  // Gunning Fog Index
  const complexWords = text
    .split(/\s+/)
    .filter((w) => syllableCount(w) >= 3).length;
  const gunningFog = 0.4 * (wordsPerSentence + (100 * complexWords) / words);

  // Coleman-Liau Index
  const letters = characters;
  const L = (letters / words) * 100;
  const S = (sentences / words) * 100;
  const colemanLiau = 0.0588 * L - 0.296 * S - 15.8;

  return {
    fleschReadingEase: fleschReadingEase.toFixed(2),
    fleschKincaid: fleschKincaid.toFixed(2),
    gunningFog: gunningFog.toFixed(2),
    colemanLiau: colemanLiau.toFixed(2),
  };
};
