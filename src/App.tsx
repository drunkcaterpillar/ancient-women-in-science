import React, { useState, useEffect } from "react";
import "./App.css";
import GlobeComponent from "./components/Globe";
import IconBar from "./components/IconBar";
import Modal from "./components/Modal";
import FilterComponent from "./components/FilterComponent";
import RangeSlider from "./components/RangeSlider";
import EasterEgg from "./components/EasterEgg";
import InteractiveStories from "./components/InteractiveStories";
import Quiz from "./components/Quiz";
import { Woman } from "./types";
import axios from "axios";
import { Tooltip as ReactTooltip } from "react-tooltip";

const questions = [
  {
    question: "Who was the first woman to win a Nobel Prize?",
    options: ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Hypatia"],
    answer: "Marie Curie",
  },
  // Add more questions here
];

const subjectMapping: { [key: string]: string[] } = {
  science: ["biology", "chemistry", "physics", "astronomy", "medicine"],
  technology: ["computing", "engineering technology"],
  engineering: ["mechanical", "civil", "electrical"],
  mathematics: ["geometry", "calculus", "algebra", "number theory"],
};

const App: React.FC = () => {
  const [women, setWomen] = useState<Woman[]>([]);
  const [filteredWomen, setFilteredWomen] = useState<Woman[]>([]);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const [rangeSliderModal, setRangeSliderModal] = useState<boolean>(false);
  const [yearRange, setYearRange] = useState<[number, number]>([1700, 1800]);

  useEffect(() => {
    axios
      .get<Woman[]>("http://localhost:5000/women")
      .then((response) => {
        setWomen(response.data);
        setFilteredWomen(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleFilterChange = (filter: string) => {
    if (filter === "all") {
      setFilteredWomen(women);
    } else {
      const filtered = women.filter((woman) => {
        // Ensure we check the categories array for matching filters
        const womanCategories = Array.isArray(woman.categories)
          ? woman.categories
          : [woman.categories];
        return womanCategories.some((category) =>
          subjectMapping[filter]?.includes(category.toLowerCase())
        );
      });
      setFilteredWomen(filtered);
    }
  };

  const handleRangeChange = (range: [number, number]) => {
    setYearRange(range);
  };

  useEffect(() => {
    const filtered = women.filter((woman) => {
      const deathYear = woman.deathYear || woman.birthYear + 150;
      return woman.birthYear <= yearRange[1] && deathYear >= yearRange[0];
    });
    setFilteredWomen(filtered);
  }, [yearRange, women]);

  const handleIconClick = (type: string) => {
    if (type === "stories") {
      setModalContent(<InteractiveStories women={women} />);
    } else if (type === "quiz") {
      setModalContent(<Quiz questions={questions} />);
    } else if (type === "facts") {
      setModalContent(<EasterEgg />);
    }
  };

  return (
    <div className="vintage-container">
      <header className="vintage-header">
        <h1>Ancient Women in STEM</h1>
      </header>
      <main>
        <IconBar
          onIconClick={handleIconClick}
          onFilterClick={() => setFilterModal(true)}
          onRangeSliderClick={() => setRangeSliderModal(true)}
        />
        <div className="globe-container">
          <GlobeComponent data={filteredWomen} />
        </div>
        {modalContent && (
          <Modal content={modalContent} onClose={() => setModalContent(null)} />
        )}
        {filterModal && (
          <Modal
            content={<FilterComponent onFilterChange={handleFilterChange} />}
            onClose={() => setFilterModal(false)}
          />
        )}
        {rangeSliderModal && (
          <Modal
            content={
              <RangeSlider
                minYear={1500}
                maxYear={2000}
                onChange={handleRangeChange}
              />
            }
            onClose={() => setRangeSliderModal(false)}
          />
        )}
        <ReactTooltip data-tip="Hellowld" />
      </main>
      <footer className="vintage-footer">© 2024 Women in STEM</footer>
    </div>
  );
};

export default App;
