//let inputTag = document.getElementsByTagName("input");
//let buttonArray = document.getElementsByTagName("button");

let inputTag = document.querySelectorAll("input");
let buttonArray = document.querySelectorAll("button");

let inputId = inputTag[0];
let inputPassword = inputTag[1];

let ordinaryButton = buttonArray[0];
let facebookLoginButton = buttonArray[1];

/*
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
*/

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

ordinaryButton.addEventListener("click", () => {
  if (inputId.value === "Jeongseulho" && inputPassword.value === "passwd1234") {
    alert("로그인 성공");
  } else {
    alert("로그인 실패");
  }
});
