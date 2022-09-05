import React from "react";
import styled from "styled-components";
import { useEffect } from "react";

const LetterSpan = styled.span`
  border: 1px solid black;
  width: 20%;
  height: 100%;
  text-align: center;
  font-size: 30px;
`;

function Letter({ letter, isShown }) {
  return <LetterSpan>{isShown ? letter : "-"}</LetterSpan>;
}

export default Letter;
