"use strict";

document.addEventListener('DOMContentLoaded', () => {


//--------------------------------------------   Changing Active Navigation according to scrolling
    const parallaxContainer = document.querySelector('.parallax'),
        sections = document.querySelectorAll('[data-section]'),
        positionsTop = [],
        positionsBot = [];
    let nextLogIndex = 0;

    sections.forEach((section, i) => {
        positionsTop[i] = section.getBoundingClientRect().top;
        positionsBot[i] = section.getBoundingClientRect().bottom;
    });



    //--------------------------------------------   Side-nav-animation
    function changeActiveNavItem(index) {
        const items = document.querySelectorAll('.sidenav__item');
        console.log(items);

        items.forEach(item => {
            item.addEventListener('click', () => {
                items.forEach(item => {
                    item.classList.remove('active');
                });
                item.classList.add('active');
            });
        });

        if (index || index === 0) {
            items[index].click();
        }
    }

    changeActiveNavItem();

    console.log(positionsTop);
    console.log(positionsBot);

    parallaxContainer.addEventListener('scroll', () => {
        const offset = parallaxContainer.scrollTop;
        const middleOfViewport = window.innerHeight / 2; // Middle of the viewport

        // Check if the top of the section reaches the middle of the viewport when scrolling down
        if (nextLogIndex < positionsTop.length - 1 && offset + middleOfViewport >= positionsTop[nextLogIndex + 1]) {
            nextLogIndex++;
            changeActiveNavItem(nextLogIndex);
            console.log('Down');
            console.log(`Position: ${positionsTop[nextLogIndex]}, Index: ${nextLogIndex}, Offset: ${offset}`);
            
        }

        // Check if the bottom of the section reaches the middle of the viewport when scrolling up
        if (nextLogIndex > 0 && offset + middleOfViewport <= positionsBot[nextLogIndex - 1]) {
            nextLogIndex--;
            changeActiveNavItem(nextLogIndex);
            console.log('Up');
            console.log(`Position: ${positionsBot[nextLogIndex]}, Index: ${nextLogIndex}, Offset: ${offset}`);
        }
    });


});

    