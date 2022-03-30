const adviceNumber = document.querySelector('.advice__number');
const quote = document.querySelector('.advice__quote');
const randomQuoteButton = document.querySelector('.advice__change-quote');

randomQuoteButton.addEventListener('click', getQuote);

async function getQuote() {
    let response = await fetch(`https://api.adviceslip.com/advice?t=${Math.random()}`);

    if (response.status === 200) {
        let data = await response.json();
        setQuote(data.slip);
    }
}

function setQuote({ advice, id }) {
    adviceNumber.innerText = id;
    quote.innerText = advice;
}
