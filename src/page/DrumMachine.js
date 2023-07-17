import React, {useEffect, useState, useRef} from "react";
import './Styles.css'

const DrumMachine = () => {
  const [heater, setHeater] = useState("");
  const [display, setDisplay] = useState("");
  const [volume, setVolume] = useState(0.5);
  const [isChecked, setIsChecked] = useState(true);
  

  const keys = [
    {
      id: 1,
      type: "Heater-1",
      keycode: 81,
      key: "Q",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      ref: useRef(),
    },
    {
      id:2,
      type: "Heater-2",
      key: "W",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      keycode: 87,
      ref: useRef()
    },
    {
      id:3,
      type: "Heater-3",
      key: "E",
      keycode: 69,
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      ref: useRef()
    },
    {
      id:4,
      type: "Heater-4",
      key: "A",
      keycode: 65,
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      ref: useRef()
    },
    {
      id:5,
      type: "Clap",
      key: "S",
      keycode: 83,
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      ref: useRef()
    },
    {
      id:6,
      type: "Open-HH",
      keycode: 68,
      key: "D",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      ref: useRef()
    },
    {
      id:7,
      type: "Kick-n'-Hat",
      keycode: 90,
      key: "Z",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      ref: useRef()
    },
    {
      id:8,
      type: "Kick",
      key: "X",
      keycode: 88,
      audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      ref: useRef()
    },
    {
      id:9,
      type: "Closed-HH",
      keycode: 67,
      key: "C",
      audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      ref: useRef()
    },
  ];


  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event) => {
    const key = event.key.toLowerCase();
    const drumPad = keys.find((pad) => pad.key.toLowerCase() === key);
    if (drumPad) {
      drumPad.ref.current.play();
    }
  };

  const handleClick = (value) => {
    const audioElement = value.ref.current;
    if (!isChecked) {
      return; // Exit the function if click is disabled
    }else{
    
    audioElement.volume = volume;
    audioElement.play();
    const extractedText = value.type.replace('-', ' ');
    setDisplay(extractedText);
    setHeater(value.key);
    }
  };

  const handleVolumeChange = (event) => {
    if (!isChecked) {
      return;
    }
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    setDisplay(newVolume);
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
    setDisplay("");
  };

  const renderButton = (value) => {
    return (
      <div
        className="drum-pad"
        key={value.id}
        id={"key-" + value.key}
        onClick={() => handleClick(value)}
      >
        {value.key}
        <audio
          ref={value.ref}
          id={value.key}
          className="clip"
          src={value.audio}
          type="audio/mp3"
        />
      </div>
    );
  };

  return (
    <div id="drum-machine">
      <div id="display">
        <div className="bordered-div">
          <div id="box">
            <p>Power</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
              />
              <span className="slider"></span>
            </label>
            <div id="block">{display}</div>
            {isChecked ? "ON" : "OFF"}
            <div className="volume-control">
              <div className="volume-slider">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
          <div className="grid-container">{keys.map(renderButton)}</div>
        </div>
        <div className="volume-control"></div>
      </div>
    </div>
  );
};
export default DrumMachine