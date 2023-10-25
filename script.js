const questions = [
    // Your question data here...
    {
        question: "What does HTML stand for?",
        options: ["a) Hyper Text Markup Language", "b) High Tech Modern Language", "c) Hyperlink and Text Markup Language", "d) Home Tool for Multimedia Language"],
        answer: "a) Hyper Text Markup Language"
    },
    {
        question: "Which of the following is not a front-end web development technology?",
        options: ["a) HTML", "b) Java", "c) CSS", "d) JavaScript"],
        answer: "b) Java"
    },
    {
        question: "What is the primary purpose of CSS (Cascading Style Sheets) in web development?",
        options: ["a) Managing server-side functionality", "b) Defining the structure and content of a web page", "c) Styling the visual presentation of a web page", "d) Interacting with databases"],
        answer: "c) Styling the visual presentation of a web page"
    },
    {
        question: "Which HTTP status code represents a successful HTTP request in web development?",
        options: ["a) 200 OK", "b) 404 Not Found", "c) 503 Service Unavailable", "d) 302 Found"],
        answer: "a) 200 OK"
    },
    {
        question: "What is the purpose of JavaScript in web development?",
        options: ["a) To store data on the server", "b) To style web pages", "c) To add interactivity and behavior to web pages", "d) To define the structure of a web page"],
        answer: "c) To add interactivity and behavior to web pages"
    },
    {
        question: "Which web development concept ensures that a website looks and functions well on various device sizes and screen resolutions?",
        options: ["a) HTTP", "b) Responsive Web Design", "c) JavaScript", "d) SSL"],
        answer: "b) Responsive Web Design"
    },
    {
        question: "Which of the following is an example of a back-end programming language in web development?",
        options: ["a) HTML", "b) CSS", "c) Python", "d) jQuery"],
        answer: "c) Python"
    },
    {
        question: "What does DOM stand for in web development?",
        options: ["a) Data Object Model", "b) Document Orientation Model", "c) Digital Object Model", "d) Document Object Model"],
        answer: "d) Document Object Model"
    },
    {
        question: "What is the purpose of version control systems (VCS) like Git in web development?",
        options: ["a) To secure web applications from hacking attempts", "b) To enhance the performance of web servers", "c) To track and manage changes in code and collaborate with others", "d) To optimize database queries"],
        answer: "c) To track and manage changes in code and collaborate with others"
    },
    {
        question: "Which of the following is not an HTTP request method used in web development?",
        options: ["a) GET", "b) POST", "c) FETCH", "d) PUT"],
        answer: "c) FETCH"
    }
];

let currentQuestion = 0;
let score = 0;
let playerName = "";

const questionElement = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const scoreElement = document.getElementById("score");
const resultElement = document.getElementById("result");

const startButton = document.getElementById("startButton");
const playerNameInput = document.getElementById("playerName");
const nextButton = document.getElementById("next"); // Added Next button

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", setNextQuestion); // Added event listener for Next button

function startQuiz() {
    playerName = playerNameInput.value;
    if (playerName.trim() === "") {
        alert("Please enter your name to start the quiz.");
        return;
    }

    playerNameInput.disabled = true;
    startButton.disabled = true;

    score = 0;
    currentQuestion = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestion < questions.length) {
        showQuestion(questions[currentQuestion]);
        currentQuestion++; // Move to the next question
    } else {
        displayResult();
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.options.forEach((option, index) => {
        optionButtons[index].innerText = option;
        optionButtons[index].addEventListener("click", () => checkAnswer(option, question.answer));
    });
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        optionButtons.forEach(button => {
            if (button.textContent === selectedOption) {
                button.classList.add("correct");
            }
        });
        score++;
    } else {
        optionButtons.forEach(button => {
            if (button.textContent === selectedOption) {
                button.classList.add("incorrect");
            }
            if (button.textContent === correctAnswer) {
                button.classList.add("correct");
            }
        });
    }
    optionButtons.forEach(button => (button.disabled = true));
    scoreElement.textContent = score;
}

function resetState() {
    optionButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove("correct", "incorrect");
    });
}

function displayResult() {
    if (score > 5) {
        resultElement.textContent = `Congratulations, ${playerName}! You're a winner! Your score is ${score} out of ${questions.length*2}.`;
    } else {
        resultElement.textContent = `Sorry, ${playerName}. You are losing the game. Your score is ${score} out of ${questions.length}.`;
    }
}