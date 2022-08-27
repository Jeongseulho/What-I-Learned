const container = document.querySelector(".image-container");
const startButton = document.querySelector(".start-button");
const gameText = document.querySelector(".game-text");
const playTime = document.querySelector(".play-time");

const tileCount = 16;

let tiles = [];

let isPlaying = false;

let timeInterval = null;
let time = 0;

const dragged = {
  el: null,
  class: null,
  index: null,
};

const dropped = {
  el: null,
  class: null,
  index: null,
};

function setGame() {
  isPlaying = true;

  time = 0;
  playTime.innerText = time;
  gameText.style.display = "none";
  container.innerHTML = "";
  clearInterval(timeInterval);

  tiles = createImageTiles();
  tiles.forEach((tile) => container.appendChild(tile));
  setTimeout(() => {
    container.innerHTML = "";
    timeInterval = setInterval(() => {
      playTime.innerText = time;
      time++;
    }, 1000);
    shuffle(tiles).forEach((tile) => container.appendChild(tile));
  }, 5000);
}

function createImageTiles() {
  const tempArray = [];
  Array(tileCount)
    .fill()
    .forEach((_, i) => {
      const li = document.createElement("li");

      li.setAttribute("data-index", i);
      li.setAttribute("draggable", "true");
      li.classList.add(`list${i}`);

      /* cheat*/
      li.innerText = `${i}`;

      tempArray.push(li);
    });
  return tempArray;
}

function shuffle(array) {
  let index = array.length - 1;
  while (index > 0) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    index--;
  }

  return array;
}

function checkStatus() {
  const currentList = [...container.children];
  const unMatchedList = currentList.filter(
    (child, index) => Number(child.getAttribute("data-index")) !== index
  );
  if (unMatchedList.length === 0) {
    gameText.style.display = "block";
    isPlaying = false;
    clearInterval(timeInterval);
  }
}

container.addEventListener("dragstart", (e) => {
  if (!isPlaying) return;
  dragged.el = e.target;
  dragged.class = e.target.className;
  dragged.index = [...e.target.parentNode.children].indexOf(e.target);
  console.log(e);
});

container.addEventListener("dragover", (e) => {
  e.preventDefault();
});

container.addEventListener("drop", (e) => {
  if (!isPlaying) return;
  dropped.el = e.target;
  dropped.class = e.target.className;
  dropped.index = [...e.target.parentNode.children].indexOf(e.target);
  if (dropped.class !== dragged.class) {
    let originPlace;
    let isLast;
    if (dragged.el.nextSibling) {
      originPlace = dragged.el.nextSibling;
    } else {
      originPlace = dragged.el.previousSibling;
      isLast = true;
    }
    dragged.index > dropped.index
      ? dropped.el.before(dragged.el)
      : dropped.el.after(dragged.el);
    isLast ? originPlace.after(dropped.el) : originPlace.before(dropped.el);
  }
  checkStatus();
});

startButton.addEventListener("click", () => {
  setGame();
});
