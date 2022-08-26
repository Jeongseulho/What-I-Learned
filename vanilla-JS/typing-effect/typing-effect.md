# 타이핑 효과 페이지 만들기

![2022-08-26 19;56;42](https://user-images.githubusercontent.com/110578739/186889294-f71eafa1-98f5-4e16-9f58-f3f602f16403.gif)

<br>

## 깜빡이는 커서 효과 만들기

<br>

```html
<p id="dynamic" class="lg-text"></p>
```

해당 타이핑 효과가 생기는 태그

```css
#dynamic::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: -10px;
  width: 4px;
  height: 100%;
  background-color: white;
}

#dynamic.active::after {
  display: none;
}
```

css에서 `::after`를 사용하여 커서를 생성  
`class="active"`일때는 커서가 사라지는 2가지 경우 구현

```java script
let target = document.querySelector("#dynamic");

function blink() {
  target.classList.toggle("active");
}
setInterval(blink, 500);
```

js에서 해당 태그의 `class="active"`를 0.5초마다 toggle로 반복

<br>

## 타이핑 효과 구현

타이핑 효과의 기능을 정리하면

1. 5가지 문장중 랜덤으로 한가지 문장을 정한다
2. 한글자씩 글자가 출력된다
3. 일정시간 후 글자를 다 지우고 1번을 반복

```java script
function randomString() {
  let stringArr = [
    "Learn to HTML",
    "Learn to CSS",
    "Learn to Java Script",
    "Learn to PYTHON",
    "Learn to RUBY",
  ];
  let selectString = stringArr[Math.floor(Math.random() * stringArr.length)];
  let selectStringArr = selectString.split("");

  return selectStringArr;
}
```

1번 기능을 수행한다 주의할점은 `split("")`을 사용하여 문자열을 배열로 바꾼다  
<br>

```java script
function dynamic(randomArr) {
  if (randomArr.length > 0) {
    target.textContent += randomArr.shift();
    setTimeout(() => {
      dynamic(randomArr);
    }, 100);
  } else {
    setTimeout(resetTyping, 3000);
  }
}
```

2번기능을 수행한다  
랜덤 문장을 받아서 `shift`로 1글자씩 삭제와 동시에 반환하며 `target`에 넣는다  
`setTimeout`을 써서 0.1초뒤에 다시 반복한다( 재귀함수 )  
문장에 문자가없으면 3번기능으로 넘어간다  
<br>

```java script
function resetTyping() {
  target.textContent = "";
  dynamic(randomString());
}
```

화면에 문자를 다 없애고 1번기능을 호출한다

<br>

<hr>

### 배운 함수, 문법, 객체들

- `split("")`
- `shift()`
  <br>

### 그 밖의 배운것

- 반복을 사용해야 할 때 재귀함수를 사용한 반복도 고려한다
- css에서 가상요소, 가상선택자를 사용하여 간단하게 페이지를 동적을 만들 수 있다
