const terms = ["Brilliant", "Experience", "Community", "Success", "Boston"];
const term = document.querySelector("#term");
const artWord = document.querySelector(".motion-art__word");
let index = 0;

window.setInterval(() => {
  index = (index + 1) % terms.length;
  [term, artWord].forEach((element) => {
    element.style.animation = "none";
    void element.offsetWidth;
    element.textContent = terms[index];
    element.style.animation = "word-in .55s ease";
  });
}, 3200);
