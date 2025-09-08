const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const displayLesson = (lessons) => {
  console.log(lessons);
  const lessonsContainer = document.getElementById("lessons-container");
  lessonsContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    const lessonDiv = document.createElement("div");
    lessonDiv.innerHTML = `<a class=" btn btn-outline btn-primary"
                ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
                </a>`;
    lessonsContainer.appendChild(lessonDiv);
  });
};

loadLessons();
