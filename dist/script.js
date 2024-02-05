/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_openMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/openMenu */ "./src/js/modules/openMenu.js");
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modals */ "./src/js/modules/modals.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js");





document.addEventListener('DOMContentLoaded', () => {
  Object(_modules_openMenu__WEBPACK_IMPORTED_MODULE_0__["default"])('.hamburger', '.mobilemenu', '.mobilemenu__login', true, true);
  Object(_modules_openMenu__WEBPACK_IMPORTED_MODULE_0__["default"])('.menu__item_socials', '.menu__item_icons', '.mobilemenu__login');
  Object(_modules_modals__WEBPACK_IMPORTED_MODULE_1__["default"])();
  Object(_modules_form__WEBPACK_IMPORTED_MODULE_2__["default"])();

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
  articleItems.forEach(item => {
    item.classList.add('animate__animated');
  });
  function animateArticles(index) {
    if (index > 0) {
      index = index * 2;
      articleItems[index - 2].style.visibility = 'visible';
      checkSide(articleItems[index - 2]);
      articleItems[index - 1].style.visibility = 'visible';
      checkSide(articleItems[index - 1]);
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

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const forms = () => {
  const forms = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input'),
    server = 'assets/server.php';
  const message = {
    loading: 'Loading...',
    login: "Log-in success",
    failure: 'Something went wrong...',
    spinner: 'assets/icons/form/spinner.gif',
    ok: 'assets/icons/form/ok.png',
    fail: 'assets/icons/form/fail.png'
  };
  const clearInputs = () => {
    inputs.forEach(input => input.value = '');
  };
  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: 'POST',
      body: data
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return await res.text();
  };
  const animateStatus = item => {
    item.classList.add('animate__animated', 'animate__fadeIn');
    setTimeout(() => {
      item.classList.remove('animate__fadeIn');
      item.classList.add('animate__fadeOut');
      setTimeout(() => {
        item.style.display = 'none';
      }, 800);
    }, 3000);
  };
  const showBtnImg = (parent, src, alt) => {
    const img = document.createElement('img');
    img.style.width = '30px';
    img.src = src;
    img.alt = alt;
    parent.innerHTML = '';
    animateStatus(img);
    parent.appendChild(img);
  };
  forms.forEach(form => {
    const button = form.querySelector('button'),
      oldValue = button.innerHTML;
    let modalMessage;
    if (form.closest('.popup')) {
      modalMessage = document.createElement('div');
      modalMessage.classList.add('title');
      modalMessage.style.marginTop = '10px';
      form.appendChild(modalMessage);
    }
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(form);
      showBtnImg(button, message.spinner, message.loading);
      modalMessage.textContent = message.loading;
      modalMessage.style.display = 'block';
      postData(server, formData).then(res => {
        showBtnImg(button, message.ok, 'ok');
        modalMessage.textContent = message.login;
        modalMessage.style.display = 'block';
        console.log(res);
      }).catch(() => {
        showBtnImg(button, message.fail, 'fail');
        modalMessage.textContent = message.failure;
        modalMessage.style.display = 'block';
      }).finally(() => {
        setTimeout(() => {
          clearInputs();
          button.innerHTML = oldValue;
          modalMessage.style.display = 'none';
        }, 3800);
      });
    });
  });
};
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./src/js/modules/modals.js":
/*!**********************************!*\
  !*** ./src/js/modules/modals.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
    }
    ;
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
    }
    ;
    triggers.forEach(trigger => {
      trigger.addEventListener('click', e => {
        e.preventDefault();
        openModal();
      });
    });
    close.addEventListener('click', () => {
      closeModal();
    });
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        closeModal();
      }
    });
  };
  bindModal('.login', '.popup', '.popup-close');
  bindModal('.mobilemenu__login', '.popup', '.popup-close');
};
/* harmony default export */ __webpack_exports__["default"] = (modals);

/***/ }),

/***/ "./src/js/modules/openMenu.js":
/*!************************************!*\
  !*** ./src/js/modules/openMenu.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const openMenu = (triggerSelector, menuSelector, loginSelector, isAnimated, isOpenMatters) => {
  const trigger = document.querySelector(triggerSelector),
    menu = document.querySelector(menuSelector),
    loginBtn = document.querySelector(loginSelector),
    lines = trigger.querySelectorAll('span');
  let isOpen = false;
  let isSocialOpen = false;
  const toggleMenu = () => {
    if (isOpenMatters) {
      isOpen = !isOpen;
    } else if (isSocialOpen) {
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
  const closeMenu = () => {
    if (isOpenMatters) {
      isOpen = !isOpen;
    }
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
  window.addEventListener('click', e => {
    if (isOpen && !menu.contains(e.target)) {
      closeMenu();
      if (isAnimated) {
        animateHamburger();
      }
    }
  });
  trigger.addEventListener('click', () => {
    toggleMenu();
    if (isAnimated) {
      animateHamburger();
    }
  });
  loginBtn.addEventListener('click', () => {
    closeMenu();
    if (isAnimated) {
      animateHamburger();
    }
  });
};
/* harmony default export */ __webpack_exports__["default"] = (openMenu);

/***/ })

/******/ });
//# sourceMappingURL=script.js.map