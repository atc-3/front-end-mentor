const bill = document.querySelector('.tip__bill-input');
const amounts = document.querySelectorAll('.tip__amount');
const amountOfPeople = document.querySelector('.tip__number-of-people');
const errors = document.querySelectorAll('.error');
const tipAmounts = document.querySelectorAll('.tip__person-amount');
const resetButton = document.querySelector('.tip__reset');

let tip = 0;

bill.addEventListener('focusout', (e) => {
    errorHandling(bill, e.target.value, errors[0]);
});

amountOfPeople.addEventListener('focusout', (e) => {
    errorHandling(amountOfPeople, e.target.value, errors[1]);

});

amountOfPeople.addEventListener('input', () => {
    calculateTip();
});

amounts.forEach((button) => {
    button.addEventListener('click', (e) => {
        selectTip(amounts, e.target);
        tip = e.target.value;
    });
});

resetButton.addEventListener('click', () => {
    reset();
});

function errorHandling(input, data, error) {
    if (data.trim() === '') {
        error.style.display = 'block';
        input.style.outline = 'solid';
        input.style.outlineColor = '#e17457';
    } else {
        error.style.display = 'none';
        input.style.outline = 'unset';
        input.style.outlineColor = 'unset';
    }
}

function selectTip(buttons, selectedButton) {
    const selectedButtonId = selectedButton.dataset.id;

    buttons.forEach(button => {
        const buttonId = button.dataset.id;
        const buttonClass = button.classList;

        if (buttonClass.contains('tip__amount--active') && buttonId !== selectedButtonId) {
            buttonClass.remove('tip__amount--active');
        } else {
            selectedButton.classList.add('tip__amount--active');
        }
    });
}

function calculateTip() {
    if (Number.isInteger(Number(bill.value)) &&
        Number.isInteger(Number(amountOfPeople.value)) &&
        tip !== 0 &&
        amountOfPeople.value !== '') {

        const billAmount = Number(bill.value);
        const people = Number(amountOfPeople.value);

        const tipAmount = (billAmount * tip);
        const totalAmount = tipAmount + billAmount;
        const tipPerPerson = tipAmount / people;
        const totalTip = totalAmount / people;

        tipAmounts[0].innerText = `$${tipPerPerson.toFixed(2)}`;
        tipAmounts[1].innerText = `$${totalTip.toFixed(2)}`;
    }
}

function reset() {
    bill.value = '';
    amountOfPeople.value = '';
    amounts.forEach(button => button.classList.remove('tip__amount--active'));
    tipAmounts.forEach(heading => heading.innerText = '$0.00');
}

