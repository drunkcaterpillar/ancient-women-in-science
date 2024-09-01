// src/components/EasterEgg.tsx
import React, { useState } from "react";
import "./EasterEgg.css";
import { FaLightbulb } from "react-icons/fa";

const facts = [
  "Did you know? Ada Lovelace wrote the first algorithm intended for a machine, making her the world's first computer programmer.",
  "Did you know? Marie Curie was the first person to win Nobel Prizes in two different scientific fields: Physics and Chemistry.",
  "Did you know? Hedy Lamarr, a famous actress, was also an inventor who developed a frequency-hopping signal during World War II, which is the basis for modern Bluetooth technology.",
  "Did you know? Rosalind Franklin's work on X-ray diffraction was critical to understanding the molecular structures of DNA.",
  "Did you know? Emmy Noether developed a theorem that is fundamental in theoretical physics.",
  "Did you know? Mary Anning discovered the first complete Ichthyosaurus fossil.",
  // Add more facts here
];

const EasterEgg: React.FC = () => {
  const [showFact, setShowFact] = useState(false);
  const [fact, setFact] = useState("");

  const toggleFact = () => {
    if (!showFact) {
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      setFact(randomFact);
    }
    setShowFact(!showFact);
  };

  return (
    <div className="easter-egg">
      <button className="easter-egg-icon" onClick={toggleFact}>
        <FaLightbulb /> Click me for a fun fact!
      </button>
      {showFact && (
        <div className="easter-egg-modal">
          <p>{fact}</p>
          <button className="vintage-button" onClick={toggleFact}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default EasterEgg;
