import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

const WordCloudView = ({ wordsArray }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  // Responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = Math.min(400, width * 0.6); // Adaptive height
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!wordsArray || wordsArray.length === 0) {
      setIsReady(false);
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
      return;
    }

    const layout = cloud()
      .size([dimensions.width, dimensions.height])
      .words(wordsArray.map((d) => ({ text: d.text, size: d.value })))
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font("Impact")
      .fontSize((d) => Math.log2(d.size + 1) * Math.max(8, dimensions.width / 80))
      .on("end", (words) => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const g = svg
          .attr("width", dimensions.width)
          .attr("height", dimensions.height)
          .append("g")
          .attr("transform", `translate(${dimensions.width / 2},${dimensions.height / 2})`);

        g.selectAll("text")
          .data(words)
          .enter()
          .append("text")
          .style("font-family", "Impact")
          .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
          .style("font-size", (d) => `${d.size}px`)
          .attr("text-anchor", "middle")
          .attr("transform", (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
          .style("opacity", 0)
          .transition()
          .duration(800)
          .style("opacity", 1)
          .text((d) => d.text);

        setIsReady(true);
      });

    layout.start();
  }, [wordsArray, dimensions]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: dimensions.height,
        border: "1px solid #ccc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <svg ref={svgRef} style={{ width: "100%", height: "100%" }}></svg>

      {!wordsArray || wordsArray.length === 0 ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "gray",
            fontStyle: "italic",
          }}
        >
          No words to display.
        </div>
      ) : !isReady ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "gray",
            fontStyle: "italic",
          }}
        >
          Generating cloud...
        </div>
      ) : null}
    </div>
  );
};

export default WordCloudView;