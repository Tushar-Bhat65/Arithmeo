import React from "react";
import * as franc from "franc";
import { iso6393 } from "iso-639-3"; // named import

const LanguageCard = ({ text }) => {
  if (!text) return null;

  const langCode = franc.franc(text); // ISO 639-3 code
  const langEntry = iso6393.find(l => l.iso6393 === langCode);
  const langName = langEntry ? langEntry.name : "Unknown";

  return (
    <div className="mb-4 p-4 border rounded bg-gray-800 text-white">
      <h2 className="font-bold mb-2 text-xl">Language Detection</h2>
      <p>Detected Language: {langName} ({langCode})</p>
    </div>
  );
};

export default LanguageCard;
