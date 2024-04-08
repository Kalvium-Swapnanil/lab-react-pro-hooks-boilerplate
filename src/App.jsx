import React, { useEffect, useState, useCallback } from "react";
import "./App.css";

const LARGE_NUMBER = 1000000000;

function App() {
  const [value, setValue] = useState(0);
  const [dark, setTheme] = useState(true);
  const [themeName, setThemeName] = useState("dark");
  const [currentList, setList] = useState([]);
  const [delayMessage, setDelayMessage] = useState(false);
  const [callbackMessage, setCallbackMessage] = useState(false);

  const delayFunction = useCallback(() => {
    console.log("Delay Function Ran");
    for (let index = 0; index < LARGE_NUMBER; index++) {}
    return value + 2;
  }, [value]);

  const testFunction = useCallback(() => {
    return [value * 3, value * 4];
  }, [value]);

  useEffect(() => {
    console.log("Callback Function was called");
    setCallbackMessage(true);
    const timer = setTimeout(() => {
      setCallbackMessage(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [testFunction]);

  useEffect(() => {
    if (dark) {
      setThemeName("dark");
    } else {
      setThemeName("light");
    }
  }, [dark]);

  const handleClick = () => {
    setTheme(!dark);
  };

  const handleChangeValue = () => {
    setDelayMessage(true);
    const newValue = value + 1;
    setValue(newValue);
    setDelayMessage(false);
  };

  const handleList = () => {
    setList(testFunction);
  };

  const styleTheme = {
    backgroundColor: dark ? "black" : "#ccc7c7",
  };

  return (
    <div className="page" style={styleTheme}>
      <button onClick={handleClick}>{themeName}</button>
      <h1>{value}</h1>
      <button onClick={handleChangeValue}>Change Value</button>
      <button onClick={handleList}>Show List</button>
      {delayMessage && <h2>{delayFunction()}</h2>}
      <div>
        {currentList.map((item, index) => {
          return <h2 key={index}>{item}</h2>;
        })}
      </div>
      {callbackMessage && <p>Callback Function was called</p>}
    </div>
  );
}

export default App;