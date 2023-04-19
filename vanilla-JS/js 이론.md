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
  - [DOM](#dom)
  - [BOM](#bom)
  - [this](#this)
  - [화살표 함수 쓰면안되는 경우](#화살표-함수-쓰면안되는-경우)
  - [call, apply, bind](#call-apply-bind)
  - [이벤트 전파](#이벤트-전파)
  - [모듈 시스템](#모듈-시스템)
  - [NPM](#npm)
  - [라이브러리와 프레임워크](#라이브러리와-프레임워크)
  - [웹팩](#웹팩)
  - [promise와 async/await](#promise와-asyncawait)
    - [promise의 기본](#promise의-기본)
    - [promise 체이닝](#promise-체이닝)
  - [async](#async)
  - [await](#await)
    - [async와 await의 활용 예시](#async와-await의-활용-예시)
  - [append()와 appendChild()](#append와-appendchild)
    - [append, prepend, before, after 간단 비교](#append-prepend-before-after-간단-비교)
  - [객체 문법](#객체-문법)
  - [Object\[key\] vs Object.key](#objectkey-vs-objectkey)
  - [\&\&, || 연산자](#--연산자)
  - [set과 map 자료구조](#set과-map-자료구조)
    - [set](#set)
    - [map](#map)
  - [iterable와 iterator](#iterable와-iterator)
    - [iterable](#iterable)
    - [iterator](#iterator)
    - [well-formed iterator](#well-formed-iterator)
  - [generator 함수 이해하기](#generator-함수-이해하기)

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

다음과 같이 진행상황을 innerHTML로 알려줄 수 있다  
<br>

## DOM

- DOM(Document object Model) : java script로 웹문서를 제어하기 위해 웹문서를 객체화 한것

<img width="524" alt="22" src="https://user-images.githubusercontent.com/110578739/185735313-c5a7da74-c85b-4bfd-b73f-51b61b5f7433.png">

- DOM은 다음과 같은 트리구조를 하고있다
- 최상위 노드인 `document`의 여러 메소드들을 사용하여 제어가능  
  <br>

## BOM

- BOM(Browser Object Model) : java script로 브라우저를 제어하기 위해 브라우저를 객체화 한것
- DOM과 마찬가지 여러 내장 메소드들을 사용하여 브라우저를 제어가능
- 모든 객체가 소속된 객체인 `window`를 사용하여 제어가능
- ex) `window.alert` (기존 `alert`은 원래 window를 생략하여 사용한것), `window.document` (DOM트리 최상위노드인 웹문서를 가르킨다) <br>

## this

- `this`는 자신이 포함되어 있는 객체를 가르킨다, 호출방식에 따라 값이 달라진다 (deafult 로 `window`를 가르킨다)

```java script
function myFn () {
  return this;
}
myFn(); // window 객체 출력
```

`this`는 객체를 가르키기 때문에 다음과 같이 호출시 가르킬 객체가 없어 기본값 `window`객체를 가르킨다  
<br>

```java script
function MyFn() {
  this.title = 'Hello World!';
  return this;
}
// new 연산자를 이용해서 새로운 객체를 얻는다.
const myfn = new MyFn();
myfn // MyFn {title: 'Hello World!'}
```

단, `new`를 사용하여 객체를 만들면 해당 객체를 가르킨다  
<br>

```java script
const fn = {
  title: 'Hello World!',
  showTitle() {
    console.log(this.title);
  }
};
fn.showTitle(); // 'Hello World!'
```

객체안의 함수인 메소드에서 `this`는 객체 fn을 참조한다  
<br>

```java script
const fn = {
  title: 'Hello World!',
  tags: [1, 2, 3, 4],
  showTags() {
    this.tags.forEach(function(tag) {
      console.log(tag);
      console.log(this); // window
    });
  }
}
fn.showTags();
// 1
// window 객체 출력
// 2
// window 객체 출력
// 3
// window 객체 출력
// 4
// window 객체 출력
```

메소드에서 `this.tags`은 fn을 참조하지만, `console.log(this)`에서는 일반함수인 `forEach`문의 내부이므로 `window`를 가르킨다  
단, 이경우

```java script
showTags() {
    this.tags.forEach(function(tag) {
      console.log(tag);
      console.log(this); // fn
    }, this); // 여기는 일반 함수 바깥, fn 객체를 참조할 수 있다.
}
```

`forEach`문의 콜백함수 다음에 인자를 추가한다  
이 인자는 `forEach`문내에서 `this`가 무엇을 참조하게 할건지 알려준다 (`forEach`문 바깥, fn객체내에서 `this`를 썼으므로 fn객체를 가르킨다)  
<br>

```java script
const fn = {
  title: 'Hello World!',
  tags: [1, 2, 3, 4],
  showTags() {
    this.tags.forEach((tag) => {
      console.log(tag);
      console.log(this); // fn
    });
  }
}
fn.showTags();
// 1
// fn 객체 출력
// 2
// fn 객체 출력
// 3
// fn 객체 출력
// 4
// fn 객체 출력
```

화살표함수는 `this`에 바인딩할 객체가 정적으로 결정된다  
상위 환경에서 `this`의 객체를 참조한다 (`call,apply,bind`를 사용할 수 없다)  
<br>

## 화살표 함수 쓰면안되는 경우

- 화살표함수를 쓰는 가장 큰 이유는 위의 `this`의 바인딩 때문이다
- 화살표 함수 쓰면 안되는 경우  
  <br>

1. 메소드

```java script
   const cat = {
  name: 'meow',
  callName: () => console.log(this);
}

cat.callName();	// window 객체
```

다음과 같이 화살표 함수는 `this`를 상위 환경에서 찾으므로 일반적은 메소드에서는 `window`객체를 가르킨다  
<br>

2. 생성자 함수

```java script
const Foo = () => {};
const foo = new Foo()	// TypeError: Foo is not a constructor
```

<br>

3. `addEventListener`의 콜백함수

```java script
const button = document.getElementById('myButton');

button.addEventListener('click', () => {
  console.log(this);	// Window
  this.innerHTML = 'clicked';
});

button.addEventListener('click', function() {
   console.log(this);	// button 엘리먼트
   this.innerHTML = 'clicked';
});
```

`addEventListener`의 콜백함수에서는 `this`에 해당 이벤트 리스너가 호출된 엘리먼트가 바인딩 되도록 정의  
이처럼 이미 `this`의 값이 정해져있는 콜백함수의 경우, 화살표 함수를 사용하면 기존 바인딩 값이 사라지고 상위 스코프가 바인딩되기 때문에 의도했던대로 동작하지 않을 수 있다  
물론 상위 스코프의 속성들을 쓰려고 의도한 경우라면 사용가능 <br>

## call, apply, bind

- `call, apply, bind`는 `this`의 값을 정해주면서 함수를 실행 한다
- `call, apply, bind`의 사용법은 다음과 같다

```java script
function foo(a, b, c) {
  console.log(a + b + c);
};

foo(1, 2, 3); // 6

foo.call(null, 1, 2, 3); // 6

foo.apply(null, [1, 2, 3]); // 6

const a = foo.bind(null, 1, 2, 3);
a(); //6
```

여기서 `null` 자리는 `this`에 전달할 객체를 넣고 이후 함수에 전달할 인자를 넣으면 된다

```java script
let person1 = {
    name: 'Jo'
};

let person2 = {
    name: 'Kim',
    study: function() {
        console.log(this.name + '이/가 공부를 하고 있습니다.');
    }
};

person2.study(); // Kim이/가 공부를 하고 있습니다.

// call()
person2.study.call(person1); // Jo이/가 공부를 하고 있습니다.

person2.study.apply(person1); // Jo이/가 공부를 하고 있습니다.

let student = person2.study.bind(person1);
student(); // Jo이/가 공부를 하고 있습니다.
```

- `call, apply, bind`의 차이점만 구별하면
  - call : 함수 인자를 쉼표로 구분해 받는다
  - apply : 함수 인자를 배열로 받는다
  - bind : call과 같지만 함수를 실행하지 않고 해당 함수를 반환만 한다  
    <br>

## 이벤트 전파

- 상위태그에 모두 이벤트를 등록했을때 하위태그를 누르면? 원하는 하위태그뿐만 아니라 상위태그에도 이벤트가 시작된다 이를 이벤트 전파라고 한다
- 이벤트 전파에는 2종류가 있다 ![23](https://user-images.githubusercontent.com/110578739/185742700-9f8849b2-fe1b-4456-96c8-df6564728ac4.jpg) 다음과 같이 하위태그로부터 시작해서 올라가면 Bubbling 상위 태그로부터 내려가면 Capturing 주로 쓰는 `addEventListener`는 default로 Bubbling이다  
  <br>

이벤트 전파 막기

- `event.stopPropagation()`을 `addEventListener`의 콜백함수 안에 사용하면 해당 요소 까지만 이벤트가 시작하고 이후 전파를 막는다
- `event.preventDefault()`를 마찬가지로 콜백함수 안에 사용하면 해당 요소의 이벤트가 동작하지 않는다 (a 태그에 사용하면 기본적인 링크 기능이 없어짐)  
  <br>

이벤트 위임 하기

```java script
  const items = document.querySelector('ul');

  items.addEventListener('click', (event) => {
    const item = event.target.classList[0];

    if(item==='item'){
      event.target.style.background = 'blue';
    }
  })
```

이렇게 classList에 item이 있는 경우에만 실행을 하게 할 수 있다  
<br>

## 모듈 시스템

- `<script src="">`을 사용하여 js파일을 여러개 불러올때 각 js파일의 전역 스코프들은 서로 공유하기 때문에 문제가 생긴다 (변수명이 같으면 같은것으로 간주함)
- 이런 문제를 해결하기 위해서 모듈 시스템을 사용
- 다른 js파일들에 있는 코드들을 모듈화 하여 재사용 가능
- 여기서는 ES Module에대해 정리  
  <br>

- `named export`

```java script
export let name1;
export const name2;
export var name3;
export function name4 () {}
```

변수, 함수 선언 전에 `export`를 사용하기  
<br>

```java script
const var1;
let var2;
var var3;
export { var1, var2, var3 }
```

한번에 여러개 `export`하기  
<br>

- `default export` ( js파일에 1번만 사용가능 )

```java script
export default fnc;
```

변수, 함수 선언후 따로 `export`사용하기  
<br>

```java script
export default {
  fnc;
  var1;
  var2;
}
```

마찬가지 한번에 여러개 내보내기  
<br>

- `import`

```java script
import var1 from "module-name"; // var1을 가져온다
import * as name from "module-name"; // 모든걸 가져온다 name (별칭사용)
// name.var1로 사용가능
import { member1 , member2 } from "module-name";
// member1, member2 가져온다
```

<br>

- Module type

```hmtl
<script type="module" src="index.mjs">
```

`type=”module”`을 사용하면 자바스크립트 파일은 모듈로 동작하게 된다  
 해당 파일에서는 `import`와 `export`를 사용할 수 있는데, 파일마다 독립적인 스코프를 갖게 되고, 각각의 mjs 파일에 있는 `window` 객체는 서로 공유되지 않는다  
 <br>

## NPM

- NPM ( Node Package Manager ) : 패키지( 모듈을 모아둔것 )를 다운받게 도와주는 매니저
- NPM을 사용하여 React와 같은 라이브러리나 express같은 프레임워크를 다운받아 사용할 수 있다
- NPM 명령어
  - `npm -version` : 설치 후 설치가 잘 되었나 확인하기 위해 사용하는 버전 확인 명령
  - `npm init` : Node.js 프로젝트를 시작할때 `package.json`을 생성해 주는 명령
    - `package.json` : 프로젝트의 정보와 특히 프로젝트가 의존하고 있는(설치한) 패키지(모듈)에 대한 정보가 저장되어 있는 파일
  - `npm install` 패키지명
  - `npm update` 패키지명
  - `npm cache clean` + `npm rebuild` : `npm cache clean` 명령은 npm의 cache를 지우는 명령이고 `npm rebuild` 명령은 npm을 새롭게 재설치 하는 명령, 주로 npm 명령어가 안 먹히거나 기타 잡다한 버그가 생겼을 시 해결하기 위한 조치 방법  
    <br>

## 라이브러리와 프레임워크

- 라이브러리(React)와 프레임워크(Express)는 개발에 도움을 주기위한 재사용 가능한 코드의 모음
- 프레임워크와 라이브러리의 차이점은 "제어 흐름"의 권한이 어디에 있는가

  - 라이브러리를 사용할 때 사용자는 애플리케이션 코드의 흐름을 직접 제어  
    개발 시 필요한 기능이 있을 경우 능동적으로 라이브러리를 호출하여 사용하거나 기존에 구성된 함수나 코드를 가져다 써야 한다

  - 프레임워크는 애플리케이션의 코드가 프레임워크에 의해 사용  
     애플리케이션 코드는 프레임워크가 짜 놓은 틀에서 수동적으로 동작하기 때문에 제어의 흐름은 프레임워크가 가지고 있고 사용자가 그 안에 필요한 코드를 작성  
    <br>

## 웹팩

- 웹팩 : 애플리케이션에 필요한 모든 파일(모듈)을 병합하고 압축해서 하나의 결과물(번들)을 생성하는 도구
- 사용 이유 : 웹 어플리케이션을 실행시킨다면 브라우저는 javascript와 images, css 등의 파일을 읽어들인다  
  웹팩을 사용해서 많은 파일들(모듈)을 병합하고 압축해서 하나의 결과물(번들)로 만들면, 파일의 수와 크기가 줄어들게 된다
- 웹팩 핵심 요소
  1. Entry : 번들링을 시작하기 위한 최초 진입점  
     웹팩은 이 진입점으로부터 의존적인 모듈을 전부 찾아낸다  
     이때 모듈 간의 의존 관계로 생기는 구조를 디펜던시 그래프(Dependency Graph)라고 한다
  2. Output : 의존되어 있는 모든 모듈을 하나로 묶어 하나의 결과물로 만들었다  
     이 결과물이 위치하는 경로를 아웃풋이라고 한다
  3. Loader : 웹팩은 자바스크립트 밖에 읽지 못한다  
     그래서 HTML, CSS, Images, 폰트 등을 웹팩이 읽을 수 있게 변환해줘야 하는데, 이 역할을 하는 게 바로 로더
  4. Plugin : 로더가 파일(모듈)을 해석하고 변환하는 과정에 필요한다면, 플러그인은 결과물(번들)에 추가적인 처리를 하고싶을 때 필요하다

<br>

## promise와 async/await

### promise의 기본

```java script
const promise1 = new Promise((resolve, reject) => {
  resolve();
});
promise1
  .then(() => { // resolve();호출 되어서 .then 메소드 실행
    console.log("then!");
  })
  .catch(() => {
    console.log("catch!"); // reject();호출 되면 .catch 메소드 실행
  });
```

- `Promise()`는 생성자 함수이다
- `new Promise`로 `promise`형태의 객체를 만든다
- 이 생성자는 함수를 인자로 받는다, 그리고 이 함수 인자는 `reslove`와 `reject`라는 2개의 함수형 파라미터를 가진다  
  <br>

```java script
function startAsync(age) {
  return new Promise((resolve, reject) => {
    if (age > 20) resolve(`${age} success`);
    else reject(new Error(`${age} is not over 20`));
  });
}
```

- 다음과 같이 함수를 만들고 `return`값으로 `new Promise`를 사용할 수 있다
- 또한, age>20 조건에서 `resolve()` 실행하고 해당 결과를 담아 보내고
- else 조건에서 `reject()` 실행하고 에러 이유를 담아 보낸다  
  **여기서 `reject()`안에는 `error`객체를 보내야한다**

```java script
setTimeout(() => {
  const promise1 = startAsync(25);
  promise1
    .then((value) => {  // 25 success
      console.log(value);
    })
    .catch((error) => {
      console.error(error);
    });
  const promise2 = startAsync(15);
  promise2
    .then((value) => {
      console.log(value);
    })
    .catch((error) => {  // Error: 15 is not over 20
      console.error(error);
    });
}, 1000);
```

- `resolve()`호출시 `then()`메소드를 실행한다 여기서 `then(result=>{...})`은 함수를 인자로받고 이 함수의 파라미터는 `resolve(result)`안에 담긴 결과이다
- `reject()`호출시 `catch()`메소드를 실행, `catch(error_reason=>{...})`와 같이 함수를 인자로 받고 이 함수의 파라미터는 `new Error(error_reason)`객체에 담긴 에러 메세지이다

```java script
new Promise((resolve, reject) => {
  setTimeout(() => resolve("결과"), 2000)
})
  .finally(() => alert("프라미스가 준비되었습니다."))
  .then(result => alert(result));
```

- `finally(fnc)`은 성공,실패 상관 없이 프로미스 처리이후 실행된다
- `fnc`는 인자가 없는 함수이다  
  <br>

### promise 체이닝

```java script
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```

`then(...).then(...).then(...)`와 같이 `then()`메소드를 이어가면서 사용할 수 있다 `then()`은 항상 `promise`객체를 반환한다 <br>

## async

- `new Promise`를 반환하는 함수를 `async`를 사용하여 똑같이 만들 수 있다

```java script
// 기존
// function startAsync(age) {
//  return new Promise((resolve, reject) => {
//    if (age > 20) resolve(`${age} success`);
//   else reject(new Error("Something went wrong"));
//  });
// }

async function startAsync(age) {
  if (age > 20) return `${age} success`;
  // return Promise.solve(`${age} success`); 와 같다
  else throw new Error(`${age} is not over 20`);
}
```

1. 함수에 `async` 키워드를 추가
2. `new Promise...` 부분을 삭제
3. `resolve(value);` 부분을 `return value;` 로 수정
4. `reject(new Error(…));` 부분을 `throw new Error(…);` 로 수정

- `async` 특징
  - `async` 함수의 리턴 값은 무조건 `promise` 객체
  - 리턴 값이 `promise`값이 아니더라도 `promise`로 만든다
- `async` 함수를 실행시킨 뒤 `then` 과 `catch` 를 활용하여 흐름을 제어해야 함

## await

```java script
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!"), 1000)
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

  alert(result); // "완료!"
}

f();
```

- `await`은 `async`로 선언된 함수 내에서만 사용가능 하다
- `awiat`뒤에는 `promise`타입 또는 반환값이 `promise`타입인 함수만 올 수 있다
- `await`은 해당 함수를 호출시키며, 다 이행될때까지 기다린다

### async와 await의 활용 예시

```java script
function logName() {
  var user = fetchUser('domain.com/users/1');
  if (user.id === 1) {
    console.log(user.name);
  }
}
```

- `fechUser()`는 비동기적인 메소드이며 코드 실행 순서를 보장받지 못한다

```java script
function logName() {
  var user = fetchUser('domain.com/users/1', function(user) {
    if (user.id === 1) {
      console.log(user.name);
    }
  });
}
```

- 다음과 같이 콜백함수를 사용하면 코드 실행 순서를 보장받는다

```java scipt
async function logName() {
  var user = await fetchUser('domain.com/users/1');
  if (user.id === 1) {
    console.log(user.name);
  }
}
```

- `async, await`를 사용하면 더 직관적이고 간결하게 코드 실행 순서를 정할 수 있다 <br>

## append()와 appendChild()

append() 특징

```java script
const parent = document.createElement('div');
const child = document.createElement('p');

parent.append(child);
// <div><p></p></div>
```

- 노드객체 삽입가능

```java script
const parent = document.createElement('div');
parent.append('append 예시');
// <div>append 예시</div>
```

- 문자열 삽입가능

```java script
const div = document.createElement('div');
const span = document.createElement('span');
const p = document.createElement('p');

document.body.append(div, 'hello', span, p);
// result
<body>
  <div></div>
  hello
  <span></span>
  <p></p>
</body>
```

- 여러개 자식요소 한번에 가능

```java script
const div = document.createElement('div');
const span = document.createElement('span');
const p = document.createElement('p');

console.log(document.body.append(div, 'hello', span, p)); // undefined
```

- 반환값 없음  
  <br>

appendChild() 특징

```java script
const parent = document.createElement('div');
const child = document.createElement('p');
parent.appendChild(child);
// <div><p></p></div>
```

- 노드객체 사용가능

```java script
const parent = document.createElement('div');

parent.appendChild('텍스트');
// Uncaught TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'
```

- 문자열 불가능

```java script
const div = document.createElement('div');
const span = document.createElement('span');

console.log(document.body.appendChild(div)); // div(Node object)
```

- 반환값 존재  
  <br>

### append, prepend, before, after 간단 비교

```html
<div id="testDiv">
  <div id="childDiv"></div>
</div>
```

기존상태

- append()

```java script
testDiv.append(insertDiv)
// <div id="testDiv">
//   <div id="childDiv"></div>
//   <div><div>
// </div>
```

- prepend()

```java script
testDiv.prepend(insertDiv)
// <div id="testDiv">
//   <div><div>
//   <div id="childDiv"></div>
// </div>
```

- before()

```java script
testDiv.before(insertDiv)
// <div><div>
// <div id="testDiv">
//   <div id="childDiv"></div>
// </div>
```

- after()

```java script
testDiv.before(insertDiv)
// <div id="testDiv">
//   <div id="childDiv"></div>
// </div>
// <div><div>
```

## 객체 문법

```java script
let name = "John";
let age = 20;

let person= {
      name,  // name:name
      age    // age:age
}
```

- 객체 키값과 밸류에 넣을 변수가 이름이 같으면 생략 가능

```java script
let name = "John";

let person= {
      name,  // name:name
      printName(){    // printName : function(){alert(name)}
        alert(name)
      }
}
```

- 객체내 메소드 만들때 다음과 같이 축약 가능  
  <br>

## Object[key] vs Object.key

```java script
var a = {
  b  : 1,
  c  : 2
}
for (key in a) {
 console.log(a.key) // undefined, undefined
 console.log(a[key])// 1,2
}
```

- `a.key`에서 key는 그자체의 이름 변수x
- `a[key]`에서 key는 변수로 접근 가능

## &&, || 연산자

- && : 왼쪽부터 시작하여 첫번째 falsy 반환 / all truthy라면 마지막 값 반환

```java script
// 첫 번째 피연산자가 truthy이면,
// AND는 두 번째 피연산자를 반환합니다.
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// 첫 번째 피연산자가 falsy이면,
// AND는 첫 번째 피연산자를 반환하고, 두 번째 피연산자는 무시합니다.
alert( null && 5 ); // null
alert( 0 && "아무거나 와도 상관없습니다." ); // 0
```

- || : 왼쪽부터 시작하여 첫번째 truthy 반환 / all falsy라면 마지막 값 반환

```java script
alert( 1 || 0 ); // 1 (1은 truthy임)

alert( null || 1 ); // 1 (1은 truthy임)
alert( null || 0 || 1 ); // 1 (1은 truthy임)

alert( undefined || null || 0 ); // 0 (모두 falsy이므로, 마지막 값을 반환함)
```

출처 : https://ko.javascript.info/logical-operators  
<br>

## set과 map 자료구조

### set

- 생성 방법

```java script
const set = new Set();
console.log(set); // Set(0) {}

const set1 = new Set([1, 2, 3, 3]);
console.log(set1); // Set(3) {1, 2, 3}

const set2 = new Set('hello');
console.log(set2); // Set(4) {"h", "e", "l", "o"}
```

- 중복된 값을 허용하지 않음

```java script
// Set을 사용한 배열의 중복 요소 제거
const uniq = array => [...new Set(array)];
console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [2, 1, 3, 4]
```

- 수학의 집합과 동일(차집합, 교집합, 합집합, 부분집합 메소드 제공)

```java script
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA와 setB의 교집합
console.log(setA.intersection(setB)); // Set(2) {2, 4}
// setB와 setA의 교집합
console.log(setB.intersection(setA)); // Set(2) {2, 4}

// setA와 setB의 합집합
console.log(setA.union(setB)); // Set(4) {1, 2, 3, 4}
// setB와 setA의 합집합
console.log(setB.union(setA)); // Set(4) {2, 4, 1, 3}

// setA에 대한 setB의 차집합
console.log(setA.difference(setB)); // Set(2) {1, 3}
// setB에 대한 setA의 차집합
console.log(setB.difference(setA)); // Set(0) {}

// setA가 setB의 상위 집합인지 확인한다.
console.log(setA.isSuperset(setB)); // true
// setB가 setA의 상위 집합인지 확인한다.
console.log(setB.isSuperset(setA)); // false
```

- 순서가 없음(인덱스로 접근 불가), 순회가능

```java script
const set = new Set([1, 2, 3]);

// Set 객체는 Set.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
console.log(Symbol.iterator in set); // true

// 이터러블인 Set 객체는 for...of 문으로 순회할 수 있다.
for (const value of set) {
  console.log(value); // 1 2 3
}

// 이터러블인 Set 객체는 forEach 메서드를 갖는다.
// v : 요소값, v2 : 요소값, set : Set 객체 자신
set.forEach((v, v2, set) => console.log(v, v2, set));
/*
1 1 Set(3) {1, 2, 3}
2 2 Set(3) {1, 2, 3}
3 3 Set(3) {1, 2, 3}
*/

// 이터러블인 Set 객체는 스프레드 문법의 대상이 될 수 있다.
console.log([...set]); // [1, 2, 3]

// 이터러블인 Set 객체는 배열 디스트럭처링 할당의 대상이 될 수 있다.
const [a, ...rest] = [...set];
console.log(a, rest); // 1, [2, 3]
```

### map

map은 object와 비슷한 key-value 구조를 가지고 있음

- map객체 생성 방법

```java script
const map1 = new Map([['key1', 'value1'], ['key2', 'value2']]);
console.log(map1); // Map(2) {"key1" => "value1", "key2" => "value2"}
const map2 = new Map([1, 2]); // TypeError: Iterator value 1 is not an entry object
const map = new Map([['key1', 'value1'], ['key1', 'value2']]);
console.log(map); // Map(1) {"key1" => "value2"}
```

- obejct는 key가 string이어야 하지만 map은 key가 string이 아니어도 됨

```java script
const map = new Map();

const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

// 객체도 키로 사용할 수 있다.
map
  .set(lee, 'developer')
  .set(kim, 'designer');

console.log(map);
// Map(2) { {name: "Lee"} => "developer", {name: "Kim"} => "designer" }
```

- object는 이터러블이 아니지만 map은 이터러블
- object에서는 순서를 유지 하지 않지만 map은 순서를 유지
- forEach 메서드를 사용하여 순회 가능

```java script
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

map.forEach((v, k, map) => console.log(v, k, map));
/*
developer {name: "Lee"} Map(2) {
  {name: "Lee"} => "developer",
  {name: "Kim"} => "designer"
}
designer {name: "Kim"} Map(2) {
  {name: "Lee"} => "developer",
  {name: "Kim"} => "designer"
}
*/

// Map 객체는 Map.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
console.log(Symbol.iterator in map); // true

// 이터러블인 Map 객체는 for...of 문으로 순회할 수 있다.
for (const entry of map) {
  console.log(entry); // [{name: "Lee"}, "developer"]  [{name: "Kim"}, "designer"]
}

// 이터러블인 Map 객체는 스프레드 문법의 대상이 될 수 있다.
console.log([...map]);
// [[{name: "Lee"}, "developer"], [{name: "Kim"}, "designer"]]

// 이터러블인 Map 객체는 배열 디스트럭처링 할당의 대상이 될 수 있다.
const [a, b] = map;
console.log(a, b); // [{name: "Lee"}, "developer"]  [{name: "Kim"}, "designer"]

// Map.prototype.keys는 Map 객체에서 요소키를 값으로 갖는 이터레이터를 반환한다.
for (const key of map.keys()) {
  console.log(key); // {name: "Lee"} {name: "Kim"}
}

// Map.prototype.values는 Map 객체에서 요소값을 값으로 갖는 이터레이터를 반환한다.
for (const value of map.values()) {
  console.log(value); // developer designer
}

// Map.prototype.entries는 Map 객체에서 요소키와 요소값을 값으로 갖는 이터레이터를 반환한다.
for (const entry of map.entries()) {
  console.log(entry); // [{name: "Lee"}, "developer"]  [{name: "Kim"}, "designer"]
}
```

## iterable와 iterator

### iterable

- 반복 가능한 객체(set, map, array, string 등)
  - `for of, spread, destructuring`과 같은 반복문을 사용할 수 있다
- `[Symbol.iterator]` 메소드가 존재해야한다
- `[Symbol.iterator]` 메소드는 `iterator`객체를 반환 해야한다

```java script
const iterable = {
  [Symbol.iterator]() {
    return someIteratorObject
  }
  ...
}
```

### iterator

- 객체에 `next` 메소드가 존재해야한다
- `next` 메소드는 `iterator result` 객체를 반환해야한다
- `iterator result`객체는 `value`와 `done`프로퍼티를 갖는다
  - `value`는 반복의 현재 값
  - `done`은 반복이 끝났는지를 나타내는 boolean 값
- 이전 `next`메소드가 반환한 `iterator result`객체의 `done`프로퍼티가 `true`이면 `next`메소드의 반환 값의 `done`프로퍼티는 `true`여야한다

```java script
const iterable = {
  [Symbol.iterator]() {
    let i = 0
    // iterator 객체
    return {
      next() {
        while(i < 10) { // i가 10이 될 때까지 반복기 수행
          return { value: i++, done: false }
        }
        return { done: true } // i 가 10이 되면 반복 종료(value 값 생략 가능)
      }
    }
  }
}
```

### well-formed iterator

- `iterable`이면서 `iterator`인 객체

```java script
const wellFormedIterator = { // Iterator 객체
  next() {
    return someIteratorResultObject
  }

  // Iterator 객체에 Symbol.iterator 메서드가 존재하며,
  // 해당 메서드가 자기 자신(iterator)을 반환한다.
  [Symbol.iterator]() {
    return this
  }
  ...
}
```

출처 : https://armadillo-dev.github.io/javascript/what-is-iterable-and-iterator/ <br>

## generator 함수 이해하기

- `well-formed iterator`로 평가되는 `generator 객체`를 반환하는 함수
- `function` 키워드 뒤에 `*`를 붙여서 선언한다
- yield
  - 반환된 `generator 객체`의 `next`메소드를 호출할 때마다 `yield`표현식까지 실행된다

```java script
function* someGeneratorFunction() {
  console.log('1번 실행')
  yield 1
  console.log('2번 실행')
  yield 2
  console.log('3번 실행')
  yield 3
}

const iter = someGeneratorFunction()

iter.next() // 1번 실행, { value: 1, done: false }

for (num of iter) console.log(num) // 2번 실행, 2, 3번 실행, 3
```

- yield\*
  - `yield*`표현식은 다른 `generator 함수`를 호출하고, 그 결과를 반환한다
  - 중첩된 `generator 함수`를 호출할 때 유용하다

```java script
function* someGeneratorFunction() {
  const iter = otherGeneratorFunction()
  yield 0
  yield* iter
}

function* otherGeneratorFunction() {
  yield 1
  yield 2
}

const gen = someGeneratorFunction()
gen.next() // { value: 0, done: false }
gen.next() // { value: 1, done: false }
gen.next() // { value: 2, done: false }, 여기서는 아직 done이 아니다
gen.next() // { value: undefined, done: true }, 여기서 done이된다
```

- return
  - `next`메소드로 `return`차례가 되면 `return`표현식의 결과를 반환한다
  - `done`프로퍼티는 `true`가 되므로 더이상 진행되지 않는다
  - `for of`문에서는 `return`표현식 전까지만 실행된다

```java script
function* gen() {
  yield 1
  return 2
  yield 3
}

const iter = gen()
iter.next() // { value: 1, done: false }
iter.next() // { value: 2, done: true }
iter.next() // { value: undefined, done: true }

const iter2 = gen()
for (let num of iter2) console.log(num) // 1 <-- 2는 출력되지 않는다.
```

- throw
  - `next`메소드로 `throw`차례가 되면 에러가 발생한다

```java script
function* gen() {
  yield 1
  throw '에러 발생!!'
  yield 3
}

const iter = gen()
iter.next() // { value: 1, done: false }
iter.next() // Uncaught 에러 발생!!
iter.next() // { value: undefined, done: true }
```

- `generator함수` 안/밖 정보 주고받기

```java script
function* gen() {
  // 질문을 제너레이터 밖 코드에 던지고 답을 기다립니다.
  let result = yield "2 + 2 = ?"; // (*)

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- yield는 value를 반환합니다.

generator.next(4); // --> 결과를 제너레이터 안으로 전달합니다.
// 이후 alert(4)가 실행됩니다.

```

```java script
function* gen() {
  try {
    let result = yield "2 + 2 = ?"; // 질문을 밖으로 던집니다.

    alert("위에서 에러가 던져졌기 때문에 실행 흐름은 여기까지 다다르지 못합니다.");
  } catch(e) {
    alert(e); // 에러 출력
  }
}

let generator = gen();

let question = generator.next().value; // 질문을 받습니다.

generator.throw(new Error("데이터베이스에서 답을 찾지 못했습니다.")); // 에러를 제너레이터 안으로 던집니다.
```

출처 : https://armadillo-dev.github.io/javascript/what-is-generator/
