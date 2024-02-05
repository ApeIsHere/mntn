"use strict";

import openMenu from "./modules/openMenu";
import modals from "./modules/modals";
import forms from "./modules/form";
import navigatePage from "./modules/navigation";

document.addEventListener('DOMContentLoaded', () => {
    openMenu(
        '.hamburger',
        '.mobilemenu',
        '.mobilemenu__login',
        true,
        true
    );
    openMenu(
        '.menu__item_socials',
        '.menu__item_icons',
        '.mobilemenu__login'
    );
    modals();
    forms();
    navigatePage();
});

    