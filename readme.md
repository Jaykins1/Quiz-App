# Interactive Quiz Game

A responsive, feature-rich quiz application built with pure HTML, CSS, and JavaScript. Test your knowledge with timed questions, get immediate feedback, and track your progress through multiple challenges.

![Quiz Game Screenshot](quiz-game-./screenshot/quiz.png)

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Customization](#customization)
- [Installation](#installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)


## Features

- **Clean, Modern UI**: Sleek design with responsive layout
- **Timed Questions**: 60-second timer for each question
- **Immediate Feedback**: Visual indication of correct/incorrect answers
- **Score Tracking**: Real-time score counter as you progress
- **Progress Indicator**: Shows current question number and total questions
- **Time Pressure**: Visual warning when time is running low
- **Auto-Advance**: Automatically moves to next question after answer or time-out
- **Game Over Screen**: Summary of final score
- **Restart Functionality**: Option to restart quiz with fresh questions

## Demo

To see a live demo of the quiz, [click here](#) or follow the installation instructions below to run it locally.

## Project Structure

The project consists of three main files:

```
quiz-game/
├── index.html      # Structure of the quiz interface
├── style.css       # Styling and animations
└── script.js       # Quiz logic and functionality
```

### HTML Structure

- Container with centered quiz content
- Question display
- Score tracker
- Timer display
- Answer options with selection buttons
- Progress indicator
- End-game screen with restart button

### CSS Features

- Responsive design for various screen sizes
- Clean typography with Google's Roboto font
- Visually appealing purple and white color scheme
- Styled buttons with hover and active states
- Visual feedback for correct/incorrect answers
- Animated timer warning when time is running low
- Smooth transitions between questions

### JavaScript Components

- `Quiz` constructor for managing questions and game state
- `Question` constructor for individual question properties
- `QuizUI` object to handle the display and user interaction
- Timer implementation with auto-advance
- Score calculation and progress tracking
- Immediate feedback system
- Quiz restart functionality

## How It Works

1. **Initialization**:
   - Questions are defined with text, answer choices, and correct answer
   - Quiz object is created with questions loaded
   - UI is initialized with the first question

2. **Gameplay**:
   - User is presented with a question and four possible answers
   - A 60-second timer starts counting down
   - User selects an answer by clicking a button

3. **Answer Processing**:
   - Selection is compared to the correct answer
   - Score is updated if answer is correct
   - Visual feedback shows if answer was correct/incorrect
   - If incorrect, the correct answer is displayed

4. **Question Advancement**:
   - After feedback (2-second delay), next question is loaded
   - Timer resets to 60 seconds
   - Progress indicator updates

5. **Time Management**:
   - If timer reaches zero before selection, question is marked incorrect
   - Correct answer is displayed
   - Quiz advances to next question after 2 seconds

6. **Quiz Completion**:
   - After all questions are answered, a game over screen appears
   - Final score is displayed
   - Restart button allows replaying the quiz

## Customization

### Adding/Modifying Questions

Open `script.js` and locate the questions array. Each question follows this format:

```javascript
new Question("Question text?", ["Option 1", "Option 2", "Option 3", "Option 4"], "Correct Answer")
```

To add a new question, simply add a new entry to the array:

```javascript
new Question("Your new question?", ["Choice 1", "Choice 2", "Choice 3", "Choice 4"], "Choice 2")
```

### Changing Timer Duration

To adjust the time per question, modify the `timeRemaining` value in the `Quiz` constructor in `script.js`:

```javascript
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.timeRemaining = 60; // Change this value (in seconds)
    this.timer = null;
}
```

### Styling Changes

To modify the appearance, edit `style.css`:

- Change the main color scheme by updating the background color (currently `#8c52ff`)
- Modify button styles by editing the `.btn--default` class
- Adjust font sizes, spacing, and other visual elements as needed

## Installation

1. **Clone or download this repository**:
   ```
   git clone https://github.com/Jaykins1/quiz-game.git
   ```
   Or download and extract the ZIP file

2. **Open the project folder**:
   ```
   cd quiz-game
   ```

3. **Launch the application**:
   - Double-click on `index.html` or
   - Open `index.html` with your preferred web browser

## Usage

1. Read each question carefully
2. Select an answer by clicking the corresponding button
3. Receive immediate feedback on your selection
4. Watch your score increase with correct answers
5. Keep an eye on the timer – you have 60 seconds per question
6. After completing all questions, view your final score
7. Click "Restart Quiz" to play again

## Future Enhancements

Possible improvements for future versions:

- Multiple quiz categories to choose from
- Difficulty levels (easy, medium, hard)
- Local storage to save high scores
- Multiplayer mode
- Sound effects for correct/incorrect answers
- Question shuffling for repeat plays
- More detailed statistics at the end of the quiz
- Mobile app version

## Contributing

Contributions are welcome! If you'd like to improve this quiz game:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request


Created by [Akintan Oluwagbenro Jeremiah]