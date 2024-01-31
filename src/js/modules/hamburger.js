const hamburger = () => {
    const hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.mobilemenu'),
        lines = hamburger.querySelectorAll('span');

    let isOpen = false;

    const toggleMenu = () => {
        isOpen = !isOpen;

        menu.classList.toggle('mobilemenu-active');
    };

    const closemenu = () => {
        isOpen = !isOpen;

        menu.classList.remove('mobilemenu-active');
    };

    const animateHamburger = () => {
        const angle = isOpen ? 45 : 0,
            top = isOpen ? '3.5px' : 'auto';
        lines[0].style.transform = `rotate(${angle}deg)`;
        lines[0].style.top = top;
        lines[1].style.transform = `rotate(-${angle}deg)`;
        lines[1].style.top = -top;
        lines[2].style.opacity = isOpen ? '0' : '1';
    };

    window.addEventListener('click', (e) => {
        if (isOpen && !menu.contains(e.target)) {
            closemenu();
            animateHamburger();
        }
    })

    hamburger.addEventListener('click', () => {
        toggleMenu();
        animateHamburger();
    })
}

export default hamburger;