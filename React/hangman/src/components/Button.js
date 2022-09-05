import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MyButton = styled.button`
  display: ${({ isClicked }) => (isClicked ? "none" : null)};
`;

function Button({ letter, setGuessedLetter, guessedLetter }) {
  const [isClicked, setIsClicked] = useState(false);

  function onClick() {
    setIsClicked(true);
    setGuessedLetter(guessedLetter.concat(letter));
  }
  return (
    <MyButton onClick={onClick} isClicked={isClicked}>
      {letter}
    </MyButton>
  );
}

export default Button;
