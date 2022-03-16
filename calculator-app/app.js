const body = document.body;
const selectTheme = document.querySelector('.select-theme');
const themes = ['dark', 'light', 'ugly'];
const localStorage = window.localStorage;
const buttons = document.querySelectorAll('button');
const screen = document.querySelector('.number');

const operations = ['+', '-', '/', 'x'];

class Calculator {

    constructor() {
        this.num1;
        this.num2;
        this.result;
        this.operators;
    }
    // Update screen when any number or operator is pressed
    updateScreen(button) {
        const buttonValue = button.textContent;
        const lastChar = parseInt(screen.textContent.slice(screen.textContent.length - 1));

        if (button.classList.contains('misc')) return;

        if (button.classList.contains('operator')) {
            if (screen.textContent !== '' && !isNaN(lastChar)) {
                screen.textContent += buttonValue;
            }
            return;
        }
        screen.textContent += buttonValue;
    }

    clearScreen() {
        screen.textContent = '';
        this.calc();
    }

    delete() {
        if (screen.textContent === '') return;
        screen.textContent = screen.textContent.slice(0, -1);
        this.calc();
    }

    equal() {
        let expression = [];
        expression = screen.textContent.split(this.operators[0]);

        this.num1 = parseFloat(expression[0]);
        this.num2 = parseFloat(expression[1]);
        this.doOperation(this.operators[0]);

        if (this.result === undefined) return;

        screen.textContent = this.decimalAmount();
    }

    calc() {
        this.operators = [];
        let expression = [];

        for (let i = 0; i < screen.textContent.length; i++) {
            if (
                screen.textContent[i] === '+' ||
                screen.textContent[i] === '-' ||
                screen.textContent[i] === '/' ||
                screen.textContent[i] === 'x'
            ) {
                this.operators.push(screen.textContent[i]);
            }
        }

        // Add first expression
        if (this.operators.length === 2) {
            expression = screen.textContent.split(this.operators[0]);

            if (isNaN(expression[1][expression[1].length - 1])) {
                expression[1] = expression[1].slice(0, -1);
            }

            this.num1 = parseFloat(expression[0]);
            this.num2 = parseFloat(expression[1]);

            this.doOperation(this.operators[0]);
            this.operators.shift();

            screen.textContent = this.decimalAmount() + this.operators[0];
        }
    }

    // Calculate numbers and set result
    doOperation(operator) {
        switch (operator) {
            case '+':
                this.result = this.num1 + this.num2;
                break;
            case '-':
                this.result = this.num1 - this.num2;
                break;
            case '/':
                this.result = this.num1 / this.num2;
                break;
            case 'x':
                this.result = this.num1 * this.num2;
                break;
        }
    }
// If result have a decimal set the max to 2 or return result untouched
    decimalAmount() {
        return String(this.result).includes('.') ? this.result.toFixed(2) : this.result.toFixed(0);
    }
}

const calculator = new Calculator();

// Set theme from local storage if exists 
document.addEventListener('DOMContentLoaded', () => getTheme());

// Select theme
selectTheme.addEventListener('input', e => chooseTheme(parseInt(e.target.value)));

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.updateScreen(button);
        calculator.calc();

        if (button.classList.contains('reset')) calculator.clearScreen();
        if (button.classList.contains('delete')) calculator.delete();
        if (button.classList.contains('equal')) calculator.equal();
    });
});
// Load theme from local storage
function getTheme() {
    const theme = localStorage.getItem('theme');

    if (theme === null) return;
    body.dataset.theme = theme;
}

// Set theme
function chooseTheme(selectedThemeIndex) {
    body.dataset.theme = themes[selectedThemeIndex];
    localStorage.setItem('theme', themes[selectedThemeIndex]);
}