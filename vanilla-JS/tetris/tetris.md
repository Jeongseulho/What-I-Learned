```java script
  tempMovingItem = movingItem;
  movingItem.left = 3;
  console.log(tempMovingItem);
```

tempMovingItem값도 바뀐다

```java script
  tempMovingItem = {...movingItem};
  movingItem.left = 3;
  console.log(tempMovingItem);
```

tempMovingItem 값유지

```java script
const{type, direction,top,left} = tempMovingItem;
```

디스트럭처링 검색

```java script
    const target = playground.childNodes[y].childNodes[0].childNodes[x];
```

playground인 ul태그 하위의 li태그가 몇 행인지 정한다
그 li태그의 하위의 첫태그는 ul태그 1개이고 그 하위의 li태그가 몇 열인지 정한다

```java script
function renderBlocks() {
  const { type, direction, top, left } = tempMovingItem;
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => moving.classList.remove(type, "moving"));

  BLOCKS[type][direction].forEach((block) => {
    const x = block[0] + left;
    const y = block[1] + top;
    const target = playground.childNodes[y]
      ? playground.childNodes[y].childNodes[0].childNodes[x]
      : null;
    const isAvailable = checkEmpty(target);
    if (isAvailable) {
      target.classList.add(type, "moving");
    } else {
      tempMovingItem = { ...movingItem };
      renderBlocks();
    }
  });
  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = direction;
}
```

범위안에서 정상 실행일때 movingItem을 계속 업데이트하다가 범위밖이면 바로 그전 상태인 movingItem을 가져와서 다시 렌더링
하지만 이경우 call stack size exceed 오류발생(재귀함수 계속 반복)

```java script
if (isAvailable) {
      target.classList.add(type, "moving");
    } else {
      tempMovingItem = { ...movingItem };
      setTimeout(renderBlocks, 0);
    }
```

setTimeout사용하여 이를 방지

```java script
BLOCKS[type][direction].some((block) => {
    const x = block[0] + left;
    const y = block[1] + top;
    const target = playground.childNodes[y]
      ? playground.childNodes[y].childNodes[0].childNodes[x]
      : null;
    const isAvailable = checkEmpty(target);
    if (isAvailable) {
      target.classList.add(type, "moving");
    } else {
      tempMovingItem = { ...movingItem };
      setTimeout(() => {
        renderBlocks();
        if (moveType === "top") {
          seizeBlock();
        }
      }, 0);
      return true;
    }
  }
```

forEach문 쓰면 범위밖으로 나가도 나머지 반복문을 다 돌게되므로 비효율적  
some을 사용하여 else에 return true;를 써서 범위밖이면 할거하고 반복문 탈출  
forEach문은 반복문 중단이 불가능 for문에서 사용하는 break,continue 사용불가  
map, filter, forEach는 모두 콜백함수를 인자로 넣는다  
해당 콜백함수의 파라미터는 순서대로 (값, 인덱스, 배열자체)이다  
배열을 돌면서 해당 콜백함수의 리턴값들을 모아서 배열로 만들어 반환하는것이 map,filter이다  
for문 대신하여 배열에대해서 반복만을 사용할때 사용하는 것이 foreach문의 콜백함수가 가진 리턴값은 의미가 없다 또한 forEach문 자체의 리턴값도 없다

some또한 콜백함수를 인자로 넣는다  
해당 콜백함수 또한 마찬가지로 (값, 인덱스, 배열자체)로 파라미터를 갖는다  
배열을 돌면서 해당 콜백함수의 리턴값이 true이면 반복을 종료하고 최종적으로 true를 반환 전부 false이면 최종적으로 false반환

every는 동일하지만 콜백함수의 리턴값이 true이면 계속 반복 진행, 반복다하고 전부 true이면 true반환, 반복중에 false인 리턴값의 콜백함수 있으면 반복종료후 false반환

```java script
function generateNewBlock() {
  const blockArray = Object.entries(BLOCKS);
  const randomIndex = Math.floor(Math.random() * blockArray.length);

  movingItem.type = blockArray[randomIndex][0];

  movingItem.left = 3;
  movingItem.direction = 0;
  movingItem.top = 0;
  tempMovingItem = { ...movingItem };
  renderBlocks();
}

```

Object.entries()쓰면 객체를 배열로 만든다  
이때 각 배열 0번째,1번쨰...에 각각 [key,value]를 담은 배열을 담는다  
blockArray[randomIndex][0] 이면 결국 객체에 담긴 key값을 가르킨다(square, bar, tree...)
