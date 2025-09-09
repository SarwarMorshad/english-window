const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const displayLesson = (lessons) => {
  // console.log(lessons);
  const lessonsContainer = document.getElementById("lessons-container");
  lessonsContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    const lessonDiv = document.createElement("div");
    lessonDiv.innerHTML = `<button onclick="loadWords(${lesson.level_no})" class=" btn btn-outline btn-primary"
                ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
                </button>`;
    lessonsContainer.appendChild(lessonDiv);
  });
};

const loadWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayWords(json.data));
};

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
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                      <i class="fa-solid fa-circle-info"></i>
                      <span class="sr-only">More info</span>
                    </button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                      <i class="fa-solid fa-volume-high"></i>
                      <span class="sr-only">Play pronunciation</span>
                    </button>
                </div>
            </div>`;
    wordsContainer.appendChild(wordCard);
  });
};

loadLessons();
