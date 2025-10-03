import React, { useEffect, useRef } from "react";
import "./FloatingBackground.css";

const FloatingBackground = () => {
  const containerRef = useRef(null);

  // Words to display
  const words = [
    "Text", "Literature", "Writing", "Counting", "Data", "Story",
    "Analysis", "Paragraph", "Syntax", "Grammar", "Word", "Sentence",
    "Editor", "Numbers", "Characters", "+", "-", "%", "Code", "Font",
    "Document", "Paragraphs", "Symbol", "Vocabulary", "Novel",
    "Poem", "Essay", "Manuscript", "Letter", "Chapter"
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const floatingWords = [];

    words.forEach((word) => {
      const span = document.createElement("span");
      span.innerText = word;
      span.className = "floating-word";

      // Random initial position
      const originX = Math.random() * window.innerWidth;
      const originY = Math.random() * window.innerHeight;

      // Random amplitude and speed
      const amplitudeX = 50 + Math.random() * 150; // horizontal range
      const amplitudeY = 30 + Math.random() * 100; // vertical range
      const speed = 0.1 + Math.random() * 0.3;

      span.dataset.originX = originX;
      span.dataset.originY = originY;
      span.dataset.amplitudeX = amplitudeX;
      span.dataset.amplitudeY = amplitudeY;
      span.dataset.speed = speed;
      span.dataset.phase = Math.random() * Math.PI * 2;

      // Random scale
      span.dataset.scale = 0.8 + Math.random() * 0.5;

      // Random rotation speed
      span.dataset.rotateSpeed = (Math.random() - 0.5) * 0.2;

      container.appendChild(span);
      floatingWords.push(span);
    });

    const animate = (time) => {
      floatingWords.forEach((word) => {
        const t = time * word.dataset.speed * 0.001;
        const x =
          parseFloat(word.dataset.originX) +
          Math.sin(t + parseFloat(word.dataset.phase)) *
            parseFloat(word.dataset.amplitudeX);
        const y =
          parseFloat(word.dataset.originY) +
          Math.cos(t + parseFloat(word.dataset.phase)) *
            parseFloat(word.dataset.amplitudeY);
        const rotate =
          Math.sin(t * word.dataset.rotateSpeed) * 20; // rotation in degrees
        const scale = parseFloat(word.dataset.scale);

        word.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`;
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    const handleResize = () => {
      floatingWords.forEach((word) => {
        word.dataset.originX = Math.random() * window.innerWidth;
        word.dataset.originY = Math.random() * window.innerHeight;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      floatingWords.forEach((word) => container.removeChild(word));
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={containerRef} className="floating-background"></div>;
};

export default FloatingBackground;
