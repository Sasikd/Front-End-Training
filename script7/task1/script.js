const questions = [
    {
     question: "Which method is used to remove the last element from an array?",
     options: [
       { answer: "pop()", isCorrect: true },
       { answer: "shift()", isCorrect: false },
       { answer: "push()", isCorrect: false },
       { answer: "unshift()", isCorrect: false }
     ]
   },
     {
       question: "Which method is used to join all elements of an array into a string?",
       options: [
         { answer: "join()", isCorrect: true },
         { answer: "concat()", isCorrect: false },
         { answer: "slice()", isCorrect: false },
         { answer: "splice()", isCorrect: false }
       ]
     },
     {
     question: "Which method creates a new array with all elements that pass a test?",
     options: [
       { answer: "filter()", isCorrect: true },
       { answer: "map()", isCorrect: false },
       { answer: "reduce()", isCorrect: false },
       { answer: "forEach()", isCorrect: false }
     ]
   },
     {
       question: "Which of the following is not a valid JavaScript data type?",
       options: [
         { answer: "Number", isCorrect: false },
         { answer: "String", isCorrect: false },
         { answer: "Float", isCorrect: true },
         { answer: "Boolean", isCorrect: false }
       ]
     },
     {
       question: "What will the following code output: `console.log(3 + '3')`?",
       options: [
         { answer: "33", isCorrect: true },
         { answer: "6", isCorrect: false },
         { answer: "NaN", isCorrect: false },
         { answer: "Error", isCorrect: false }
       ]
     }
   ];
let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);
let userScore = 0;
let users = JSON.parse(localStorage.getItem("users")) || [];
let timer;
let timerCountdown = 30;

function startQuiz() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (!name || !email) {
        showAlert("Error", "Please enter both name and email.");
        return;
    }

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
        existingUser.name = name;
    } else {
        users.push({ name, email, score: 0, date: new Date().toLocaleDateString() });
    }
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("quizPage").classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    startTimer();

    const questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = "";

    const question = questions[currentQuestionIndex];
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<h3>${question.question}</h3>`;

    question.options.forEach((option, index) => {
        const isChecked = userAnswers[currentQuestionIndex] === index;
        const optionElement = document.createElement("div");
        optionElement.innerHTML = `
            <input type="radio" name="option" id="option${index}" value="${index}" ${isChecked ? "checked" : ""}>
            <label for="option${index}">${option.answer}</label>
        `;
        questionElement.appendChild(optionElement);
    });

    questionContainer.appendChild(questionElement);
    updateNavigationButtons();
    updateProgressBar();
}

function saveAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
}

function nextQuestion() {
    saveAnswer();
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function previousQuestion() {
    saveAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function submitQuiz() {
    saveAnswer();

    if (userAnswers.includes(null)) {
        showAlert("Warning", "Please answer all questions before submitting.");
        return;
    }

    userScore = userAnswers.reduce((score, answer, index) => {
        if (questions[index].options[answer]?.isCorrect) {
            return score + 1;
        }
        return score;
    }, 0);

    showResults();
}

function showResults() {
    document.getElementById("quizPage").classList.add("hidden");
    document.getElementById("resultPage").classList.remove("hidden");

    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = `<h3>Your Score: ${userScore}/${questions.length}</h3>`;

    const userIndex = users.findIndex(
        (u) => u.email === document.getElementById("email").value
    );
    if (userScore > users[userIndex].score) {
        users[userIndex].score = userScore;
        users[userIndex].date = new Date().toLocaleDateString();
        localStorage.setItem("users", JSON.stringify(users));
    }

    populateDashboardTable();
}

function viewDashboard() {
    document.getElementById("resultPage").classList.add("hidden");
    document.getElementById("dashboardPage").classList.remove("hidden");
    populateDashboardTable();
}

function populateDashboardTable() {
    const dashboardTableBody = document.getElementById("dashboardTableBody");
    dashboardTableBody.innerHTML = "";

    const sortedUsers = users.sort((a, b) => b.score - a.score);
    sortedUsers.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.score}</td>
            <td>${user.date}</td>
        `;
        dashboardTableBody.appendChild(row);
    });
}

function retakeQuiz() {
    userAnswers = new Array(questions.length).fill(null);
    userScore = 0;
    currentQuestionIndex = 0;
    clearInterval(timer);

    document.getElementById("dashboardPage").classList.add("hidden");
    document.getElementById("quizPage").classList.remove("hidden");

    loadQuestion();
}

function startTimer() {
    const timerElement = document.getElementById("timer");
    timerCountdown = 30;
    timerElement.textContent = `Time Remaining: ${timerCountdown}s`;

    timer = setInterval(() => {
        timerCountdown--;
        timerElement.textContent = `Time Remaining: ${timerCountdown}s`;

        if (timerCountdown <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function updateProgressBar() {
    const progressBar = document.getElementById("progressBar");
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${Math.round(progress)}%`;
}

function updateNavigationButtons() {
    const nextButton = document.getElementById("nextButton");
    const previousButton = document.getElementById("previousButton");

    previousButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = currentQuestionIndex === questions.length - 1;
}

function showAlert(title, message) {
    const alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">${title}</h4>
            <p>${message}</p>
            <button class="btn btn-secondary" onclick="closeAlert()">Close</button>
        </div>
    `;
    alertContainer.classList.remove("hidden");
}

function closeAlert() {
    document.getElementById("alertContainer").classList.add("hidden");
}
