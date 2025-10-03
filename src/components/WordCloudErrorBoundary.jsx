import React from "react";

export class WordCloudErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("WordCloud error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Failed to render Word Cloud.</p>;
    }
    return this.props.children;
  }
}
