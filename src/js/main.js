"use strict";

document.addEventListener('DOMContentLoaded', () => {


//--------------------------------------------   Changing Active Navigation according to scrolling
    const parallaxContainer = document.querySelector('.parallax'),
        sections = document.querySelectorAll('[data-section]'),
        positionsTop = [],
        positionsBot = [];
    let nextLogIndex = 0,
        isChanged = false,
        isClicked = false;

    sections.forEach((section, i) => {
        positionsTop[i] = section.getBoundingClientRect().top;
        positionsBot[i] = section.getBoundingClientRect().bottom;
    });



    //--------------------------------------------   Side-nav-animation
    function changeActiveNavItem(index) {
        const items = document.querySelectorAll('.sidenav__item');


        items.forEach(item => {
            item.addEventListener('click', () => {
                items.forEach(item => {
                    isClicked = true;
                    item.classList.remove('active');
                });
                item.classList.add('active');

                setTimeout(() => {
                    isClicked = false;
                }, 800);
            });

            if (!isClicked && index >= 0) {
                item.classList.remove('active');
                items[index].classList.add('active');
            }
        });    
    }

    changeActiveNavItem();

    parallaxContainer.addEventListener('scroll', () => {
        if(!isClicked) {
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
        }
    });

    //--------------------------------------------   Slide the blocks in and out

    const articleItems = document.querySelectorAll('.article__text, .article__img');

    articleItems.forEach((item, i) => {
        item.style.display = 'none';
        item.classList.add('animate__animated');
        
        if(i % 2 == 0) {
            item.classList.add('animate__fadeInLeft');
        } else {
            item.classList.add('animate__fadeInRight');
        }
    });
    
    function animateArticles (index) {
        if (index > 0) {
            index = index * 2;
            articleItems[index-2].style.display = 'flex';
            articleItems[index-1].style.display = 'flex';
        }
    }
});

    