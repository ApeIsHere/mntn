const openMenu = (triggerSelector, menuSelector, isAnimated, isOpenMatters) => {
    const trigger = document.querySelector(triggerSelector),
        menu = document.querySelector(menuSelector),
        lines = trigger.querySelectorAll('span');

    let isOpen = false;
    let isSocialOpen = false;

    const toggleMenu = () => {
        if (isOpenMatters) {
            isOpen = !isOpen;
        } else if (isSocialOpen){
            isSocialOpen = !isSocialOpen;

            menu.classList.remove('animate__fadeInDown');
            menu.classList.add('animate__fadeOutUp');
        } else {
            menu.classList.remove('animate__fadeOutUp');
            menu.classList.add('animate__fadeInDown');
            isSocialOpen = !isSocialOpen;
        }

        menu.classList.toggle(`${menuSelector.substring(1)}-active`);
    };

    const closemenu = () => {
        if (isOpenMatters) {isOpen = !isOpen;}

        menu.classList.remove(`${menuSelector.substring(1)}-active`);
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
            if (isAnimated) {animateHamburger();}
        }
    })

    trigger.addEventListener('click', () => {
        toggleMenu();
        if (isAnimated) {animateHamburger();}
    })
}

export default openMenu;