import { useEffect, useState } from "react";
import ScrambledText from "./ScrambledText";
import FallingText from "./FallingText";
import "./SplashScreen.css";

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => handleFinish(), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleFinish = () => {
    setFadeOut(true);
    setTimeout(() => onFinish(), 700);
  };

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Enter" || e.type === "click") handleFinish();
    };
    window.addEventListener("keydown", listener);
    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("keydown", listener);
      window.removeEventListener("click", listener);
    };
  }, []);

  return (
    <div className={`splash-container ${fadeOut ? "fade-out" : ""}`}>
      {/* Falling words in background */}
      <FallingText
  text={`Arithmeo Writing Literature Counting Numbers Text Analysis Data Script Essay Novel Poem Story Grammar Syntax Paragraph Letters Words Tokens Algorithm Logic Coding Notes Journal Draft Manuscript Plot Character Dialogue Verse Prose`}
  highlightWords={["Arithmeo", "Writing", "Literature", "Counting", "Data", "Text"]}
  highlightClass="highlighted"
  trigger="auto"
  backgroundColor="transparent"
  gravity={0.1}
  fontSize="1.2rem"
/>


      {/* Centered logo */}
      <div className="splash-logo">
        <ScrambledText duration={1.5} speed={0.5} scrambleChars=".:">
          Arithmeo
        </ScrambledText>
      </div>
    </div>
  );
};

export default SplashScreen;
