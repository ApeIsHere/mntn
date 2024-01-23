"use strict";

document.addEventListener('DOMContentLoaded', () => {


//--------------------------------------------   Changing Active Navigation according to scrolling
    const parallaxContainer = document.querySelector('.parallax'),
        sections = document.querySelectorAll('[data-section]'),
        positionsTop = [],
        positionsBot = [];
    let nextLogIndex = 0,
        isClicked = false;

    sections.forEach((section, i) => {
        positionsTop[i] = section.getBoundingClientRect().top;
        positionsBot[i] = section.getBoundingClientRect().bottom;
    });


    //--------------------------------------------   Side-nav-animation
    function changeActiveNavItem(index = 0) {
        const items = document.querySelectorAll('.sidenav__item');

        items.forEach(item => {
            item.addEventListener('click', () => {
                items.forEach(item => {
                    item.classList.remove('active');
                });

                isClicked = true;
                item.classList.add('active');

                setTimeout(() => {
                    isClicked = false;
                }, 800);
            });

            // this handles scrolling event class toggles
            if (!isClicked && index >= 0) {
                item.classList.remove('active');
                items[index].classList.add('active');
            }
        });    
    }

    changeActiveNavItem();

    parallaxContainer.addEventListener('scroll', () => {
            const offset = parallaxContainer.scrollTop,
                  botOfViewport = window.innerHeight * .75,
                  topOfViewport = window.innerHeight * .25;
    
            // Check if the top of the section reaches the middle of the viewport when scrolling down
            if (nextLogIndex < positionsTop.length - 1 && offset + botOfViewport >= positionsTop[nextLogIndex + 1]) {
                nextLogIndex++;
                changeActiveNavItem(nextLogIndex);
                animateArticles(nextLogIndex);
                console.log('Down');
                console.log(`Position: ${positionsTop[nextLogIndex]}, NextIndex: ${nextLogIndex}, Offset: ${offset}`);               
            }
    
            // Check if the bottom of the section reaches the middle of the viewport when scrolling up
            if (nextLogIndex > 0 && offset + topOfViewport <= positionsBot[nextLogIndex - 1]) {
                nextLogIndex--;
                changeActiveNavItem(nextLogIndex);
                animateArticles(nextLogIndex);
                console.log('Up');
                console.log(`Position: ${positionsBot[nextLogIndex]}, NextIndex: ${nextLogIndex}, Offset: ${offset}`);
            }
    });

    //--------------------------------------------   Slide the blocks in

    const articleItems = document.querySelectorAll('[data-block]');

    articleItems.forEach((item) => {
        item.classList.add('animate__animated');
    });
    
    function animateArticles (index) {
        if (index > 0) {
            index = index * 2;
            articleItems[index-2].style.visibility = 'visible';
            checkSide(articleItems[index-2]);

            articleItems[index-1].style.visibility = 'visible';
            checkSide(articleItems[index-1]);
        }

        function checkSide(element) {
            switch (element.getAttribute('data-block')) {
                case 'left':
                    element.classList.add('animate__fadeInLeft');
                    break;
                case 'right':
                    element.classList.add('animate__fadeInRight');
                    break;
            }
        }
    }
});

    