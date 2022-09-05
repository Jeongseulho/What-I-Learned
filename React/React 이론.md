# 목차

- [목차](#목차)

  - [useState의 이해](#useState의-이해)
    - [useState의 사용조건](#useState의-사용조건)
    - [useState와 함수형인자](#useState와-함수형인자)
  - [컴포넌트 반환에서 출력결정방법](#컴포넌트-반환에서-출력결정방법)
  - [컴포넌트 마운트와 언마운트](#컴포넌트-마운트와-언마운트)
  - [styled-components]

    <br>

# useState의 이해

```java script
let value

export useState(initialValue){
  if(value===undefined){
    value initialValue
  }
  const setState = (newValue) => {
    value = newValue
  }
  return [value, setState]
}
```

다음은 useState의 실제 내부 모습이다 여기서 알 수 있는 점은

- `setState`는 사실은 클로저이다

`useState`사용한 `App`컴포넌트에서 일어나는 과정을 요약하면

1. `useState`는 실행될 때 마다 초기값을 전달받지만, 내부적으로 `value`값이 `undefined`인지 확인해서, 최초의 호출에만 초기값을 `value`에 할당하고, 이후 초기값은 사용되지 않는다
2. `value`와 그 값을 재할당하는 `setState` 함수를 배열에 담아 반환
3. `setState` 호출시 전달 받은 값을 react 모듈 상단의 `value`에 할당
4. 이후 컴포넌트 재실행 및 재렌더링
5. 컴포넌트 재 실행시에 `useState`는 내부적으로 `value`값을 확인하고, `undefined`가 아닌 값이 할당되어 있기 때문에 초기값 할당문을 실행하지 않는다
6. `useState`가 현재 시점의 `value와 `setState`를 반환

즉, `setState` 함수는 자신과 함께 반환된 변수를 변경시키는게 아니라(`const`!), 다음 `useState`가 반환할 react 모듈의 `value`를 변경시키고, 컴포넌트를 리렌더링 시키는 역할, 변경된 값은 `useState`가 가져옴

주의점 : `setState` 호출 이후 로직에서도 `state`의 값은 이전과 동일  
변경된 값은 다음 컴포넌트 함수가 실행될 때 `useState`가 가져온다
<br>

## useState의 사용조건

1. 최상위(at the Top Level)에서만 hook을 호출  
   반복문, 조건문 혹은 중첩 함수에서 hook을 호출하면 안 된다

2. 오직 React 함수(컴포넌트) 내에서 hook을 호출해야 한다
   Hook을 일반적인 JavaScript 함수에서 호출하면 안 된다

두 규칙을 따랐을 때 컴포넌트가 렌더링 될 때마다 동일한 순서로 hook이 호출되는 것을 보장  
<br>

## useState와 함수형인자

```java script
const Counter = () => {
const [count, setCount] = useState(0);

const increase1 = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

const increase2 = () => {
    setCount((count) => count + 1);
    setCount((count) => count + 1);
    setCount((count) => count + 1);
  }
}
```

위의 예제에서 increase1 함수의 결과는 3이 아닌 1  
반면 increase2 함수의 결과는 의도한 대로 3

새로운 상태가 바로 이전 상태를 통해 계산되어야 하면 함수를 써야 합니다.

여러 setState 업데이트를 한 번에 묶어서 처리한 후 마지막 값을 통해 state를 결정하는 방식

**예시**

```java script
const onInsertToggle = () => {
setInsertToggle((prev) => !prev);
};
```

set 함수안에 토글 기능 넣기  
<br>

## 컴포넌트 반환에서 출력결정방법

```java script
return(

    <div>
      {insertToggle && <TodoInsert />}
    </div>

);
```

{a && b} 로 둘다 트루면 출력하는 기능 `<TodoInsert>` 는 컴포넌트로 항상 true  
`insertToggle1`의 true or false 값으로 출력할지 말지 결정
