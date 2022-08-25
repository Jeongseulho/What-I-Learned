# 로그인 기능 만들기

<img width="596" alt="19" src="https://user-images.githubusercontent.com/110578739/185580480-a870fe19-26ad-47a6-8676-0cd7ad05ce8d.png">

<br>

```java script
let inputTag = document.getElementsByTagName("input");
let buttonArray = document.getElementsByTagName("button");

let inputId = inputTag[0];
let inputPassword = inputTag[1];

let ordinaryButton = buttonArray[0];
```

`input`태그과 `button`태그를 각각 `inputTag,buttonArray`에 담는다

<details>
<summary>getElementsByTagName vs querySelectorAll</summary>
          
결과는 같지만 리턴 타입에서 차이가 있다
`getElementsByTagName`은 `HTMLCollection`을, `querySelectorAll`은 `NodeList`를 리턴한다

`HTMLCollection`은 name, id, index번호로 접근 가능한 반면, `NodeList`는 index 번호로만 접근이 가능하기 때문에 처리속도가 `getElementsByTagName`이 더 빠릅니다.

</details>

`inputId`에 `inputTag`의 첫번째요소(아이디)를 담는다  
`inputPassword`에 `inputTag`의 두번째요소(비밀번호)를 담는다
`ordinaryButton`에 `buttonArray`의 첫번째요소(로그인버튼)을 담는다  
<br>

```java script
inputPassword.addEventListener("keyup", () => {
  if (inputId.value) {
    ordinaryButton.classList.remove("unactivatedLoginColor");
    ordinaryButton.classList.add("activatedLoginColor");
  }
  if (!inputPassword.value) {
    ordinaryButton.classList.remove("activatedLoginColor");
    ordinaryButton.classList.add("unactivatedLoginColor");
  }
});
```

`inputPassword`에 `keyup`이벤트가 발생한 경우`inputId.value`를 확인하고 값이 있으면, `ordinaryButton`태그에 `unactivatedLoginColor`에서 `activatedLoginColor`클래스로 변경

`inputPassword.value`가 값이 없으면 `activatedLoginColor`에서 `unactivatedLoginColor`클래스로 다시 원래대로 변경

`input`태그는 항상 값을 문자열로 받는다  
falsy 6가지 : `false, null, undefined, 0, NaN, ""(빈 문자열)`  
여기서 `if`문은 입력을 받아서 문자가있는경우 `true`, 문자를 쓰지않거나 백스페이스를 사용하여 문자를 다지워서 없어지면 `false`이다

하지만 위 코드처럼 작성시
<img width="638" alt="20" src="https://user-images.githubusercontent.com/110578739/185623884-d5107e51-e296-4291-84eb-7033fe811ca9.png">
비밀번호 입력칸에서만 이벤트가 발생하여 다음과 같이 아이디, 비밀번호가 모두 입력되어도 로그인버튼이 활성화 안되는 경우가 생긴다  
<br>

```java script
inputTag.forEach((inputElem) => {
  inputElem.addEventListener("keyup", () => {
    if (inputId.value && inputPassword.value) {
      ordinaryButton.classList.remove("unactivatedLoginColor");
      ordinaryButton.classList.add("activatedLoginColor");
    } else {
      ordinaryButton.classList.remove("activatedLoginColor");
      ordinaryButton.classList.add("unactivatedLoginColor");
    }
  });
});
```

다음과 같이 `forEach`문을 사용해서 입력칸 2군데 모두에 이벤트를 추가하고 `if`문에 &&를 써서 모두 입력된 경우만 `active` else `unactive`클래스를 추가

<img width="550" alt="21" src="https://user-images.githubusercontent.com/110578739/185624963-64bd384a-17c4-4a8b-ab2f-e3fe2a04a904.png">

`inputTag.forEach`가 함수가 아니라는 오류가 뜬다  
검색해보니 `inputTag`가 배열이 아닌지 확인이 필요하다  
위에 설명했듯이 `document.getElementsByTagName()`로 가져온 `inputTag`는 `HTMLcollection`인데 이는 유사배열이라는 구조라 배열이 아니다  
해결방법은

1. `Array.from()`을 사용하여 배열로 만들어주거나
2. `inputTag = document.querySelectorAll("input");`처럼 `inputTag`를 `querySelectorAll`을 사용해서 가져오자

<br>

```java script
ordinaryButton.addEventListener("click", () => {
  if (inputId.value === "Jeongseulho" && inputPassword.value === "passwd1234") {
    alert("로그인 성공");
  } else {
    alert("로그인 실패");
  }
});
```

다음과 같이 로그인버튼에 클릭 이벤트추가

<br>

<hr>

### 배운 함수, 문법, 객체들

- flasy
- `getElementBy...`
  <br>

### 그 밖의 배운것

- `getElementBy...`은 `HTMLcollection`인 유사배열을 반환한다
- `querySelector`는 `Nodelist`인 배열을 반환한다
