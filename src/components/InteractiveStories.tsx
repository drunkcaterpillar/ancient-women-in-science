// src/components/InteractiveStories.tsx
import React, { useState } from "react";
import { Woman } from "../types";
import { useModal } from "../context/ModalContext";

interface InteractiveStoriesProps {
  women: Woman[];
}

const InteractiveStories: React.FC<InteractiveStoriesProps> = ({ women }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { openModal } = useModal();

  const handleNextStory = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % women.length);
  };

  const handleShowStory = () => {
    const woman = women[currentIndex];
    openModal(
      <div className="vintage-modal">
        <h2>{woman.name}</h2>
        <p>{woman.contribution}</p>
        <button onClick={handleNextStory}>Next Story</button>
      </div>
    );
  };

  if (!women || women.length === 0) {
    return <div>No stories available</div>;
  }

  return (
    <div>
      <button onClick={handleShowStory}>Show Story</button>
    </div>
  );
};

export default InteractiveStories;
