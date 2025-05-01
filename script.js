function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.timeRemaining = 60; // 60 seconds per question
    this.timer = null;
}

Quiz.prototype.guess = function(answer) {
    return this.getCurrentQuestion().isCorrectAnswer(answer);
};

Quiz.prototype.nextQuestion = function() {
    this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
};

Quiz.prototype.reset = function() {
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.timeRemaining = 60;
    this.stopTimer();
};

Quiz.prototype.startTimer = function() {
    var self = this;
    this.timeRemaining = 60;
    this.stopTimer(); // Clear any existing timer
    
    this.timer = setInterval(function() {
        self.timeRemaining--;
        QuizUI.updateTimer();
        
        if (self.timeRemaining <= 0) {
            self.stopTimer();
            QuizUI.displayFeedback(false, self.getCurrentQuestion().answer);
            QuizUI.disableButtons();
            
            setTimeout(function() {
                self.nextQuestion();
                QuizUI.displayNext();
            }, 2000);
        }
    }, 1000);
};

Quiz.prototype.stopTimer = function() {
    if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
    }
};

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
};

var QuizUI = {
    displayNext: function() {
        if (quiz.hasEnded()) {
            quiz.stopTimer();
            this.displayScore();
        } else {
            // Restore original quiz structure if needed
            if (!document.getElementById("question")) {
                this.restoreQuizStructure();
            }
            
            this.clearFeedback();
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
            this.updateScore();
            this.updateTimer();
            
            // Start timer for the question
            quiz.startTimer();
        }
    },
    
    displayQuestion: function() {
        this.populateIdWithHtml("question", quiz.getCurrentQuestion().text);
    },

    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;

        for (var i = 0; i < choices.length; i++) {
            this.populateIdWithHtml("choice" + i, choices[i]);
            // Make sure buttons are enabled for the new question
            var button = document.getElementById("guess" + i);
            button.disabled = false;
            this.guessHandler("guess" + i, choices[i]);
        }
    },

    displayScore: function() {
        var gameOverHtml = "<h1>Game Over</h1>";
        gameOverHtml += "<h2>Your score is: " + quiz.score + "/" + quiz.questions.length + "</h2>";
        gameOverHtml += "<button id='restart' class='btn--default'>Restart Quiz</button>";
        this.populateIdWithHtml("quiz", gameOverHtml);
        
        // Add event listener to restart button
        var self = this;
        document.getElementById("restart").addEventListener("click", function() {
            quiz.reset();
            self.displayNext();
        });
    },

    populateIdWithHtml: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },

    guessHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            // Stop the timer
            quiz.stopTimer();
            
            // Remove any previous feedback
            QuizUI.clearFeedback();
            
            // Check if answer is correct and provide feedback
            var isCorrect = quiz.guess(guess);
            if (isCorrect) {
                quiz.score++;
                QuizUI.displayFeedback(true);
            } else {
                QuizUI.displayFeedback(false, quiz.getCurrentQuestion().answer);
            }
            
            // Update the score display
            QuizUI.updateScore();
            
            // Disable all buttons after selection
            QuizUI.disableButtons();
            
            // Show next button or proceed to next question after delay
            setTimeout(function() {
                quiz.nextQuestion();
                QuizUI.displayNext();
            }, 400); // 2 second delay
        };
    },

    displayProgress: function() {
        var currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHtml("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
    },
    
    updateScore: function() {
        this.populateIdWithHtml("score", "Score: " + quiz.score + "/" + quiz.questions.length);
    },
    
    updateTimer: function() {
        var timerElement = document.getElementById("timer");
        if (timerElement) {
            // Format time as MM:SS
            var minutes = Math.floor(quiz.timeRemaining / 60);
            var seconds = quiz.timeRemaining % 60;
            var formattedTime = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
            
            timerElement.innerHTML = formattedTime;
            
            // Add warning class when time is running low
            if (quiz.timeRemaining <= 10) {
                timerElement.classList.add('timer-warning');
            } else {
                timerElement.classList.remove('timer-warning');
            }
        }
    },
    
    displayFeedback: function(isCorrect, correctAnswer) {
        var feedbackDiv = document.createElement("div");
        feedbackDiv.id = "feedback";
        feedbackDiv.className = isCorrect ? "feedback-correct" : "feedback-incorrect";
        
        if (isCorrect) {
            feedbackDiv.innerHTML = "<p>Correct!</p>";
        } else {
            feedbackDiv.innerHTML = "<p>Incorrect! The correct answer is: " + correctAnswer + "</p>";
        }
        
        // Insert feedback after the question
        var questionElement = document.getElementById("question");
        questionElement.parentNode.insertBefore(feedbackDiv, questionElement.nextSibling);
    },
    
    clearFeedback: function() {
        var feedback = document.getElementById("feedback");
        if (feedback) {
            feedback.parentNode.removeChild(feedback);
        }
    },
    
    disableButtons: function() {
        for (var i = 0; i < quiz.getCurrentQuestion().choices.length; i++) {
            document.getElementById("guess" + i).disabled = true;
        }
    },
    
    restoreQuizStructure: function() {
        // Reconstruct the original quiz HTML structure
        var quizHtml = `
            <h1>General Knowledge</h1>
            <h2 id="question" class="headline-secondary--grouped"></h2>
            <h3 id="score"></h3>
            <div id="timer-container">Time: <span id="timer">01:00</span></div>

            <p id="choice0"></p>
            <button id="guess0" class="btn--default">Select Answer</button>

            <p id="choice1"></p>
            <button id="guess1" class="btn--default">Select Answer</button>

            <p id="choice2"></p>
            <button id="guess2" class="btn--default">Select Answer</button>

            <p id="choice3"></p>
            <button id="guess3" class="btn--default">Select Answer</button>
        
            <footer>
                <p id="progress">Question x of y</p>
            </footer>
        `;
        
        document.getElementById("quiz").innerHTML = quizHtml;
    }
};

// Create questions
var questions = [
    new Question("What is the capital of France?", ["Paris", "London", "Berlin", "Madrid"], "Paris"),
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4"),
    new Question("What is the largest planet in our solar system?", ["Earth", "Mars", "Jupiter", "Saturn"], "Jupiter"),
    new Question("Who wrote 'Romeo and Juliet'?", ["Shakespeare", "Hemingway", "Tolkien", "Austen"], "Shakespeare"),
    new Question("What is the chemical symbol for gold?", ["Au", "Ag", "Fe", "Pb"], "Au"),
    new Question("What is the largest mammal?", ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], "Blue Whale")
];

// Create a new quiz
var quiz = new Quiz(questions);

// Display Quiz
QuizUI.displayNext();