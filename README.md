# Code Quiz

---

## Site Introduction

The code quiz enables users to begin a short five (5) question quiz over coding. The two-page site features:
* Instructions on How to Play
* Start Button
* Highscores Page
* Dynamic Timer
* Sound Effects for Correct and Incorrect Answer Choices
* Hover Elements

![The function of this button is to begin the game, enabling the Timer to countdown. This button is accessed by pressing "Start Quiz".](./assets/images/Start.jpg)

## Questions and Answers

```
Questions
```

Upon clicking 'Start Quiz', the timer will begin counting down from 75 seconds. A new question will be prompted with 4 possible answer choices. Possible answer choices are also differentiated by appearing within a numbered, orange box.

![The Question appears in a larger, bold white font displaying the first thing the user should look out. When a question is visible to the user, the Timer will have already began counting down.](./assets/images/Answer-Selection-Timer.jpg)

```
Answers
```

If the user clicks on the correct answer, the appropriate "correct" sound can be heard, and the prompt "Correct!" will appear below the 4 possible answer choices but within the solid box. No time penalties for correct answer choices.

![A correct answer choice will show "Correct!"](./assets/images/Correct.jpg)

If an incorrect answer is chosen, the appropriate "incorrect" sound can be heard, and the prompt "Wrong!" will appear below the 4 possible answer choices but within the solid box. A time penalty of 10-seconds, will also be deducted from the timer for incorrect answer choices.

![An incorrect answer choice will show "Wrong!"](./assets/images/Wrong.jpg)


## Highscores Page

The highscores page is a secondary page for displaying and viewing previous quiz attempts.
* Data of scores is stored locally.

![Multiple score inputs are made more visible by the use of stylized CSS elements displaying alternating background colors.](./assets/images/Highscores-Page.jpg)

---