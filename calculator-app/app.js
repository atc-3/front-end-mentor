const body = document.body;
const selectTheme = document.querySelector('.select-theme');
const themes = ['dark', 'light', 'ugly'];
const localStorage = window.localStorage;
const buttons = document.querySelectorAll('button');
const screen = document.querySelector('.number');

const operations = ['+', '-', '/', 'x'];
let result;

// Set theme from local storage if exists 
document.addEventListener('DOMContentLoaded', () => {
    getTheme();
});

selectTheme.addEventListener('input', e => {
    chooseTheme(parseInt(e.target.value));
});

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        updateScreen(button);
        calculateValue();

        if (button.classList.contains('reset')) {
            clearScreen();
            result = 0;

        }
        if (button.classList.contains('delete')) {
            deleteNumber();
        }

        if (button.classList.contains('equal')) {
            if (result !== undefined) {
                screen.textContent = result;
            }
        }
    });
});
// Load theme from local storage
function getTheme() {
    const theme = localStorage.getItem('theme');

    if (theme === null) {
        return;
    }
    body.dataset.theme = theme;
}

// Set theme
function chooseTheme(selectedThemeIndex) {
    body.dataset.theme = themes[selectedThemeIndex];
    localStorage.setItem('theme', themes[selectedThemeIndex]);
}

// Update screen when any number or operator is pressed
function updateScreen(button) {
    const buttonValue = button.textContent;

    if (button.classList.contains('misc')) return;

    if (button.classList.contains('operator')) {
        if (screen.textContent !== '') {
            screen.textContent += buttonValue;
        }
        return;
    }

    screen.textContent += buttonValue;
}

function clearScreen() {
    screen.textContent = '';
}

function deleteNumber() {
    if (screen.textContent === '') return;

    screen.textContent = screen.textContent.slice(0, -1);
}


function calculateValue() {
    let num1, num2;

    let operator = operations.filter((operator) => {
        return screen.textContent.includes(operator);
    });

    if (operator.length >= 1) {

        if (operator.length > 1) {
            operator = operator.pop();
        }

        const operatorIndex = screen.textContent.indexOf(operator[0]);

        prevNum = parseInt(screen.textContent[operatorIndex - 1]);
        nextNum = parseInt(screen.textContent[operatorIndex + 1]);

        // Make sure numbers before and after the operator are valid
        if (!isNaN(prevNum) && !isNaN(nextNum)) {
            const splitNumbers = screen.textContent.split(operator[0]);


            num1 = parseFloat(splitNumbers[0]);
            num2 = parseFloat(splitNumbers[1]);

            console.log(num2);


            doOperation(num1, num2, operator);
        }
        console.log(`Result: ${result}`);



        // Check for a operation after complete expression then display result (result[operation])
        if ((!isNaN(num2) || num2 !== undefined) &&
            screen.textContent[screen.textContent.length - 1] === '+' ||
            screen.textContent[screen.textContent.length - 1] === '-' ||
            screen.textContent[screen.textContent.length - 1] === '/' ||
            screen.textContent[screen.textContent.length - 1] === 'x'
        ) {
            console.log('update');
            screen.textContent = result + screen.textContent.slice(-1);
        }


    }
}

// Do the calculation for the 2 numbers
function doOperation(num1, num2, operator) {
    switch (operator[0]) {
        case '+':
            result = num1 + num2;
            break;

        case '-':
            result = num1 - num2;
            break;

        case '/':
            result = num1 / num2;
            break;

        case 'x':
            result = num1 * num2;
            console.log('multiply');
            break;
    }

    return result;
}
