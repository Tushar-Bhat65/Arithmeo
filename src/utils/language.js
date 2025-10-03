import { franc } from "franc";

// Map ISO codes to language names
const isoLangs = {
  eng: "English",
  spa: "Spanish",
  fra: "French",
  deu: "German",
  ita: "Italian",
  por: "Portuguese",
  rus: "Russian",
  jpn: "Japanese",
  // add more if needed
};

export function detectLanguage(text) {
  if (!text || text.trim() === "") return "Unknown";

  const langCode = franc(text, { minLength: 10 }); // minimum chars to detect
  return isoLangs[langCode] || "Unknown";
}
