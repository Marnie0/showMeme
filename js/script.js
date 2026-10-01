const main = document.querySelector(".main");
const error = document.querySelector("#error");
const input = document.querySelector("#memeInput");
const memeContainer = document.querySelector(".memeContainer");
const memeTitle = document.querySelector(".memeContainer .memeTitle");
const memeImage = document.querySelector(".memeContainer .memeImage");
const showMemeBtn = document.querySelector(".showMemeBtn");
const showPreviousMemeBtn = document.querySelector(".showPreviousMemeBtn");
const showNextMemeBtn = document.querySelector(".showNextMemeBtn");
let currentMemeIndex = -1;
let memes = [];

function buttonsStateAtIndex(btn, index) {
  currentMemeIndex === index ? (btn.disabled = true) : (btn.disabled = false);
}

function nextAndPreviousButtonsState() {
  buttonsStateAtIndex(showPreviousMemeBtn, 0);
  buttonsStateAtIndex(showNextMemeBtn, 99);
}

function showError(message) {
  main.classList.add("min-vh-100");
  error.textContent = message;
  error.classList.remove("d-none");
  memeContainer.classList.add("d-none");
  showPreviousMemeBtn.classList.add("d-none");
  showNextMemeBtn.classList.add("d-none");
}

function isValidMemeIndex() {
  return currentMemeIndex >= 0 && currentMemeIndex <= 99;
}

function showInvalidInput() {
  showError("Please enter an integer between 0 and 99.");
}

function showFetchError(error) {
  showError(`Error fetching meme: ${error.message}`);
}

function fetchMemes() {
  showMemeBtn.disabled = true;
  fetch("https://api.imgflip.com/get_memes")
    .then((response) => response.json())
    .then((data) => {
      memes = data.data.memes;
      showMemeBtn.disabled = false;
    })
    .catch((error) => {
      showFetchError(error);
    });
}

function displayMeme() {
  const meme = memes[currentMemeIndex];
  input.value = currentMemeIndex;
  memeTitle.textContent = meme.name;
  memeImage.src = meme.url;
  showMemeResult();
  nextAndPreviousButtonsState();
}

function showMemeResult() {
  main.classList.remove("min-vh-100");
  error.classList.add("d-none");
  memeContainer.classList.remove("d-none");
  showPreviousMemeBtn.classList.remove("d-none");
  showNextMemeBtn.classList.remove("d-none");
}

function validateAndDisplayMeme() {
  isValidMemeIndex() ? displayMeme() : showInvalidInput();
}

main.addEventListener("submit", (event) => {
  event.preventDefault();
  currentMemeIndex = input.valueAsNumber;
  validateAndDisplayMeme();
});

showPreviousMemeBtn.addEventListener("click", () => {
  currentMemeIndex--;
  validateAndDisplayMeme();
});

showNextMemeBtn.addEventListener("click", () => {
  currentMemeIndex++;
  validateAndDisplayMeme();
});

fetchMemes();