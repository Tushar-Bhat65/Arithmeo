import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import TextArea from "./components/TextArea";
import FileUpload from "./components/FileUpload";
import CountsDisplay from "./components/CountsDisplay";
import KeywordStats from "./components/KeywordStats";
import LanguageCard from "./components/LanguageCard";
import WordCloudView from "./components/WordCloudView";
import FloatingBackground from "./components/FloatingBackground"; // NEW

function App() {
  const [text, setText] = useState("");
  const [analyzeText, setAnalyzeText] = useState("");
  const [splashDone, setSplashDone] = useState(false);

  const handleAnalyze = () => setAnalyzeText(text);

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden">
      {/* Ambient Floating Background */}
      <FloatingBackground />

      {/* Splash overlay */}
      {!splashDone && (
        <div className="absolute inset-0 z-50">
          <SplashScreen onFinish={() => setSplashDone(true)} />
        </div>
      )}

      {/* Main App */}
      <div
        className={`relative min-h-screen w-full text-white p-4 flex flex-col items-center transition-opacity duration-700 ${
          splashDone ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Logo */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-center">
          Arithmeo
        </h1>

        {/* Layout */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
          {/* Left panel */}
          <div className="flex-1 flex flex-col gap-4 w-full">
            <div className="card w-full">
              <TextArea text={text} setText={setText} />
            </div>

            <div className="card w-full">
              <FileUpload setText={setText} />
            </div>

            <div className="flex justify-center md:justify-start mt-2">
              <button
                onClick={handleAnalyze}
                className="px-6 py-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg w-full md:w-auto"
              >
                Analyse
              </button>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex-1 flex flex-col gap-4 w-full mt-6 md:mt-0">
            <div className="card w-full">
              <CountsDisplay text={analyzeText} />
            </div>

            <div className="card w-full">
              <LanguageCard text={analyzeText} />
            </div>

            <div className="card w-full">
              <KeywordStats text={analyzeText} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
