// Sélection des éléments
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

function updateDisplay(value) {
  display.value = value;
}

function calculate() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  let result = 0;

  if (operator === '+') result = num1 + num2;
  else if (operator === '-') result = num1 - num2;
  else if (operator === '*') result = num1 * num2;
  else if (operator === '/') {
    if (num2 === 0) {
      updateDisplay("Erreur");
      currentInput = '';
      previousInput = '';
      operator = '';
      return;
    }
    result = num1 / num2;
  }

  updateDisplay(result);
  currentInput = result.toString();
  previousInput = '';
  operator = '';
}

// Gestion des clics boutons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (!isNaN(value) || value === '.') {
      currentInput += value;
      updateDisplay(currentInput);
    } else if (value === 'C') {
      currentInput = '';
      previousInput = '';
      operator = '';
      updateDisplay('');
    } else if (value === '=') {
      if (currentInput && previousInput && operator) {
        calculate();
      }
    } else {
      if (currentInput) {
        operator = value;
        previousInput = currentInput;
        currentInput = '';
      }
    }
  });
});
