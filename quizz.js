document.addEventListener("DOMContentLoaded", function() {
  const quizContainer = document.getElementById('quiz');
  const submitButton = document.getElementById('submit');
  const resultsContainer = document.getElementById('results');

  const questions = [
    {
      question: "Qu'est-ce que HTML ?",
      answers: {
        a: "Un langage de programmation",
        b: "Un langage de balisage",
        c: "Un système d'exploitation"
      },
      correctAnswer: "b"
    },
    {
      question: "Quel est le rôle de CSS ?",
      answers: {
        a: "Structurer le contenu",
        b: "Ajouter du style",
        c: "Gérer la logique du site"
      },
      correctAnswer: "b"
    },
    {
      question: "Que signifie 'DOM' ?",
      answers: {
        a: "Document Object Model",
        b: "Data Object Model",
        c: "Design Object Model"
      },
      correctAnswer: "a"
    }
  ];

  function buildQuiz() {
    const output = [];

    questions.forEach((currentQuestion, questionNumber) => {
      const answers = [];

      for (let letter in currentQuestion.answers) {
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} : ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      output.push(
        `<div class="question">${currentQuestion.question}</div>
        <div class="answers">${answers.join('')}</div>`
      );
    });

    quizContainer.innerHTML = output.join('');
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    questions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswerInput = answerContainer.querySelector(selector);
      const userAnswer = (userAnswerInput || {}).value;

      // Reset styles
      const allLabels = answerContainer.querySelectorAll('label');
      allLabels.forEach(label => label.classList.remove('correct', 'incorrect'));

      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;
        if (userAnswerInput) {
          userAnswerInput.parentElement.classList.add('correct');
        }
      } else {
        if (userAnswerInput) {
          userAnswerInput.parentElement.classList.add('incorrect');
        }
      }
    });

    let message;
    if (numCorrect === questions.length) {
      message = "🎉 Parfait ! Bravo !";
    } else if (numCorrect >= questions.length / 2) {
      message = "👍 Bon travail ! Tu peux encore t'améliorer.";
    } else {
      message = "😕 Tu peux réessayer pour t'améliorer !";
    }

    resultsContainer.innerHTML = `<p>${numCorrect} sur ${questions.length}</p><p>${message}</p>`;
  }

  buildQuiz();
  submitButton.addEventListener('click', showResults);
});
