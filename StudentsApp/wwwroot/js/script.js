let allStudents = [];
let currentPage = 1;
const studentsPerPage = 10;

// Fetching data from the API endpoint
fetch("/Students/GetAllStudents")
    .then(response => response.json())
    .then(data => {
        allStudents = data;
        displayStudents(allStudents); // Display all students initially
        setupPagination(allStudents);
    });

function displayStudents(students) {

    const start = (currentPage - 1) * studentsPerPage;
    const end = start + studentsPerPage;
    const currentStudents = students.slice(start, end);

    const tableBody = document.querySelector(".students-table tbody");
    tableBody.innerHTML = "";

    currentStudents.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${start + index + 1}</td>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.age}</td>
        <td>
            <a href='/Students/Edit/${student.id}' class='btn btn-primary'>Edit</a>
            <a href='/Students/Delete/${student.id}' class='btn btn-danger'>Delete</a>
        </td>
    `;
        tableBody.appendChild(row);
    });
}

function setupPagination(students) {
    const totalPages = Math.ceil(students.length / studentsPerPage);
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.onclick = function () {
            currentPage = i;
            displayStudents(students);
        };
        pagination.appendChild(btn);
    }
}

document.querySelector(".search-input").addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    let filteredStudents = allStudents;

    if (searchTerm) {
        filteredStudents = allStudents.filter(
            student =>
                student.firstName.toLowerCase().includes(searchTerm) ||
                student.lastName.toLowerCase().includes(searchTerm)
        );
    }

    currentPage = 1;
    displayStudents(filteredStudents);
    setupPagination(filteredStudents);
});

const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;

darkModeToggle.addEventListener("change", () => {
    body.classList.toggle("dark-mode");
    const isDarkMode = body.classList.contains("dark-mode");
    const sunIcon = darkModeToggle.querySelector(".fa-sun");
    const moonIcon = darkModeToggle.querySelector(".fa-moon");
    if (isDarkMode) {
        sunIcon.style.display = "none";
        moonIcon.style.display = "inline-block";
    } else {
        sunIcon.style.display = "inline-block";
        moonIcon.style.display = "none";
    }
});
