const slider = document.querySelector('.pricing__slider');
const pageViews = document.querySelector('.pricing__views');
const price = document.querySelector('.pricing__price');
const toggle = document.querySelector('.switch__input');
const pricingData = [
    ['10K', '50K', '100K', '500K', '1M'],// PageViews
    [8, 12, 16, 24, 36]// Prices
];

let isOn = false;

slider.addEventListener('input', e => {
    render(e.target.value);
});

toggle.addEventListener('input', () => {
    isOn = !isOn;
    render(slider.value);
});

function render(value) {
    const yearlyCost = (pricingData[1][value] * 12) - (pricingData[1][value] * 12 * 0.25);

    pageViews.innerText = `${pricingData[0][value]} pageviews`;

    if (isOn) {
        price.innerHTML = `
        $${yearlyCost}.00
        <span class="pricing__plan">/ yearly</span>
        `;
    } else {
        price.innerHTML = `
    $${pricingData[1][value]}.00
    <span class="pricing__plan">/ month</span>
    `;
    }
}