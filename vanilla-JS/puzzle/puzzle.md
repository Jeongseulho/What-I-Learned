# puzzle만들기

![2022-08-27 18;08;59](https://user-images.githubusercontent.com/110578739/187023603-4f6bc179-f570-432c-b808-1e6bf65426fe.gif)

<br>

## 사진 grid구조 만들기

```css
ul {
  margin-top: 1rem;
  list-style: none;
  border: 2px solid var(--facebook);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

li {
  width: 100px;
  height: 100px;
  border: 1px solid red;
  color: #fff;
  background: url("https://placeimg.com/400/400/0");
}
```

위처럼 `ul`태그에 `grid`를 부여하고 하위요소인 각 `li`에 배경사진을 넣는다

<img width="322" alt="2022-08-27 18;54;48" src="https://user-images.githubusercontent.com/110578739/187025115-00110b53-2982-47a0-8af8-b6dbd6f26fbc.PNG">

다음과 같이 각 `li`에 똑같은 사진이 나온다

```css

.list0 {
  background-position-x: 0px;
  background-position-y: 0px;
}

.list1 {
  background-position-x: -100px;
  background-position-y: 0px;
}

.list2 {
  background-position-x: -200px;
  background-position-y: 0px;
}

.list3 {
  background-position-x: -300px;
  background-position-y: 0px;
}

.list4 {
  background-position-x: 0px;
  background-position-y: -100px;
}

...
```

다음과 같이 각 칸에 `class="list"`를 다르게 부여하고 각칸에 맞게 배경을 자연스럽게 마추도록 이동  
<br>

## 완성된 퍼즐 생성 + 무작위로 섞인 퍼즐 생성

<br>

```java script
const container = document.querySelector(".image-container");
const startButton = document.querySelector(".start-button");
const gameText = document.querySelector(".game-text");
const playTime = document.querySelector(".play-time");

const tileCount = 16;
let tiles = [];
let isPlayimg = false;
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
```

기본 변수들 선언

```java script
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
```

`createImageTiles()`는 퍼즐의 각 부분인 `li`태그를 생성하는 함수  
`Array()`는 원하는 길이의 배열을 생성한다  
`fill()`은 배열을 원하는 값으로 모두 채운다, 여기서는 `undefined`  
`forEach`문으로 첫번째 파라미터(배열 값)는 무시하고 두번째 파라미터(배열의 index값)
`i`값은 0부터 15까지 반복하면서 `li`태그를 생성하고 각각 `class, data-index, draggable`을 부여하면서 `tempArray`에 `push`한다

- `Array(n).fill()`활용 법

```java script
function fill_test02(m) {
  return Array(m).fill().map((obj, index) => index +1);
}

console.log(fill_test02(10)) // Array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

- `index + 1` 여기 값을 조절하면 101 ~110의 배열을 만든다던지 자기가 원하는 형태의 배열을 쉽게 만들수 있다

```java script
function fill_test03(m) {
  return Array(m)
    .fill()
    .map((obj, index) => index +1)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
}

console.log(fill_test03(10)) // 55
```

```java script
numbers.reduce((누산값, 현재요소값, 현재요소의index, 현재배열) => {
  return 다음누산값;
}, 초기누산값);
```

- `forEach, map`의 1,2,3번째 파라미터와 `reduce`의 2,3,4번째 파라미터는 같다
- `reduce()` 메서드를 이용해 각 배열의 합을 쉽게 구할수 있다  
  <br>

```java script
function shuffle(array) {
  let index = array.length - 1;
  while (index > 0) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    index--;
  }

  return array;
}
```

배열을 인자로받고 랜덤 인덱스 생성, `while`문으로 랜덤 인덱스의 값과 하나씩 모든 인덱스의 값의 순서를 바꾼다

```java script
let arr = [1,2,3,4];
[arr[1], arr[2]] = [arr[2], arr[1]];

console.log(arr); // [1,3,2,4]
```

- 다음과 같이 간단하게 배열 순서를 바꿀 수 있다

<br>

## drag & drop 이벤트 만들기

```java script
container.addEventListener("dragstart", (e) => {
  if (!isPlaying) return;
  dragged.el = e.target;
  dragged.class = e.target.className;
  dragged.index = [...e.target.parentNode.children].indexOf(e.target);
});
```

게임중아니면 바로 종료  
`dragged`객체에 처음 드래그하는 요소, 클래스, 인덱스를 저장  
`dragged.index`는

![2022-08-27 21;43;20](https://user-images.githubusercontent.com/110578739/187030776-c223ebd7-ad47-496f-8c6c-5f484ca18cb0.PNG)  
![2022-08-27 21;43;55](https://user-images.githubusercontent.com/110578739/187030802-e485c57c-d6e5-419d-a7ee-d8fe712e11b8.PNG)  
다음에서 가져온다 `HTMLCollection` 유사배열이므로 `...`을 사용하여 배열로 만들고 `indexOf`로 해당 `li`태그의 인덱스만을 추출

```java script
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
```

- `drop`이벤트 사용을 위해서는 `dragover`이벤트를 추가, `e.preventDefault();`사용하여 실행되지 않게해야함

`dropeed`객체에 drop하는곳의 요소, 클래스, 인덱스를 저장  
drag, drop이 다른곳에서 발생한 경우에만 함수 시작

- `nextSibling`은 같은 노드레벨에서의 다음 값을 가져온다

드래그한 퍼즐의 다음 값이 존재하면 `originPlace`에 저장
다음 값이 존재하지 않으면(제일 오른쪽 밑 퍼즐 조각인 경우) `previousSibling`을 `originPlace`에 저장

- 드래그한 요소의 위치 지정  
  드래그 시작 요소의 인덱스 > 드랍 하는곳의 인덱스이면  
  드랍요소의 전에 드래그한 요소를 삽입  
  반대이면 드랍요소 후에 드래그한 요소를 삽입

- 드랍한 요소의 위치 지정  
  마지막 퍼즐이면 `originPlace`의 뒤에 삽입  
  아니면 `originPlace`의 전에 삽입

drop 이벤트 발생 후 `checkStatus()`로 완료되었는지 확인  
<br>

## 퍼즐완료 확인과 게임 시작

<br>

```java script
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
```

`filter()`사용, 속성`data-index`의 값과 실제 index를 비교 다른 요소들로만 만든 배열을 반환하여 `unMatchedList`에 저장  
`unMatchedList`이 없으면 완성된것, `gameText`를 표시하고 타이머를 중단  
<br>

```java script
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

startButton.addEventListener("click", () => {
  setGame();
});
```

게임시작시 요소 및 변수들 초기화  
`tiles`변수에 `li`태그의 이미지타일 생성  
`forEach, appednChild`로 `ul`하위에 `li`태그 삽입  
`setTimeout()`사용 5초동안 처음 이미지 보여주기  
이후 초기화 및 셔플된 이미지 퍼즐 보여주기  
`serInterval()`로 타이머 추가

버튼을 눌러서 게임 시작

<br>

<hr>

### 배운 함수, 문법, 객체들

- `fill()`
- `reduce()`
- `dragover, drop` 이벤트
- `nextSibling, previousSibling`
- `before(), after()`
- `style.display="block"` or `"none"`
  <br>

### 그 밖의 배운것

- `drop`이벤트 사용을 위해서는 `dragover`이벤트 등록후 `e.preventDefault()`가 필수다
- 현재 상태를 담는 변수를 만들어 사용
- drag, drop 이벤트가 일어나는 퍼즐 조각같은 여러 정보가 담기는 변수를 객체로 관리한다
