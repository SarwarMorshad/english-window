// ! Load Lessons form API
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

// ! Display Lessons
const displayLesson = (lessons) => {
  // console.log(lessons);
  const lessonsContainer = document.getElementById("lessons-container");
  lessonsContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    const lessonDiv = document.createElement("div");
    lessonDiv.innerHTML = `<button id="btn-lesson-${lesson.level_no}" onclick="loadWords(${lesson.level_no})" class="btn-lesson btn btn-outline btn-primary"
                ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
                </button>`;
    lessonsContainer.appendChild(lessonDiv);
  });
};

const clearActiveButtons = () => {
  const buttons = document.querySelectorAll(".btn-lesson");
  buttons.forEach((button) => {
    button.classList.remove("btn-active");
  });
};

// <section id="spinner" class="text-center my-10 hidden">
// <span class="loading loading-bars loading-xl "></span>
// </section>

const manageSpinner = (show) => {
  const spinner = document.getElementById("spinner");
  const wordsContainer = document.getElementById("word-container");
  if (show) {
    spinner.classList.remove("hidden");
    wordsContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    wordsContainer.classList.remove("hidden");
  }
};

/* <section id="spinner-2" class="text-center my-10 hidden">
        <span class="loading loading-bars loading-xl "></span>
      </section> */

// const modalSpinner = (show) => {
//   const modal = document.getElementById("modal-container");
//   const spinner = document.getElementById("spinner-2");
//   if (show) {
//     spinner.classList.remove("hidden");
//     modal.classList.add("hidden");
//   } else {
//     spinner.classList.add("hidden");
//     modal.classList.remove("hidden");
//   }
// };

// ! Load Words form API
const loadWords = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      clearActiveButtons();
      const btnLesson = document.getElementById(`btn-lesson-${id}`);
      btnLesson.classList.add("btn-active");
      displayWords(json.data);
    });
};

// ! Display Words
const displayWords = (words) => {
  console.log(words);
  const wordsContainer = document.getElementById("word-container");
  wordsContainer.innerHTML = "";
  if (!words || words.length === 0) {
    wordsContainer.innerHTML = `<div class="col-span-full place-self-center text-center">
        <p class="text-center"><i class="fa-solid fa-triangle-exclamation text-2xl"></i></p>
        <p class="font-hind-siliguri">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="font-bold text-xl mt-10">নেক্সট Lesson এ যান</h1>
      </div>
  `;
    manageSpinner(false);
    return;
  }
  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `<div class="bg-[#ffffff] p-5 rounded-lg shadow-md text-center h-[230px]">
                <h1 class="font-bold text-xl mb-5">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h1>
                <p class="mb-5">Meaning / Pronunciation</p>
                <p class="font-hind-siliguri">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${
      word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"
    }</p>
                <div class="flex items-center justify-between gap-5 mt-10 mx-5 text-xl">
                    <button onclick="loadWordDetails(${
                      word.id
                    })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                      <i class="fa-solid fa-circle-info"></i>
                      <span class="sr-only">More info</span>
                    </button>
                    <button onclick="pronounceWord('${
                      word.word
                    }')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                      <i class="fa-solid fa-volume-high"></i>
                      <span class="sr-only">Play pronunciation</span>
                    </button>
                </div>
            </div>`;
    wordsContainer.appendChild(wordCard);
  });
  manageSpinner(false);
};

// ! Load Word Details from API
const loadWordDetails = async (id) => {
  // modalSpinner(true);
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showWordDetails(data.data);
};

// ! Show Word Details in Modal
const showWordDetails = (words) => {
  const modalBox = document.getElementById("modal-container");
  modalBox.innerHTML = `
                <div class="rounded-2xl border border-sky-500 bg-white p-6 md:p-8 shadow-sm">
                  <div class="mb-5">
                      <h2 class="text-2xl font-bold">${
                        words.word
                      } (<i class="fa-solid fa-microphone-lines"></i> : ${words.pronunciation}) </h2>
                  </div>
                  <div class="mb-5">
                      <h2 class=" font-bold">Meaning</h2>
                      <p>${words.meaning}</p>
                  </div>
                  <div class="mb-5">
                      <h2 class=" font-bold">Example</h2>
                      <p>${words.sentence}</p>
                  </div class="mb-5">
                  <div>
                      <h2 class=" font-bold mb-2">Synonyms</h2>
                      <div class="">
                          ${createElement(words.synonyms)}
                      </div>
                  </div>
                </div>
  `;
  document.getElementById("my_modal_5").showModal();
  // modalSpinner(false);
};

// ! Create Elements
const createElement = (arr) => {
  const elements = arr.map((item) => `<span class="btn btn-primary mr-5">${item}</span>`);
  return elements.join("");
};

// ! Pronounce Word
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
loadLessons();
