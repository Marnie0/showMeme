const main = document.querySelector(".main");
const error = document.querySelector("#error");
const input = document.querySelector("#memeInput");
const memeContainer = document.querySelector(".memeContainer");
const memeTitle = document.querySelector(".memeContainer .memeTitle");
const memeImage = document.querySelector(".memeContainer .memeImage");
const showPreviousMemeBtn = document.querySelector(".showPreviousMemeBtn");
const showNextMemeBtn = document.querySelector(".showNextMemeBtn");


function showError(message) {
  main.classList.add("min-vh-100");
  error.textContent = message;
  error.classList.remove("d-none");
  memeContainer.classList.add("d-none");
  showPreviousMemeBtn.classList.add("d-none");
  showNextMemeBtn.classList.add("d-none");
}


function showInvalidInput() {
  showError("Please enter an integer between 0 and 99.");
}

function showFetchError(error) {
  showError(`Error fetching meme: ${error.message}`);
}

function showMemeResult() {
  main.classList.remove("min-vh-100");
  error.classList.add("d-none");
  memeContainer.classList.remove("d-none");
  showPreviousMemeBtn.classList.remove("d-none");
  showNextMemeBtn.classList.remove("d-none");
}

function displayMeme() {
  fetch("https://api.imgflip.com/get_memes")
    .then((response) => response.json())
    .then((data) => {
      const meme = data.data.memes[input.valueAsNumber];

      memeTitle.textContent = meme.name;
      memeImage.src = meme.url;
      showMemeResult();
    })
    .catch((error) => {
      showFetchError(error);
    });
}

function validateAndDisplayMeme() {
  if (!input.checkValidity()) {
    showInvalidInput();
  } else {
    displayMeme();
  }
}

main.addEventListener("submit", (event) => {
  event.preventDefault();
  validateAndDisplayMeme();
});

showPreviousMemeBtn.addEventListener("click", () => {
  input.value--;
  validateAndDisplayMeme();
});

showNextMemeBtn.addEventListener("click", () => {
  input.value++;
  validateAndDisplayMeme();
});
