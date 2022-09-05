import React from "react";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <div>
      <h1>welcome to hangman</h1>
      <p>do you want to play game?</p>
      <GameBoard secretWord="REACT"></GameBoard>
    </div>
  );
}

export default App;
