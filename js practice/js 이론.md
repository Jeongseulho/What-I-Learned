# 목차

- [목차](#목차)
  - [콜 스택](#콜-스택)
  - [이벤트 루프](#이벤트-루프)
  - [호이스팅](#호이스팅)
  - [클로저](#클로저)
    - [클로저의 활용들](#클로저의-활용들)
  - [스케줄링](#스케줄링)

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

`saySecretCode`는 유일하게 기존 `secret()` 함수 밖에서 `secretCode`를 노출하는 함수  
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
