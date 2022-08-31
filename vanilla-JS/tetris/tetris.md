# 테트리스 만들기

![2022-08-29 17;29;44](https://user-images.githubusercontent.com/110578739/187158860-6275d0a9-3f3d-4b1e-bdb8-ca64d33da05f.gif)
<br>

## 기본 변수들

```java script
import BLOCKS from "./blocks.js";

const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".game-text > button");

const GAME_ROWS = 20;
const GAEM_COLS = 10;

let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const movingItem = {
  type: "",
  direction: 0,
  top: 0,
  left: 3,
};
```

## 격자 배경과 블럭 만들기

```java script

function init() {
  tempMovingItem = { ...movingItem };

  for (let i = 0; i < GAME_ROWS; i++) {
    prependNewLine();
  }
  generateNewBlock();
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
```

`ul, li`태그로 격자모양 생성  
`ul`태그에 `li`태그 20개를 만들어 세로로 줄을 세우고  
각각의 `li`태그에 `ul`태그를 생성 그 `ul`태그 하위에 `li`태그 10개를 가로로 줄을 세운다

```java script
function generateNewBlock() {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, duration);

  const blockArray = Object.entries(BLOCKS);
  const randomIndex = Math.floor(Math.random() * blockArray.length);

  movingItem.type = blockArray[randomIndex][0];

  movingItem.left = 3;
  movingItem.direction = 0;
  movingItem.top = 0;
  tempMovingItem = { ...movingItem };
  renderBlocks();
}
```

`moveBlock()`으로 `duration`마다 내려오도록 함  
블럭 종류 만큼의 랜덤 숫자 생성후 랜덤 블럭을 `movingItem.type`에 담는다

- `Object.entries()`쓰면 객체를 배열로 만든다  
  이때 각 배열 0번째,1번쨰...에 각각 `[key,value]`를 담은 배열을 담는다  
  `blockArray[randomIndex][0]` 이면 결국 객체에 담긴 key값을 가르킨다(square, bar, tree...)

`movingItem`에 각 적절한 초깃값 부여  
<br>
... 사용한 이유

```java script
  tempMovingItem = movingItem;
  movingItem.left = 3;
```

- `tempMovingItem`값도 바뀐다
- 객체는 해당 값을 갖고있는게 아니고 해당값이 담겨있는 주소를 갖고있다
- 바로 대입할 경우 1개의 객체에 2개의 변수에서 해당 1개의 객체에서 참조하는것

```java script
  tempMovingItem = {...movingItem};
  movingItem.left = 3;
```

- `tempMovingItem` 값유지
- 이 경우 새로운 객체를 만들어서 객체 자체가 2개가 되는것

## 블럭 움직임과 블럭 렌더링

```java script
function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);
}
```

`moveType`에 따라 블럭의 움직임을 바꾸는 간단한 함수

```java script
function renderBlocks(moveType = "") {
  const { type, direction, top, left } = tempMovingItem;
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => moving.classList.remove(type, "moving"));

  BLOCKS[type][direction].some((block) => {
    const x = block[0] + left;
    const y = block[1] + top;
    const target = playground.childNodes[y]
      ? playground.childNodes[y].childNodes[0].childNodes[x]
      : null;
    const isAvailable = checkEmpty(target);
    if (isAvailable) {
      target.classList.add(type, "moving");
    } else {
      tempMovingItem = { ...movingItem };
      if (moveType === "retry") {
        clearInterval(downInterval);
        showGameText();
      }
      setTimeout(() => {
        renderBlocks("retry");
        if (moveType === "top") {
          seizeBlock();
        }
      }, 0);
      return true;
    }
  });
  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = direction;
}
```

`renderBlocks()`은 moveType을 인자로 받고 없을시 초기값은 빈문자열

`destructuring`

- 배열 디스트럭쳐링 (Array Destructuring)

```java script
var arr = [1, 2, 3];

const one   = arr[0];
const two   = arr[1];
const three = arr[2];

// 배열의 인덱스를 기준으로 값이 저장됩니다.
const [one, two, three] = arr; // 위와 같은 의미
```

- 객체 디스트럭쳐링 (Object Destructuring)

```java script
var obj = { firstName: 'john', lastName: 'smith' };

const firstName = obj.firstName;
const lastName  = obj.lastName;
// 주의! 가져오려는 값의 프로퍼티명과 저장하려는 변수명이 같아야 합니다.
// 즉, 프로퍼티명을 기준으로 값을 불러오고 저장합니다.
const { lastName, firstName } = obj;
```

`moving`클래스를 가진 태그들은 색이 칠해진 부분 해당 부분들을 클래스를 모두 지운다  
(css에서 각 타입에 맞는 색깔이 부여된 상태)  
`BLOCK`는 각 블럭 모양이 x,y좌표값으로 표현된 상태, 블럭의 종류와 방향을 정하고 `some()`으로 반복문 진행

`forEach`문 쓰면 범위밖으로 나가도 나머지 반복문을 다 돌게되므로 비효율적  
`some`을 사용하여 `else`에 `return true;`를 써서 범위밖이면 할거하고 반복문 탈출  
`forEach`문은 반복문 중단이 불가능 `for`문에서 사용하는 `break,continue` 사용불가

- 다시 정리해보는 `forEach, map, filter, some, every` 메소드

  - `map, filter, forEach`는 모두 콜백함수를 인자로 넣는다
  - 해당 콜백함수의 파라미터는 순서대로 (값, 인덱스, 배열자체)이다
  - 배열을 돌면서 해당 콜백함수의 리턴값들을 모아서 배열로 만들어 반환하는것이 `map,filter`이다
  - `for`문 대신하여 배열에대해서 반복만을 사용할때 사용하는 것이 `foreach`문
  - `forEach`문의 콜백함수가 가진 리턴값은 의미가 없다 또한 `forEach`문 자체의 리턴값도 없다  
    <br>

- some또한 콜백함수를 인자로 넣는다
- 해당 콜백함수 또한 마찬가지로 (값, 인덱스, 배열자체)로 파라미터를 갖는다
- 배열을 돌면서 해당 콜백함수의 리턴값이 true이면 반복을 종료하고 최종적으로 true를 반환 전부 false이면 최종적으로 false반환

- every는 동일하지만 콜백함수의 리턴값이 true이면 계속 반복 진행, 반복다하고 전부 true이면 true반환, 반복중에 false인 리턴값의 콜백함수 있으면 반복종료후 false반환

```java script
if (isAvailable) {
      target.classList.add(type, "moving");
    } else {
      tempMovingItem = { ...movingItem };
      if (moveType === "retry") {
        clearInterval(downInterval);
        showGameText();
      }
      setTimeout(() => {
        renderBlocks("retry");
        if (moveType === "top") {
          seizeBlock();
        }
      }, 0);
      return true;
    }

  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = direction;
```

x, y 좌표값을 얻고 해당 좌표값이 격자안에 유효한값인지 확인

```java script
function checkEmpty(target) {
  if (!target || target.classList.contains("seized")) return false;

  return true;
}
```

격자밖 값이거나 이미 칠해져있는 블럭이 존재하는 칸이면 `false`이다  
유효하면 클래스 추가로 색칠하기  
그전의 `renderBlocks`에서 `retry`값 받았는데 또 잘못된 위치면 게임오버 간주  
아래로 내려갔는데 유효하지 않은거면 맨 아래층에 고정됬다는 뜻  
반복문 실행 후에 현재값을 업데이트(`movingItem`)

```java script
else {
      tempMovingItem = { ...movingItem };
      renderBlocks();
    }
```

범위안에서 정상 실행일때 movingItem을 계속 업데이트하다가 범위밖이면 바로 그전 상태인 movingItem을 가져와서 다시 렌더링
하지만 이경우 call stack size exceed 오류발생(재귀함수 계속 반복)하므로 `setTimeout`사용함  
<br>

## 블럭 맨아래서 고정하기, 1줄 만들어지면 지우기

```java script
function seizeBlock() {
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove("moving");
    moving.classList.add("seized");
  });
  cheackMatch();
}
```

클래스들에 `seized`라는 클래스 부여해서 고정시키고 1줄 됬는지 체크하기

```java script
function cheackMatch() {
  const childNodes = playground.childNodes;
  childNodes.forEach((child) => {
    let matched = true;
    child.children[0].childNodes.forEach((li) => {
      if (!li.classList.contains("seized")) matched = false;
    });
    if (matched) {
      child.remove();
      prependNewLine();
      score++;
      scoreDisplay.innerText = score;
    }
  });
  generateNewBlock();
}
```

1줄 모두 체크해서 `matched`에 `true or false` 정하기  
`true`이면 해당 줄 모두 제거하고 새줄 만드는 함수 부르면서 `score++`  
<br>

## 방향키 및 스페이스바에 이벤트 등록

```java script
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      moveBlock("left", -1);
      break;
    case "ArrowRight":
      moveBlock("left", 1);
      break;
    case "ArrowDown":
      moveBlock("top", 1);
      break;
    case "ArrowUp":
      changeDirection();
      break;
    case " ":
      dropBlock();
      break;
    default:
      break;
  }
});
```

각키에 대해 동작 정하고 이벤트 만들기

```java script
function dropBlock() {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, 10);
}

function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);
}

function changeDirection() {
  const direction = tempMovingItem.direction;
  direction === 3
    ? (tempMovingItem.direction = 0)
    : (tempMovingItem.direction += 1);
  renderBlocks();
}

restartButton.addEventListener("click", () => {
  playground.innerHTML = "";
  gameText.style.display = "none";
  init();
});
```

각 키에대한 이벤트 동작 함수들 및 시작버튼 만들기

<br>

<hr>

### 배운 함수, 문법, 객체들

- `Object.entries()`
- `Destructuring`
- `some(), every()`
  <br>

### 그 밖의 배운것

- call stack exceed 오류에서 `setTimeout`과 같은 비동기를 사용하여 해결하자
- 반복문 사용중 중간에 멈춰야 할때는 `some, every, for`문을 사용하자
- 어떤 기능을 만들기위해서 어떤 정보와 어떤 상태가 필요한지 생각해보고 그 정보와 상태들을 담을 변수, 객체를 먼저 생각하고 정의해보자
- `console.log`나 디버깅을 통해서 내가 목표로 하는, 가져오려고 하는 값이 맞는지 꼼꼼하게 확인해보자
- 객체 변수를 만들때 변수는 객체내의 값을 갖고있는게 아니고 참조값/주소를 갖고 있는것이다
