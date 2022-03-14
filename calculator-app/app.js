const body = document.body;
const selectTheme = document.querySelector('.select-theme');
const themes = ['dark', 'light', 'ugly'];
const localStorage = window.localStorage;

// Load theme on page load
document.addEventListener('DOMContentLoaded', () => {
    getTheme();
});

selectTheme.addEventListener('input', e => {
    chooseTheme(parseInt(e.target.value));
});

// Load theme from local storage
function getTheme() {
    const theme = localStorage.getItem('theme');

    if (theme === null) {
        return;
    }
    body.dataset.theme = theme;
}

function chooseTheme(selectedThemeIndex) {
    body.dataset.theme = themes[selectedThemeIndex];
    localStorage.setItem('theme', themes[selectedThemeIndex]);
}


