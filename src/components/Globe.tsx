import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { Woman } from "../types";
import "./GlobeStyles.css";

interface GlobeComponentProps {
  data: Woman[];
}

const GlobeComponent: React.FC<GlobeComponentProps> = ({ data }) => {
  const [texture, setTexture] = useState<THREE.Texture>();
  const [hoveredPoint, setHoveredPoint] = useState<Woman | null>(null);
  const [clickedPoint, setClickedPoint] = useState<Woman | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const globeRef = useRef<any>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load("/vintage-mapp.jpg", (loadedTexture) => {
      setTexture(loadedTexture);
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setClickedPoint(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePointHover = (point: any, prevPoint: any) => {
    if (point) {
      if (clickedPoint) {
        setClickedPoint(null);
      }

      const pointObj = point.__threeObj;
      pointObj.material.color.set(0xf3dcb2); // Lighter glow for better visibility
      pointObj.scale.set(2, 2, 2); // Increase size for visibility
      setHoveredPoint(point as Woman);

      const { x, y } = globeRef.current.getScreenCoords(point.lat, point.lng);
      setTooltipPosition({ top: y, left: x });
    } else {
      setHoveredPoint(null);
      setTooltipPosition(null);
    }
    if (prevPoint) {
      const prevPointObj = prevPoint.__threeObj;
      prevPointObj.material.color.set(0x704214); // Darker original color
      prevPointObj.scale.set(1, 1, 1); // Reset to original size
    }
  };

  const handlePointClick = (point: any) => {
    setClickedPoint(point as Woman);
    setHoveredPoint(null);

    const { x, y } = globeRef.current.getScreenCoords(point.lat, point.lng);
    setTooltipPosition({ top: y, left: x });
  };

  return (
    <div className="globe-container">
      <Globe
        ref={globeRef}
        globeImageUrl={texture ? "/vintage-mapp.jpg" : undefined}
        pointsData={data}
        pointLat={(d: any) => (d as Woman).lat}
        pointLng={(d: any) => (d as Woman).lng}
        pointRadius={0.7} // Slightly increased radius for better visibility
        pointColor={() => "rgba(112, 66, 20, 1)"} // Darker brown for better contrast
        pointAltitude={0.01}
        pointResolution={12}
        onPointHover={handlePointHover}
        onPointClick={handlePointClick}
        pointLabel={() => ""}
      />

      {hoveredPoint && tooltipPosition && (
        <div
          className="hover-modal"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
        >
          <p>
            <strong>{hoveredPoint.name}</strong>
          </p>
          <p>{hoveredPoint.subject}</p>
        </div>
      )}

      {clickedPoint && tooltipPosition && (
        <div
          className="click-modal"
          ref={modalRef}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
        >
          <h1>
            <strong>{clickedPoint.name}</strong>
          </h1>
          <p>
            <strong>Subject:</strong> {clickedPoint.subject}
          </p>
          <p>
            <strong>Contribution:</strong> {clickedPoint.contribution}
          </p>
          <p>
            <strong>Legacy:</strong> {clickedPoint.impact}
          </p>
          <img
            src={
              clickedPoint.image ||
              "/home/shon/Desktop/women-in-stem-globe/public/designer.png"
            }
            alt={clickedPoint.name}
          />
          <button onClick={() => setClickedPoint(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default GlobeComponent;
