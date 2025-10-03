import React from "react";

const TextArea = ({ text, setText }) => {
  return (
    <div className="mb-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-32 p-2 border rounded bg-gray-800 text-white placeholder-gray-400"
        placeholder="Paste your text here..."
      ></textarea>
    </div>
  );
};

export default TextArea;
