import React from "react";
import { keyBoardkeys } from "./data";
export default function Keyboard({ activeWord }) {
  
  return (
    <div>
      {console.log(keyBoardkeys, "te")}
      {keyBoardkeys.slice(0,58).map((letter, id) => {
        return (
          <>
            {activeWord === letter ? <h1>{letter}</h1> : letter}
            {id === 31 ? <br /> : null}
          </>
        );
      })}
    </div>
  );
}
