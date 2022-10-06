const id = document.querySelector(".id");
const Name = document.querySelector(".name");
const confirmPasswd = document.querySelector(".confirm-passwd");
const passwd = document.querySelector(".passwd");
const registerBtn = document.querySelector(".button");

const register = () => {
  if (!id.value) alert("id를 입력 해주십시오");
  if (passwd.value !== confirmPasswd.value)
    alert("비밀번호가 일치하지 않습니다");
  const req = {
    id: id.value,
    name: Name.value,
    passwd: passwd.value,
  };

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/login";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error("회원가입 중 에러 발생"));
    });
};

registerBtn.addEventListener("click", register);
