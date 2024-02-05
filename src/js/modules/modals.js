const modals = () => {

    const bindModal = (triggerSelector, modalSelector, closeSelector) => {
        const triggers = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = modal.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            parallax = document.querySelector('.parallax'),
            scroll = calcScroll();

        function openModal() {
            windows.forEach(window => {
                window.style.display = 'none';
                window.classList.add('animate__animated', 'animate__fadeIn');
            });

            modal.style.display = 'block';
            parallax.style.overflow = 'hidden';
            parallax.style.marginRight = `${scroll}px`;
        }

        function closeModal() {
            windows.forEach(window => {
                window.style.display = "none";
                window.classList.remove('animate__animated', 'animate__fadeIn');
            });

            modal.style.display = 'none';
            parallax.style.overflow = '';
            parallax.style.marginRight = `0px`;
        };

        function calcScroll() {
            let div = document.createElement('div');

            div.style.width = '50px';
            div.style.height = '50px';
            div.style.overflowY = 'scroll';
            div.style.visibility = 'hidden';

            parallax.appendChild(div);
            let scrollWidth = div.offsetWidth - div.clientWidth;
            div.remove();

            return scrollWidth;
        };

        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });

        close.addEventListener('click', () => {
            closeModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    };

    bindModal('.login', '.popup', '.popup-close');
    bindModal('.mobilemenu__login', '.popup', '.popup-close');
};

export default modals;