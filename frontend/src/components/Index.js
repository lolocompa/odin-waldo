import React from "react";
import waldoImage from "../assets/wally-standing.png";
import waizzardImage from "../assets/wizzard.gif";
import odlawImage from "../assets/odlaw.gif";
import beachImage from "../assets/whereswaldo.jpg";
import "../css/index2.css";
import { useState } from "react";
import { useRef } from "react";

export const Index = () => {
  let x;
  let y;
  const picRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    x: -100,
    y: -100,
  });

  const handleImageClick = (e) => {
    // Get the coordinates of the click relative to the image
    const rect = picRef.current.getBoundingClientRect();
    const clickedX = e.clientX - rect.left;
    const clickedY = e.clientY - rect.top;

    // Calculate x and y as percentages relative to the image size
    const x_round = Math.round((100 * clickedX) / rect.width);
    const y_round = Math.round((100 * clickedY) / rect.height);

    const x = (100 * clickedX) / rect.width;
    const y = (100 * clickedY) / rect.height;
    // Set the dropdown position using setDropdownPosition
    console.log(x_round, y_round);

    // Set the dropdown position
    setDropdownPosition({ x, y });
  };

  return (
    <div className="page">
      <div className="aside">
        <img src={waldoImage} className="waldo_img" alt="waldo"></img>
        <img src={waizzardImage} className="wizzard_img" alt="wizzard"></img>
        <img src={odlawImage} className="odlaw_img" alt="odlaw"></img>
      </div>
      <div className="gameboard">
        <h1>WHERE IS WALDO?</h1>
        <p>Try to find waldo, wizard and odlaw as soon as possible</p>
        <div className="beach">
          <img
            src={beachImage}
            className="beach_img"
            onClick={handleImageClick}
            alt="Beach"
            ref={picRef}
          ></img>
          <div
            className="dropdown"
            style={{
              position: "absolute",
              top: `${dropdownPosition.y}%`,
              left: `${dropdownPosition.x}%`,
            }}
          >
            <div className="drop_container">
              <div className="target"></div>
              <div className="dropdown_options">
                <button className="option">Waldo</button>
                <button className="option">wizard</button>
                <button className="option">Odlaw</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
