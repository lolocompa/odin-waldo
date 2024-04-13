import React from "react";
import waldoImage from "../assets/wally-standing.png";
import waizzardImage from "../assets/wizzard.gif";
import odlawImage from "../assets/odlaw.gif";
import beachImage from "../assets/whereswaldo.jpg";
import "../css/index2.css";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export const Index = () => {

  const [timerOn, setTimerOn] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [winner, setwinner] = useState(false)

  const picRef = useRef(null);
  const waldoPic = useRef(null);
  const wizzPic = useRef(null);
  const odlawPic = useRef(null);

  useEffect(() => {
    let timer;
    if (timerOn) {
      timer = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerOn]);


  const startTimer = () => {
    setTimerOn(true);
  };

  const stopTimer = () => {
    setTimerOn(false);
  };

  const resetTimer = () => {
    setElapsedTime(0);
  };


  useEffect(() => {
    const timer = startTimer();
    return () => clearInterval(timer);
  }, []); 


  const [dropdownPosition, setDropdownPosition] = useState({
    x: -100,
    y: -100,
  });
  const [currentX, setcurrentX] = useState(null)
  const [currentY, setcurrentY] = useState(null) 

  const handleImageClick = (e) => {
    // Get the coordinates of the click relative to the image
    const rect = picRef.current.getBoundingClientRect();
    const clickedX = e.clientX - rect.left;
    const clickedY = e.clientY - rect.top;

    // Calculate x and y as percentages relative to the image size
    const x_round = Math.round((100 * clickedX) / rect.width);
    const y_round = Math.round((100 * clickedY) / rect.height);

    setcurrentX(x_round)
    setcurrentY(y_round)

    const x = (100 * clickedX) / rect.width;
    const y = (100 * clickedY) / rect.height;
    // Set the dropdown position using setDropdownPosition

    // Set the dropdown position
    setDropdownPosition({ x, y });
  };

  const check = async (data) => {

    console.log(data.characters)

    if(data.characters) {
      if(data.characters.length === 3) {
        stopTimer()
        setwinner(true)
      }

      for(let i = 0; i < data.characters.length; i++) {
        if(data.characters[i].name === "waldo") {
          waldoPic.current.classList.add("blurry")
        }
        else if (data.characters[i].name === "wizzard") {
          wizzPic.current.classList.add("blurry")
        }
        else if (data.characters[i].name === "odlaw") {
          odlawPic.current.classList.add("blurry")
        }
      }
      console.log(waldoPic.current.classList)
    }
    }


  const handle_submit = async (event, name) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, currentX, currentY }),
      });

      if (response.ok) {
        const data = await response.json()
        check(data)
      }

    } catch (error) {
      console.error("Error checking:", error);
    }

  }



  return (
    <div className="page">
      <div className="aside">
        <img src={waldoImage} ref={waldoPic} className="waldo_img" alt="waldo"></img>
        <img src={waizzardImage} ref={wizzPic} className="wizzard_img" alt="wizzard"></img>
        <img src={odlawImage} ref={odlawPic} className="odlaw_img" alt="odlaw"></img>
      </div>
      <div className="gameboard">
        {winner ? (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <h1>Congratoulations!</h1>
            <p style={{
              marginTop: "10px"
            }}> you found them all in {elapsedTime} seconds</p>
          </div>
        ) : (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
              <h1>WHERE IS WALDO?</h1>
              <p style={{
              marginTop: "10px"
            }}>Try to find waldo, wizard and odlaw as soon as possible</p>
              <h1>{elapsedTime}</h1>
          </div>
        )}
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
                  <button onClick={(e) => handle_submit(e, "waldo")} className="option">Waldo</button>
                  <button  onClick={(e) => handle_submit(e, "wizzard")} className="option">wizard</button>
                  <button onClick={(e) => handle_submit(e, "odlaw")}  className="option">Odlaw</button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
