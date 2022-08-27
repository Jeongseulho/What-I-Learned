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
