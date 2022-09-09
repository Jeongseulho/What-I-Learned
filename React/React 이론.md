# 목차

- [목차](#목차)

  - [React가 가상DOM을 사용하는 절차](#React가-가상DOM을-사용하는-절차)
  - [useState의 이해](#useState의-이해)
    - [useState의 사용조건](#useState의-사용조건)
    - [useState와 함수형인자](#useState와-함수형인자)
  - [컴포넌트 반환에서 출력결정방법](#컴포넌트-반환에서-출력결정방법)
  - [컴포넌트 마운트와 언마운트](#컴포넌트-마운트와-언마운트)
  - [React 렌더링 성능 최적화 방법](#React-렌더링-성능-최적화-방법)

    <br>

# React가 가상DOM을 사용하는 절차

1. 특정 컴포넌트에서 setState 호출 등의 이유로 컴포넌트 상태가 변하면 해당 컴포넌트의 shouldComponentUpdate 함수를 실행한다. 그리고 이 함수가 true를 반환하면 render 함수를 실행한다
2. 상태가 변한 컴포넌트를 루트 노드로 해서 깊이 우선 탐색 방식으로 각 자식 컴포넌트의 shouldComponentUpdate 함수와 render 함수를 실행한다.
3. 이렇게 render 함수를 실행하여 얻은 새로운 Virtual DOM을 실제 DOM과 동기화되어 있는 기존 Virtual DOM과 비교해서 변경 사항을 파악한다(reconcilation)
4. 그리고 실제로 변경된 부분만 DOM API를 호출하여 DOM에 반영하면, 브라우저가 변경 사항이 반영된 DOM과 CSSOM으로 새로운 Render Tree를 생성해서 화면을 다시 그린다.

요약하면

1. 데이터가 업데이트 되면 Virtual DOM에 리렌더링
2. 이전 Virtual DOM에 있던 내용과 현재의 내용을 비교함 (가상 돔 끼리 비교)
3. 바뀐 부분만 실제 DOM에 적용

실제 React는 성능이 빠른편이 아니다 대부분의 모니터 화면이 60fps를 가지고 이에 대응하기에 충분히 빠르기때문에 사용하는 것 이다  
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
<br>

# 컴포넌트 마운트와 언마운트

```java script
useEffect(() => {
  (컴포넌트가 생길 때 수행 작업); // 마운트
  return {
      (컴포넌트가 사라질 때 수행 작업); // 언마운트
  }
}, [의존성])
```

- 마운트 : 의존성의 값이 바뀌면서 컴포넌트가 생성 되는것
- 언마운트 : 의존성의 값이 바뀌면서 컴포넌트가 삭제 되는것

```java script
useEffect(() => {
        console.log('user 값이 설정됨');
        console.log(user);
        return () => {
            console.log('user 값이 바뀌기 전');
            console.log(user);
        }
    }, [user])
```

다음과 같이 user 값이 수정되면 언마운트가 먼저 일어나므로 `return`의 함수가 실행 되고 이후에 마운트가 일어나 `return`전의 함수 실행  
언마운트는 cleanup 이라고 불리기도 하며 `clearInterval, clearTimeout`등에 쓰인다
