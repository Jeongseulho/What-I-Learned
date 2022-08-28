const playground = document.querySelector(".playground > ul");

const GAME_ROWS = 20;
const GAEM_COLS = 10;

let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const BLOCKS = {
  tree: [],
};

const movingItem = {
  type: "",
  direction: 0,
  top: 0,
  letf: 0,
};

init();

function init() {
  for (let i = 0; i < GAME_ROWS; i++) {
    prependNewLine();
  }
}

function prependNewLine() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  for (let j = 0; j < GAME_ROWS; j++) {
    const matrix = document.createElement("li");
    ul.prepend(matrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}
