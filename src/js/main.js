"use strict";

//Variables
let saveCoursebtn = document.getElementById("saveCourse");
let coursesyllabusInput = document.getElementById("coursesyllabus");
let courseForm = document.getElementById("courseForm");
let coursesEl = document.getElementById("courses");
let codeInput = document.getElementById("coursecode");
let nameInput = document.getElementById("coursename");
let progressionInput = document.getElementById("courseprogression");


//Eventlisteners
window.addEventListener("load", getCourses);
courseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    saveCourse();
});

//Function GET courses
function getCourses() {
    coursesEl.innerHTML = "";
    fetch("http://studenter.miun.se/~aslo1900/dt173g/")
        .then(response => response.json())
        .then(data => {
            data.forEach(course => {
                coursesEl.innerHTML +=
                    `<div class="course">
                    <p>${course.code}</p>
                    <p>${course.name}</p>
                    <p>${course.progression}</p>
                    <a target="_blank" href="${course.coursesyllabus}">Kurslista</a>
                </div>`
            })
        })
}

//Function POST course
function saveCourse() {
    let code = codeInput.value;
    let name = nameInput.value;
    let progression = progressionInput.value;
    let coursesyllabus = coursesyllabusInput.value;

    let course = { "code": code, "name": name, "progression": progression, "coursesyllabus": coursesyllabus };

    fetch("http://studenter.miun.se/~aslo1900/dt173g/", {
        method: "POST",
        body: JSON.stringify(course),
    })

    .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log("Error: ", error);
        })

}