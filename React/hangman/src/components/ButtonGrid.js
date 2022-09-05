import React from "react";
import Button from "./Button";
import styled from "styled-components";

const ButtonGridWrapp = styled.div`
  grid-template-columns: repeat(6, 1fr);

  gap: 10px;
  display: grid;
`;

function ButtonGrid({ setGuessedLetter, guessedLetter }) {
  const arr = Array.from({ length: 26 }, (v, i) => String.fromCharCode(i + 65));

  const buttons = arr.map((letter, index) => (
    <Button
      guessedLetter={guessedLetter}
      setGuessedLetter={setGuessedLetter}
      letter={letter}
      key={index}
    />
  ));

  return <ButtonGridWrapp>{buttons}</ButtonGridWrapp>;
}

export default ButtonGrid;
