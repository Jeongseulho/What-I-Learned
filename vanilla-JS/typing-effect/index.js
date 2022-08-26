let target = document.querySelector("#dynamic");

function randomString() {
  let stringArr = [
    "Learn to HTML",
    "Learn to CSS",
    "Learn to Java Script",
    "Learn to PYTHON",
    "Learn to RUBY",
  ];
  let selectString = stringArr[Math.floor(Math.random() * stringArr.length)];
  let selectStringArr = selectString.split("");

  return selectStringArr;
}

function resetTyping() {
  target.textContent = "";
  dynamic(randomString());
}

function dynamic(randomArr) {
  if (randomArr.length > 0) {
    target.textContent += randomArr.shift();
    setTimeout(() => {
      dynamic(randomArr);
    }, 100);
  } else {
    setTimeout(resetTyping, 3000);
  }
}

function blink() {
  target.classList.toggle("active");
}

setInterval(blink, 500);
dynamic(randomString());
