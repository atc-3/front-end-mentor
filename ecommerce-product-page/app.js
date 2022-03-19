const burger = document.querySelector('.navbar__burger');
const closeMenu = document.querySelector('.navbar__close');
const nav = document.querySelector('.navbar__mobile-nav');
const overlay = document.querySelector('.overlay');
const navbar = document.querySelector('.navbar');

// Menu 
burger.addEventListener('click', () => {
    nav.classList.toggle('navbar__mobile-nav--show-nav');
    toggleOverlay();
});

closeMenu.addEventListener('click', () => {
    nav.classList.toggle('navbar__mobile-nav--show-nav');
    toggleOverlay();
});

// Toggle overlay for mobile menu
function toggleOverlay() {
    if (nav.classList.contains('navbar__mobile-nav--show-nav')) {
        overlay.style.display = 'unset';
    } else {
        overlay.style.display = 'none';
    }
}