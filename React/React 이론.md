set은 비동기적이다
컴포넌트가 처음부터 다시 시작한다
https://velog.io/@jjunyjjuny/React-useState%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%8F%99%EC%9E%91%ED%95%A0%EA%B9%8C

💡 최상위(at the Top Level)에서만 hook을 호출해야 합니다.
반복문, 조건문 혹은 중첩 함수에서 hook을 호출하면 안 됩니다.

state는 컴포넌트의 실행 순서대로 배열에 저장될 것입니다.

만약 조건문 등을 만나면 컴포넌트의 실행 순서가 달라질 수 있습니다.

💡 오직 React 함수 내에서 hook을 호출해야 합니다
Hook을 일반적인 JavaScript 함수에서 호출하면 안 됩니다.

함수 컴포넌트, 커스텀 훅 내에서만 호출할 수 있습니다.

두 규칙을 따랐을 때 컴포넌트가 렌더링 될 때마다 동일한 순서로 hook이 호출되는 것을 보장합니다.

useState와 함수형 인자
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

export default Counter;
리액트를 배우다 보면 한 번쯤 만날 수 있는 예제입니다.

위의 예제에서 increase1 함수의 결과는 3이 아닌 1입니다.

반면 increase2 함수의 결과는 의도한 대로 3이 됩니다.

리액트는 setState의 인자가 변수인가 함수인가의 차이를 이렇게 정리합니다.

If the new state is computed using the previous state, you can pass a function to setState.

: 새로운 상태가 바로 이전 상태를 통해 계산되어야 하면 함수를 써야 합니다.

React may batch multiple setState() calls into a single update for performance.

During subsequent re-renders, the first value returned by useState will always be the most recent state after applying updates.

: 리액트는 퍼포먼스 향상을 위해 특별한 배치 프로세스를 사용하기 때문입니다.

여러 setState 업데이트를 한 번에 묶어서 처리한 후 마지막 값을 통해 state를 결정하는 방식입니다..

const onInsertToggle = () => {
setInsertToggle((prev) => !prev);
};
set 함수안에 토글 기능 넣기

        </div>
      {insertToggle && <TodoInsert />}
    </Template>

);

{a && b} 로 둘다 트루면 출력하는 기능 <TodoInsert> 는항상트루
