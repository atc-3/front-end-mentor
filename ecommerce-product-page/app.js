const burger = document.querySelector('.navbar__burger');
const closeMenu = document.querySelector('.navbar__close');
const nav = document.querySelector('.navbar__mobile-nav');
const overlay = document.querySelector('.overlay');
const productImages = document.getElementsByClassName('product__img');
const previous = document.querySelector('.product__previous');
const next = document.querySelector('.product__next');

window.addEventListener('DOMContentLoaded', () => {
    productImages[0].remove();
});

// Menu 
burger.addEventListener('click', () => {
    nav.classList.toggle('navbar__mobile-nav--show-nav');
    toggleOverlay();
});

closeMenu.addEventListener('click', () => {
    nav.classList.toggle('navbar__mobile-nav--show-nav');
    toggleOverlay();
});

previous.addEventListener('click', () => {
    console.log('previous');
    prevImage();
});

next.addEventListener('click', () => {
    console.log('next');
    nextImage();
});

// Toggle overlay for mobile menu
function toggleOverlay() {
    if (nav.classList.contains('navbar__mobile-nav--show-nav')) {
        overlay.style.display = 'unset';
    } else {
        overlay.style.display = 'none';
    }
}

function prevImage() {
    let currentImage = getCurrentImage();
    let prevImage = currentImage.previousElementSibling;

    if (prevImage === null) return;

    currentImage.classList.replace('product__img--current', 'product__img--after');
    prevImage.classList.add('product__img--current')

}


function nextImage() {
    let currentImage = getCurrentImage();
    let nextImage = currentImage.nextElementSibling;

    if (nextImage === null) return;

    currentImage.classList.replace('product__img--current', 'product__img--before');
    nextImage.classList.add('product__img--current')

}



function getCurrentImage() {
    for (let i = 0; i < productImages.length; i++) {
        if (productImages[i].classList.contains('product__img--current')) {
            return productImages[i];
        }
    }
}