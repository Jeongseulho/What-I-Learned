const onInsertToggle = () => {
setInsertToggle((prev) => !prev);
};
set 함수안에 토글 기능 넣기

        </div>
      {insertToggle && <TodoInsert />}
    </Template>

);

{a && b} 로 둘다 트루면 출력하는 기능 <TodoInsert> 는항상트루
