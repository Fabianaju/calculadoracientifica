const display = document.getElementById('display');
const buttons = Array.from(document.querySelectorAll('.btn'));

let currentInput = '';
let operator = '';
let previousInput = '';
let result = '';

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        const value = e.target.textContent;

        if (action === 'clear') {
            currentInput = '';
            previousInput = '';
            operator = '';
            result = '';
            updateDisplay('0');
        } else if (action === 'equals') {
            if (currentInput && previousInput) {
                result = evaluate();
                updateDisplay(result);
                currentInput = result;
                previousInput = '';
                operator = '';
            }
        } else if (action) {
            if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
                if (currentInput) {
                    previousInput = currentInput;
                    currentInput = '';
                    operator = action;
                }
            } else if (action === 'decimal') {
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                    updateDisplay(currentInput);
                }
            } else if (action === 'pi') {
                currentInput += Math.PI;
                updateDisplay(currentInput);
            } else if (action === 'sqrt') {
                currentInput = Math.sqrt(parseFloat(currentInput)) || '';
                updateDisplay(currentInput);
            } else if (action === 'pow') {
                currentInput = Math.pow(parseFloat(previousInput), 2) || '';
                updateDisplay(currentInput);
            } else if (action === 'sin') {
                currentInput = Math.sin(parseFloat(currentInput)) || '';
                updateDisplay(currentInput);
            } else if (action === 'cos') {
                currentInput = Math.cos(parseFloat(currentInput)) || '';
                updateDisplay(currentInput);
            } else if (action === 'tan') {
                currentInput = Math.tan(parseFloat(currentInput)) || '';
                updateDisplay(currentInput);
            } else if (action === 'log') {
                currentInput = Math.log10(parseFloat(currentInput)) || '';
                updateDisplay(currentInput);
            } else if (action === 'exp') {
                currentInput = Math.exp(parseFloat(currentInput)) || '';
                updateDisplay(currentInput);
            } else {
                currentInput += value;
                updateDisplay(currentInput);
            }
        }
    });
});

function updateDisplay(value) {
    display.textContent = value;
}

function evaluate() {
    let calculation = '';
    switch (operator) {
        case 'add':
            calculation = `${previousInput} + ${currentInput}`;
            break;
        case 'subtract':
            calculation = `${previousInput} - ${currentInput}`;
            break;
        case 'multiply':
            calculation = `${previousInput} * ${currentInput}`;
            break;
        case 'divide':
            calculation = `${previousInput} / ${currentInput}`;
            break;
    }
    try {
        return eval(calculation);
    } catch {
        return 'Error';
    }
}
