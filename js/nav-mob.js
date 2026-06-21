window.addEventListener('load', () => {
    new PixelSimulation('.screen-2');
});
document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.querySelector('.lines-btn');
    const navContainer = document.querySelector('.nav-container-mob');

    if (burgerBtn && navContainer) {
        burgerBtn.addEventListener('click', () => {
            navContainer.classList.toggle('open');
        });
    }
});