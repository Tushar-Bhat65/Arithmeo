// src/components/FloatingWords.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./FloatingWords.css";

const FloatingWords = ({ words = [] }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const spans = containerRef.current.querySelectorAll(".floating-word");
    spans.forEach((span) => {
      const duration = gsap.utils.random(15, 40); // slow movement
      const x = gsap.utils.random(0, 100);
      const y = gsap.utils.random(0, 100);

      gsap.set(span, {
        xPercent: x,
        yPercent: y,
        opacity: gsap.utils.random(0.1, 0.3),
        fontSize: gsap.utils.random(12, 32),
      });

      gsap.to(span, {
        xPercent: `+=${gsap.utils.random(-20, 20)}`,
        yPercent: `+=${gsap.utils.random(-20, 20)}`,
        duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, [words]);

  return (
    <div className="floating-words-container" ref={containerRef}>
      {words.map((word, idx) => (
        <span key={idx} className="floating-word">
          {word}
        </span>
      ))}
    </div>
  );
};

export default FloatingWords;
