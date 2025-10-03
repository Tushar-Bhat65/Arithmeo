export const getCounts = (text, includeSpaces = true) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const characters = includeSpaces ? text.length : text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;
  const readingTime = Math.ceil(words / 200); // assuming 200 wpm

  return { words, characters, sentences, readingTime };
};
