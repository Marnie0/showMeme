const main = document.querySelector(".main");
const error = document.querySelector("#error");
const input = document.querySelector("#memeInput");
const memeContainer = document.querySelector(".memeContainer");
const memeTitle = document.querySelector(".memeContainer .memeTitle");
const memeImage = document.querySelector(".memeContainer .memeImage");

function invalidInput() {
  main.classList.add("min-vh-100");
  error.classList.remove("d-none");
  memeContainer.classList.add("d-none");
}

function showResult(){
  main.classList.remove("min-vh-100");
  error.classList.add("d-none");
  memeContainer.classList.remove("d-none");
}


main.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!input.checkValidity()) {
    invalidInput();
  } else {
    fetch(`https://api.imgflip.com/get_memes`)
      .then((response) => response.json())
      .then((data) => {
        const meme = data.data.memes[input.valueAsNumber];

        memeTitle.textContent = meme.name;
        memeImage.src = meme.url;
      })
      .catch((error) => {
        memeTitle.textContent = "Error";
        memeImage.src = "";
      }).finally(() => {
        showResult();
      });
  }
});
