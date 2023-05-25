import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Keyboard from "./keyboard.jsx";
import { keyBoardkeys } from "./data";
function App() {
  let sentence = "HELLO";
  const [sentenceArray, setSentenceArray] = useState([]);
  const [pressedkey, setPressedkey] = useState("");
  const [activeWord, setActiveWord] = useState(sentence.charAt(0));
  const [activeWordNumber, setActiveWordNumber] = useState(0);
  const [totalKeyPressed, setTotalKeyPressed] = useState(0);
  const [timerStart, setTimerStart] = useState(false);
  const [wrongKeyPressed, setWrongKeyPressed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const getArrayfromSentence = () => {
    console.log("ran");
    let a = [];
    for (let i = 0; i < sentence.length; i++) {
      // previously used subStr method but it is deprecated now
      a[i] = sentence.charAt(i);
    }
    setSentenceArray(a);
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      setPressedkey(e.key);
      if (keyBoardkeys.includes(e.key)) {
        if (timerStart) {
          setTotalKeyPressed(totalKeyPressed + 1);
        }
        if (
          e.key == activeWord &&
          activeWordNumber < sentenceArray.length - 1
        ) {
          setActiveWord(sentenceArray[activeWordNumber + 1]);
          setActiveWordNumber(activeWordNumber + 1);
        } else if (
          e.key == activeWord &&
          activeWordNumber === sentenceArray.length - 1
        ) {
          setActiveWord(sentenceArray[0]);
          setActiveWordNumber(0);
          window.alert("You have completed this sentence");
          getAccuracy();
          return;
        } else if (timerStart) {
          setWrongKeyPressed(wrongKeyPressed + 1);
          return;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    activeWordNumber,
    sentenceArray,
    timerStart,
    totalKeyPressed,
    wrongKeyPressed,
  ]);

  useEffect(() => {
    getArrayfromSentence();
  }, []);
  const stopTimer = () => {
    setTimerStart(false);
  };
  const startTimer = () => {
    setTimerStart(true);
  };
  const resetTimer = () => {
    setTimerStart(true);
    setTotalKeyPressed(0);
  };
  const getAccuracy = () => {
    let result = ((totalKeyPressed - wrongKeyPressed) / totalKeyPressed) * 100;
    if (result && result < 100) {
      setAccuracy(result);
    }
  };
  return (
    <div>
      {activeWord &&
        sentenceArray &&
        sentenceArray.length !== 0 &&
        sentenceArray?.map((data, id) => {
          return (
            <>
              {id === activeWordNumber ? (
                <span style={{ color: "red" }}>{activeWord}</span>
              ) : (
                <span>{data}</span>
              )}
            </>
          );
        })}
      <br />
      {activeWord}-activeWord
      <br />
      {activeWordNumber}-activeWordNumber
      <br />
      {pressedkey}-pressedkey
      <br />
      <button onClick={() => startTimer()}>Start</button>
      <button onClick={() => stopTimer()}>Stop</button>
      <button
        onClick={() => {
          resetTimer();
        }}
      >
        Restart
      </button>
      {totalKeyPressed}-tkp
      <br />
      {wrongKeyPressed}-wrong
      {accuracy}-accuracy
      <Keyboard activeWord={activeWord}/>
    </div>
  );
}

export default App;
