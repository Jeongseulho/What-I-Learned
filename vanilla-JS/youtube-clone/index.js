const moreBtn = document.querySelector(".info .metadata .moreBtn");
const title = document.querySelector(".info .metadata .title");

moreBtn.addEventListener("click", () => {
  moreBtn.classList.toggle("clicked");
  title.classList.toggle("clamp");
});

const buttons = document.querySelectorAll(".info .actions button");
const like = buttons[0];
const hate = buttons[1];

like.addEventListener("click", () => {
  like.classList.toggle("active");
  if (like.classList.contains("active")) {
    like.innerHTML = `<i class="fas fa-thumbs-up"></i>1`;
  } else {
    like.innerHTML = `<i class="fas fa-thumbs-up"></i>0`;
  }
});

hate.addEventListener("click", () => {
  hate.classList.toggle("active");
  if (hate.classList.contains("active")) {
    hate.innerHTML = `<i class="fas fa-thumbs-down"></i>1`;
  } else {
    hate.innerHTML = `<i class="fas fa-thumbs-down"></i>0`;
  }
});
