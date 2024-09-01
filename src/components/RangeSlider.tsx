import React, { useState } from "react";
import "./RangeSlider.css";

interface RangeSliderProps {
  minYear: number;
  maxYear: number;
  onChange: (range: [number, number]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  minYear,
  maxYear,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(minYear);
  const [maxValue, setMaxValue] = useState(maxYear);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), maxValue - 1);
    setMinValue(value);
    onChange([value, maxValue]);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), minValue + 1);
    setMaxValue(value);
    onChange([minValue, value]);
  };

  return (
    <div className="range-slider">
      <input
        type="range"
        min={minYear}
        max={maxYear}
        value={minValue}
        onChange={handleMinChange}
        className="slider"
      />
      <input
        type="range"
        min={minYear}
        max={maxYear}
        value={maxValue}
        onChange={handleMaxChange}
        className="slider"
      />
      <div className="slider-values">
        <span>{minValue}</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
