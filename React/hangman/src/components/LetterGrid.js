import React from "react";
import Letter from "./Letter";
import styled from "styled-components";
import { useState, useEffect } from "react";

const LettersWrapp = styled.div`
  display: flex;
  width: 500px;
  height: 50px;
`;

function LetterGrid({ secretWord, guessedLetter }) {
  let letters = [...secretWord].map((letter, index) => {
    const isShown = guessedLetter.indexOf(letter.toUpperCase()) > -1;

    return <Letter key={index} letter={letter} isShown={isShown} />;
  });

  return <LettersWrapp>{letters}</LettersWrapp>;
}

export default LetterGrid;
