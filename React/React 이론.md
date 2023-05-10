# 목차

- [목차](#목차)

  - [React가 가상DOM을 사용하는 절차](#React가-가상DOM을-사용하는-절차)
  - [useState의 이해](#useState의-이해)
    - [useState의 사용조건](#useState의-사용조건)
    - [useState와 함수형인자](#useState와-함수형인자)
  - [컴포넌트 반환에서 출력결정방법](#컴포넌트-반환에서-출력결정방법)
  - [useEffect](#useEffect)
  - [useRef](#useRef)
  - [useContext](#useContext)
  - [useMemo](#useMemo)
  - [useCallback](#useCallback)
    - [useMemo, useCallback을 사용한 컴포넌트 최적화](#useMemo,-useCallback을-사용한-컴포넌트-최적화)
  - [useReducer](#useReducer)
  - [onClick 사용시 주의](#onClick-사용시-주의)

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

# useEffect

```java script
useEffect(() => {
  (마운트시 수행 작업 + 의존성 바뀔때마다 수행 작업);
  return () => {
      (언마운트시 수행 작업); // clean up 함수
  }
}, [의존성])
```

컴포넌트 리렌더링 = 기존 컴포넌트 언마운트 + 새로운 컴포넌트 마운트  
의존성 값은 렌더링과 관련된 값이어야만 한다(useState의 변수 또는 그 변수의 의존해서 바뀌는 변수) 아닐경우 의미 없음

useEffect의 3가지 경우

1. deps(의존성)에 빈 배열  
   처음 컴포넌트 마운트 됐을 때 `useEffect`내 함수 호출(이후 마운트 실행x)  
   컴포넌트 언마운트 될 때 `cleanup` 함수 호출

2. deps(의존성)에 의존 값 존재  
   처음 컴포넌트 마운트 됐을 때 `useEffect`내 함수 호출  
   의존 값이 바뀌기 직전에 언마운트 되면서 `cleanup` 함수 호출  
   의존 값이 바뀐 후에 마운트되면서 `useEffect`내 함수 호출

3. 파라미터를 안 넣었을 경우  
    리렌더링 될 때마다 함수 호출 (언마운트 + 마운트 반복)
   <br>

# useRef

```java script
const ref = useRef("Hi") // ref = {current : "Hi} 로 저장됨
```

특징

1. State가아닌 Ref에 변수 저장하고 값 변경시 Ref는 렌더링 되지 않고 내부적으로 값만 바뀌어서 불필요한 렌더링 줄임
2. 다시 렌더링 되어도 값이 유지가된다

DOM 접근하기

```java script
function App() {
  const inputRef = useRef();

  useEffect(() => {
    console.log(inputRef); // {current : input} input태그를 의미
    inputRef.current.focus(); // 첫렌더링시 실행
  }, [])

  return (
    <div>
      <input ref={inputRef} type="text"/> // ref로 넘겨줌
    </div>
  );
}
```

위 예제는 첫 렌더링시 입력태그에 `focus`가 있게 하는 기능  
useRef() 를 사용하여 Ref 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM 에 ref 값으로 설정 그러면, Ref 객체의 .current 값은 우리가 원하는 DOM 을 가르키게 된다

# useContext

```java script
// AppContext 객체를 생성
export const AppContext = createContext(null);
// null자리는 <AppContext.Provider>로 감싸져있지 않았는데 AppContext를 불러와서 사용하려 할 경우 정해줄 default 값이다

const App = () => {
  const user = {
    name: "김채원",
    job: "가수"
  };

  return (
    <>
      <AppContext.Provider value={user}> // value로 user객체를 넘겨준다
          <Children />
      </AppContext.Provider> // 이 태그안에 감싸져 있는 하위 컴포넌트에   value값을 넘길 수 있다
    </>
  );
};
```

```java script
const Children = () => {

  const user = useContext(AppContext);
  // 또는 const {name, job} = useContext(AppContext);

  return (
    <>
      <h3>AppContext에 존재하는 값의 name은 {user.name}입니다.</h3>
      <h3>AppContext에 존재하는 값의 job은 {user.job}입니다.</h3>
    </>
  );
};
```

props를 연쇄적으로 이어서 전달하지 않고 `useContext`를 써서 전역적으로 전달 가능  
<br>

# useMemo

```java script
const memo = useMemo(콜백 함수, [의존성])
```

- 변수 `memo`에 `useMemo`의 콜백함수의 리턴값이 담긴다
- 여기서 의존성 값이 바뀔때에만 콜백함수가 실행되고 해당 리턴값이 변수에 담긴다
- 컴포넌트가 리렌더링 되면 값을 다시 할당 해야하는데 자주 쓰이는 값을 캐싱하여 불필요한 연산을 줄이는 목적

```java script
const [number, setNumber] = useState(0);
const [isKorea, setIsKorea] = useState(true);

const location = {
  country : isKorea ? "한국" : "외국"
}

useEffect(() => {
  console.log("useEffect호출")
},[location]);
```

`useEffect`를 사용해서 객체타입인 변수 `location`이 변할때만 실행시키고 싶은데 여기서 `setNumber()`를 사용하면 해당 `console.log("useEffect호출")`이 실행된다

- 이유는 원시타입변수(string, number, boolean 등)와 다르게 객체타입변수(object, array 등)은 변수에 값이아닌 참조할 주소가 담긴다
- `setNumber`를 통해 리렌더링을 할 때 마다 `location`은 다시 선언 되며, 이때마다 객체의 값은 그대로지만 사실상 `location`변수 자체에 담긴 주소 참조값은 매번 달라지므로 `useEffect`에서 다르다고 판단한다

```java script
const location = useMemo(()=>{
  return {
    country: isKorea ? "한국" : "외국"
  }
},[isKorea])

useEffect(() => {
  console.log("useEffect호출")
},[location]);
```

다음과 같이 `useMemo`를 사용해서 변수에 객체를 담으면 `setNumber()`를 사용해도 `console.log("useEffect호출")`이 실행되지 않는 의도하는 상황을 만든다  
<br>

```java script
import {memo} from "react"

...

export default memo(myComponent)
```

다음과 같이 사용하면 간단히 `MyComponent`의 상위 컴포넌트에서 `MyComponent`를 호출할때 전해준 `props`가 바뀐 경우에만 `MyComponent`를 다시 렌더링하고 `props`가 변한게 없다면 굳이 다시 렌더링하지 않는다  
만약 `props`가 객체라면 위의 `useMemo`를 함께사용한다
<br>

# useCallback

```java script
const callback = useCallback(콜백 함수, [의존성])
```

- `useCallback`은 `useMemo`의 함수버전이다 함수또한 객체 형태로 변수에 저장이 된다
- `useMemo`와 달리 리턴값이 담기는게 아닌 콜백함수 그자체가 담긴다
- 의존성의 값이 바뀔때에만 다시 변수에 해당 콜백함수를 다시 담는다
- 의존성값이 바뀐다고 콜백함수가 실행되는것이 아니다 콜백함수를 다시 담을 뿐이다
- 위에서 `useMemo`와 `memo`를 같이 사용하듯이 건네주는 `props`가 함수인경우는 `useCallback`을 사용한다  
  <br>

# useReducer

```java script
const reducer = (state, action) => {
  switch(action.type){
    case "deposit":
      return state + action.payload;
    case "withdraw":
      return state - action.payload;
    default:
      return state;
  }
}
```

- `useReducer`에 쓸 함수를 정의해둔다

```java script
const [money, dispatch] = useReucer(reducer,0);
```

- `useReducer`는 함수와 초기값을 받는다
- `reducer`함수의 `state`인자는 현재 `money`값을 받는다
- `money`는 초깃값 0을 받고 후에 `dispatch`함수가 호출될시 리턴값을 담는다
- `dispatch()`를 사용해서 `reducer()`를 대신 호출한다

```java script
dispatch({type:"deposit", payload:1000})
```

- `dispatch()`로 호출할때 `action`파라미터를 객체형태로 넘긴다
- 위에서 설명했듯이, `state`는 `useReducer`의 초기값, 이후 실행시에는 실행된 함수의 리턴값이다  
  <br>

# onClick 사용시 주의

```java script
onClick={setCount(count + 1)} // 사용금지

onClick={() => setCount(count + 1)} // 사용가능
```

`onClick`은 함수를 실행하는 코드이기 때문에 함수 뒤에 () 안붙여도 실행됨  
이렇게 하면 컴포넌트가 렌더링 되는 동시에 실행이 된다.  
그러면? 렌더링 될 때 count 가 1 증가 하는데, state 가 변경 되었으니 컴포넌트가 다시 렌더링 됨  
다시 렌더링 됐으니 또 count 가 1 올라가고… state 변경으로 인해 또 다시 렌더링, 무한루프
