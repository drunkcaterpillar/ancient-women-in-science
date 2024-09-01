import React from "react";
import "./IconBar.css";
import {
  FaBook,
  FaQuestionCircle,
  FaLightbulb,
  FaFilter,
  FaRuler,
} from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface IconBarProps {
  onIconClick: (type: string) => void;
  onFilterClick: () => void;
  onRangeSliderClick: () => void;
}

const IconBar: React.FC<IconBarProps> = ({
  onIconClick,
  onFilterClick,
  onRangeSliderClick,
}) => {
  return (
    <div className="icon-bar-container">
      <div
        className="icon-button"
        onClick={() => onIconClick("stories")}
        data-tooltip-id="stories-tooltip"
      >
        <FaBook />
        <ReactTooltip id="stories-tooltip" place="top" content="Show Stories" />
      </div>
      <div
        className="icon-button"
        onClick={() => onIconClick("quiz")}
        data-tooltip-id="quiz-tooltip"
      >
        <FaQuestionCircle />
        <ReactTooltip id="quiz-tooltip" place="top" content="Show Quiz" />
      </div>
      <div
        className="icon-button"
        onClick={() => onIconClick("facts")}
        data-tooltip-id="facts-tooltip"
      >
        <FaLightbulb />
        <ReactTooltip
          id="facts-tooltip"
          place="top"
          content="Click me for a fun fact!"
        />
      </div>
      <div
        className="icon-button"
        onClick={onFilterClick}
        data-tooltip-id="filter-tooltip"
      >
        <FaFilter />
        <ReactTooltip id="filter-tooltip" place="top" content="Filter" />
      </div>
      <div
        className="icon-button"
        onClick={onRangeSliderClick}
        data-tooltip-id="range-slider-tooltip"
      >
        <FaRuler />
        <ReactTooltip
          id="range-slider-tooltip"
          place="top"
          content="Select Year Range"
        />
      </div>
    </div>
  );
};

export default IconBar;
