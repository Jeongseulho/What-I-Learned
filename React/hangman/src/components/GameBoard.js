import React, { useState, useEffect } from "react";
import LetterGrid from "./LetterGrid";
import ButtonGrid from "./ButtonGrid";

function GameBoard({ secretWord }) {
  const [guessedLetter, setGuessedLetter] = useState("");
  const [errorCount, setErrorCount] = useState(0);

  return (
    <div>
      <LetterGrid
        guessedLetter={guessedLetter}
        secretWord={secretWord}
      ></LetterGrid>
      <br></br>
      <ButtonGrid
        setGuessedLetter={setGuessedLetter}
        guessedLetter={guessedLetter}
      ></ButtonGrid>
      {errorCount}
    </div>
  );
}

export default GameBoard;
