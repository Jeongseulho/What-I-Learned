# 목차

- [목차](#목차)
  - [콜 스택](#콜-스택)
  - [이벤트 루프](#이벤트-루프)
  - [호이스팅](#호이스팅)
  - [클로저](#클로저)
    - [클로저의 활용들](#클로저의-활용들)
  - [스케줄링](#스케줄링)
    - [setTimeout()으로 setInterval()구현하기](#settimeout으로-setinterval구현하기)
    - [setTimdout()활용들](#settimdout활용들)

## 콜 스택

- 콜 스택은 함수를 호출할 때 사용하는 자료구조  
   ![js이론1](https://user-images.githubusercontent.com/110578739/185068730-dd5b619d-824d-4790-a7e0-02b3e5fc6b8f.gif)
  - 이미지 출처 : https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec
- 위 그림의 순서를 보면

1. `main(), console.log(bar(6))` push
2. 1번의 코드를 실행하기 위해 `bar(6)` push
3. 2번의 코드를 실행하기 위해 `foo(18)` push
4. `foo(18)`에서 첫 return 값이 반환(pop)
5. 이후 스택 순서대로 return 값 pop 하기  
   <br>

## 이벤트 루프

- java script의 엔진의 구조  
  ![js이론2](https://user-images.githubusercontent.com/110578739/185072741-1b903fb5-085f-43d0-9435-f1fce9cd825b.svg)
  - 이미지 출처 : https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop
- Heap : 자바 스크립트의 객체를 담은 메모리
- Queue : 비동기 함수들의 콜백함수가 대기 하는곳
  - ex) `setTimeout(), setInterval(), Promises` 등
- 이벤트 루프 : 매 순간 스택이 비어있는지 여부와 큐에 콜백 함수가 기다리고 있는지 여부를 확인 후 비어져있다면 스택에 콜백함수를 쌓는다
- 왜 사용하는가 ? : `DOM, setTimeout()` 등은 web API이다 즉, 브라우저에서 지원하는 기능이다. 자바스크립트 엔진과 다른 쓰레드에서 진행되어 단일 쓰레드인 자바스크립트의 성능보다 더 상승한다
- 즉, 비동기 함수들을 사용하면 성능을 향상시킬 수 있다  
  <br>

## 호이스팅

- 호이스팅 : 함수 선언과 변수 선언을 코드 최상단으로 올리는것(실제로 올리는 것은 아니지만 올리는것과 같은 효과)
  - 함수 호이스팅
    - 함수 선언문은 호이스팅 된다
    - 익명 함수 표현식은 호이스팅 되지 않는다 단, 변수를 함수에 담는 것이므로 변수 호이스팅을 따른다
  - 변수 호이스팅
    - 변수는 선언 + 초기화 + 할당 3단계로 이루어진다
    - 변수는 선언단계에서 모두 호이스팅 된다
    - var : 선언 + 초기화(undefined)가 동시에 이루어지고 후에 코드순서에서 할당된다
    - let, const : 선언 이후 코드순서에서 초기화 + 할당된다

```java script
console.log(name) // output: Uncaught ReferenceError: name is not defined

let name = 'kmj'
```

- 다음과 같이 let, const에서 선언이후 코드순서에서 초기화되기 전까지의 구간을 Temporal Dead Zone(TDZ) 이라고한다  
  <br>

## 클로저

- 클로저 : 반환된 내부함수가 자신이 선언됐을 때의 환경(Lexical environment)인 스코프를 기억하여 자신이 선언됐을 때의 환경(스코프) 밖에서 호출되어도 그 환경(스코프)에 접근할 수 있는 것

```java script
function outerFunc() {
  var x = 10;
  var innerFunc = function () { console.log(x); };
  return innerFunc;
}
/*
  함수 outerFunc를 호출하면 내부 함수 innerFunc가 반환된다.
  그리고 함수 outerFunc의 실행 컨텍스트는 소멸한다.
 */
var inner = outerFunc();
inner(); // 10
```

- 위의 예시에서 `outerFunc()`은 `innerFunc()`를 반환하고 종료되었다(콜 스택에서 제거됨) 그러나 `inner()`에서 종료된 `outerFunc()`의 지역변수 `x`에 접근하여 10이라는 결과를 출력한다

### 클로저의 활용들

<br>

전역변수 사용 억제

_전역변수 사용_

```java script
const btn = document.querySelector('button')

btn.addEventListener('click',handleClick)

let count = 0
function handleCilck(){
  count++
  return count
}
```

_클로저 사용_

```java script
const btn = document.querySelector('button')

btn.addEventListener('click',handleClick())

function handleCilck(){
  let count = 0
  return function (){
    count++
    return count
  }
}
```

<br>

private 변수 생성

```java script
function secret (secretCode) {
    return {
      saySecretCode : function() {
        console.log(secretCode);
      }
    }
  }

  const theSecret = secret('CSS Tricks is amazing');
  theSecret.saySecretCode()
  // 'CSS Tricks is amazing'
```

- `saySecretCode`는 유일하게 기존 `secret()` 함수 밖에서 `secretCode`를 노출하는 함수  
  <br>

현재 상태 기억, 변경 상태 유지

```java script
    var box = document.querySelector('.box');
    var toggleBtn = document.querySelector('.toggle');

    var toggle = (function () {
      var isShow = false;

      // ① 클로저를 반환
      return function () {
        box.style.display = isShow ? 'block' : 'none';
        // ③ 상태 변경
        isShow = !isShow;
      };
    })();

    // ② 이벤트 프로퍼티에 클로저를 할당
    toggleBtn.onclick = toggle;
```

1. 즉시실행함수는 함수를 반환하고 즉시 소멸한다. 즉시실행함수가 반환한 함수는 자신이 생성됐을 때의 렉시컬 환경(Lexical environment)에 속한 변수 isShow를 기억하는 클로저다

2. 이벤트 프로퍼티에서 이벤트 핸들러인 클로저를 제거하지 않는 한 클로저가 기억하는 렉시컬 환경의 변수 isShow는 소멸하지 않는다. 다시 말해 현재 상태를 기억한다

3. 변수 isShow는 클로저에 의해 참조되고 있기 때문에 유효하며 자신의 변경된 최신 상태를 게속해서 유지한다  
   <br>

## 스케줄링

- `setTimeout()`

```java script
let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...);
```

```java script
function sayHi(phrase, who) {
  alert( phrase + ', ' + who);
}

setTimeout(sayHi, 1000, "Hello", "John"); // 1초후 Hello, John 출력
// clearTimeout(timerId); 예약 취소시 사용
```

<br>

- `setInterval()`

```java script
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...);
```

```java script
// 2초마다 반복
let timerId = setInterval(() => alert('tick'), 2000);

// 5초 후에 정지
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
```

<br>

### setTimeout()으로 setInterval()구현하기

- 재귀적 `setTimeout()`

```java script
  const myInterval = () => {
    setTimeout(() => {
      console.log('실행됨')
      myInterval()
    }, 1000)
  }
  myInterval();
```

- 재귀적 `setInterval()` vs `setTimeout()`

```java script
let i = 1;
setInterval(function () {
  func(i);
}, 100);
```

![17](https://user-images.githubusercontent.com/110578739/185303169-c53b3c1c-db9b-47fd-bcc9-aa50612825e5.png)

- `setInterval()`에서 호출 사이 딜레이는 실제 100ms 보다 작다  
  <br>

```java script
let i = 1;
setTimeout(function run() {
  func(i);
  setTimeout(run, 100);
}, 100);
```

![18](https://user-images.githubusercontent.com/110578739/185303174-ac2bbca4-226e-4e4f-b3a6-20f002a235f9.png)

- 새로운 호출이 이전 호출의 끝에서 계획되기 때문에 `setTimeout()`에서 딜레이는 100ms로 고정된다  
  <br>

### setTimdout()활용들

<br>

- `setTimeout(fnc,0)` 또는 `setTimeout(fnc)`

```java script
setTimeout(() => alert("World"));

alert("Hello"); // Hello 먼저 출력 후 World 출력
```

현재코드가 끝난이후 바로 호출하고 싶을때 사용한다

<br>

- split하기

```java script
let i = 0;
let start = Date.now();

function count() { // 1e9까지 ++하는 함수

  if ( i < 1e9 - 1e6) { // i가 이구간까지 계속 스케줄링
    setTimeout(count);
  }

  do {
    i++;
  } while (i % 1e6 != 0); // ie6 배수마다 빠져나와서

  if ( i == 1e9) { // 완료되었는지 확인한다
    alert("Done in " + (Date.now() - start) + 'ms');
  }
  // 이후 스케줄링 되어있던 count()를 다시 실행한다
}

count();
```

이렇게 하면 1e9 까지 카운트하는 큰 작업중에 사용자가 웹과 상호작용할 수 있는 시간을 준다  
<br>

- 렌더링으로 진행 상황 알려주기

```html
<div id="progress"></div>

<script>
  let i = 0;

  function count() {
    // do a piece of the heavy job (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e9) {
      setTimeout(count);
    }
  }

  count();
</script>
```

다음과 같이 진행상황을 innerHTML로 알려줄 수 있다.
