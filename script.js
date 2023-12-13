const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Carbon Dioxide"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Cu"],
        correctAnswer: "Au"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "India", "Japan", "South Korea"],
        correctAnswer: "Japan"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "George Orwell"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Brain", "Liver", "Heart", "Skin"],
        correctAnswer: "Skin"
    },
    {
        question: "Which gas makes up the majority of Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Nitrogen"
    },
    {
        question: "What is the smallest planet in our solar system?",
        options: ["Earth", "Mars", "Mercury", "Venus"],
        correctAnswer: "Mercury"
    },
    // Add more questions here...
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 300; // 5 minutes
let isQuizOver = false;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const submitButton = document.getElementById("submit-button");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const timerElement = document.getElementById("timer");
const timeLeftElement = document.getElementById("time-left");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeLeftElement.textContent = formatTime(timeLeft);
        } else {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function handleTimeout() {
    submitButton.disabled = true;
    feedback.textContent = "Time's up! Please click 'Next' to continue.";
    nextButton.disabled = false;
}

function restartQuiz() {
    window.location.reload(); // Reload the page to restart the quiz
}

function startQuiz() {
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        startTimer();
        feedback.textContent = "";
        nextButton.disabled = true;
        restartButton.style.display = "none"; // Hide restart button during the quiz
    } else {
        isQuizOver = true;
        questionText.textContent = "Quiz Complete!";
        optionsContainer.innerHTML = "";
        submitButton.style.display = "none";
        nextButton.style.display = "none";
        timerElement.style.display = "none";
        restartButton.style.display = "block"; // Show restart button when the quiz is complete
    }
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="answer" value="${option}"> ${String.fromCharCode(97 + index)}. ${option}`;
        optionsContainer.appendChild(label);
    });

    submitButton.disabled = false;
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        feedback.textContent = "Please select an answer.";
        return;
    }

    const userAnswer = selectedOption.value;
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer === currentQuestion.correctAnswer) {
        score++;
        feedback.textContent = "Correct!";
    } else {
        feedback.textContent = `Incorrect. The correct answer is ${currentQuestion.correctAnswer}.`;
    }

    submitButton.disabled = true;
    scoreDisplay.textContent = `Score: ${score}`;
    nextButton.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (!isQuizOver) {
        clearInterval(timer);
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
            feedback.textContent = "";
            startTimer();
            nextButton.disabled = true;
        } else {
            isQuizOver = true;
            questionText.textContent = "Quiz Complete!";
            optionsContainer.innerHTML = "";
            submitButton.style.display = "none";
            nextButton.style.display = "none";
            timerElement.style.display = "none";
            restartButton.style.display = "block"; // Show restart button when the quiz is complete
        }
    }
}

submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

startQuiz();
