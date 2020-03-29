window.onload = () => {
    addMenuListener();
    addPhoneListener();
    addTagsListener();
    addPortfolioItemListener();
    addFormListener();
    sliderCarousel();
    handlerBurgarMenu();
};

// меню бургер

function onScroll2(event) {
    const curPos = window.scrollY + 60;
    const div = document.querySelectorAll("section");
    const links = document.querySelectorAll(".menu_link");

    div.forEach(el => {
        if (el.offsetTop <= curPos && el.offsetTop + el.offsetHeight > curPos) {
            links.forEach(a => {
                a.classList.remove("menu_link_active");

                if (
                    el.getAttribute("id") ===
                    a.getAttribute("href").substring(1)
                ) {
                    a.classList.add("menu_link_active");
                } else if (
                    el.getAttribute("id") === "slider" &&
                    a.getAttribute("href") === "#"
                ) {
                    a.classList.add("menu_link_active");
                } else if (
                    curPos + 1 >=
                        document.documentElement.scrollHeight -
                            document.documentElement.clientHeight &&
                    a.getAttribute("href") === "#contact"
                ) {
                    links.forEach(link => {
                        link.classList.remove("menu_link_active");
                    });
                    a.classList.add("menu_link_active");
                }
            });
        }
    });
}

// меню

document.addEventListener("scroll", onScroll);

function onScroll(event) {
    const curPos = window.scrollY + 95;
    const div = document.querySelectorAll("section");
    const links = document.querySelectorAll(".menu_link");

    div.forEach(el => {
        if (el.offsetTop <= curPos && el.offsetTop + el.offsetHeight > curPos) {
            links.forEach(a => {
                a.classList.remove("menu_link_active");

                if (
                    el.getAttribute("id") ===
                    a.getAttribute("href").substring(1)
                ) {
                    a.classList.add("menu_link_active");
                } else if (
                    el.getAttribute("id") === "slider" &&
                    a.getAttribute("href") === "#"
                ) {
                    a.classList.add("menu_link_active");
                } else if (
                    curPos + 1 >=
                        document.documentElement.scrollHeight -
                            document.documentElement.clientHeight &&
                    a.getAttribute("href") === "#contact"
                ) {
                    links.forEach(link => {
                        link.classList.remove("menu_link_active");
                    });
                    a.classList.add("menu_link_active");
                }
            });
        }
    });
}

const addMenuListener = () => {
    const MENU = document.querySelector(".navigation");

    MENU.addEventListener("click", event => {
        if (event.target.classList.contains("menu_link")) {
            MENU.querySelectorAll("a").forEach(elem =>
                elem.classList.remove("menu_link_active")
            );
            event.target.classList.add("menu_link_active");
        }
    });
};

// экраны телефонов

const addPhoneListener = () => {
    const PHONE = document.querySelector(".slider__phone-conteiner");
    const LEFTPHONE = document.querySelector(".slider__phone-screen-left");
    const RIGHTPHONE = document.querySelector(".slider__phone-screen-right");

    PHONE.addEventListener("click", event => {
        if (
            event.target.classList.contains("slider__phone-button-left") ||
            event.target.classList.contains("slider__phone-button-square-left")
        ) {
            LEFTPHONE.classList.toggle("slider__phone-screen-left");
            LEFTPHONE.classList.toggle("slider__phone-off-left");
        }

        if (
            event.target.classList.contains("slider__phone-button-right") ||
            event.target.classList.contains("slider__phone-button-square-right")
        ) {
            RIGHTPHONE.classList.toggle("slider__phone-screen-right");
            RIGHTPHONE.classList.toggle("slider__phone-off-right");
        }
    });
};

// тэги портфолио

const addTagsListener = () => {
    const TAGS = document.querySelector(".tags");

    TAGS.addEventListener("click", event => {
        if (event.target.classList.contains("tags__item")) {
            TAGS.querySelectorAll(".tags__item").forEach(elem =>
                elem.classList.remove("tags__item-active")
            );
        }
        event.target.classList.add("tags__item-active");
        PortfolioRandomSorting();
    });
};

// случайная сортировка портфолио

const PortfolioRandomSorting = () => {
    const PORTFOLIOITEM = Array.from(
        document.querySelectorAll(".portfolio-item")
    );
    PORTFOLIOITEM.sort(() => Math.random() - 0.5);

    const container = document.querySelector(".portfolio-4-column");

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    PORTFOLIOITEM.forEach(el => {
        container.appendChild(el);
    });
};

// портфолио. рамки на айтемы

const addPortfolioItemListener = () => {
    const PORTFOLIO = document.querySelector(".portfolio-4-column");
    PORTFOLIO.addEventListener("click", event => {
        console.log();
        if (event.target.tagName === "IMG") {
            PORTFOLIO.querySelectorAll(".portfolio-item").forEach(elem => {
                elem.classList.remove("portfolio-item_active");
            });
            console.log(event.target);
            event.target.classList.add("portfolio-item_active");
        }
    });
};
// Get a quote

const createModal = () => {
    let modal = document.createElement("div");
    modal.classList.add("layout-modal");
    let modalSubject = document.querySelector(
        '.contact-form_customize[name="Subject"]'
    ).value;
    let modalDescribe = document.querySelector(
        ".contact-form_customize_textarea"
    ).value;
    modalSubject = modalSubject ? `Тема: ${modalSubject}` : "Без темы";
    modalDescribe = modalDescribe
        ? `Описание: ${modalDescribe}`
        : "Без описания";

    let template = `
    <div class="modal">
        <div class="modal-title">Письмо отправлено</div>
        <div class="modal-line"></div>
        <div class="modal-messege">
            <p class="modal-subject">${modalSubject}</p>
            <p class="modal-describe">${modalDescribe}</p>
        </div>
        <button class="form__button form__button__modal">OK</button>
    </div>`;
    modal.innerHTML = template;

    return modal;
};

const addFormListener = () => {
    const FORM = document.querySelector(".main-form");
    FORM.addEventListener("submit", event => {
        event.preventDefault();
        let modal = createModal();
        document.body.append(modal);
        addFormButtonListener();
        document
            .querySelectorAll(".contact-form_customize")
            .forEach(function(item) {
                item.value = "";
            });
        document.querySelector(".contact-form_customize_textarea").value = "";
    });
};

const closeModal = modal => {
    modal.remove();
};

const addFormButtonListener = () => {
    const MODALBUTTON = document.querySelector(".form__button__modal");
    MODALBUTTON.addEventListener("click", event => {
        closeModal(document.querySelector(".layout-modal"));
    });
};

// слайдер
const sliderCarousel = () => {
    const ITEMS = document.querySelectorAll(".slider__phone-conteiner");
    let currentItem = 0;
    let isEnabled = true;

    function ChangeCurrentItem(n) {
        currentItem = (n + ITEMS.length) % ITEMS.length;
    }

    function hideItem(direction) {
        isEnabled = false;
        ITEMS[currentItem].classList.add(direction);
        ITEMS[currentItem].addEventListener("animationend", function() {
            this.classList.remove("active-slide", direction);
        });
    }

    function showItem(direction) {
        isEnabled = false;
        ITEMS[currentItem].classList.add("next", direction);
        ITEMS[currentItem].addEventListener("animationend", function() {
            this.classList.remove("next", direction);
            this.classList.add("active-slide");
            isEnabled = true;
        });
    }

    const LEFTARROW = document.querySelector(".slider__arrow_left");
    const RIGHTARROW = document.querySelector(".slider__arrow_right");

    function previousItem(n) {
        hideItem("to-right");
        ChangeCurrentItem(n - 1);
        showItem("from-left");
    }

    function nextItem(n) {
        hideItem("to-left");
        ChangeCurrentItem(n + 1);
        showItem("from-right");
    }

    LEFTARROW.addEventListener("click", function() {
        if (isEnabled) {
            previousItem(currentItem);
        }
    });

    RIGHTARROW.addEventListener("click", function() {
        if (isEnabled) {
            nextItem(currentItem);
        }
    });
};

// бургер-меню

const handlerBurgarMenu = () => {
    const burgerButton = document.querySelector(".burger-img");
    const bgButton = document.querySelector(".layout-modal_menu");
    let isOpen = false;

    burgerButton.addEventListener("click", function() {
        if (isOpen === false) {
            isOpen = true;
            openBurger();
            let bgM = document.querySelector(".bg-modal_menu");
            bgM.addEventListener("click", function() {
                isOpen = false;
                closeBurger();
                burgerButton.classList.remove("burger-img_rotate");
                setTimeout(closeBurgerModal, 400);
            });
            let menuIt = document.querySelector(".burger-menu-navigation");
            console.log(menuIt);
            menuIt.addEventListener("click", function() {
                console.log(event.target);
                if (event.target.classList.contains("burger-menu_link")) {
                    isOpen = false;
                    closeBurger();
                    burgerButton.classList.remove("burger-img_rotate");
                    setTimeout(closeBurgerModal, 400);
                }
            });
            burgerButton.classList.add("burger-img_rotate");
        } else if (isOpen === true) {
            isOpen = false;
            closeBurger();
            burgerButton.classList.remove("burger-img_rotate");
            setTimeout(closeBurgerModal, 400);
        }
    });
};

const createBgModal = () => {
    const bgModalc = document.createElement("div");
    bgModalc.classList.add("bg-modal_menu", "to-transparent-bg-menu");
    return bgModalc;
};

const openBurger = () => {
    const bgModal = createBgModal();
    const menu = createBurger();
    document.body.append(bgModal);
    document.body.append(menu);
    document.addEventListener("scroll", onScroll2);
};

const closeBurger = () => {
    const m = document.querySelector(".layout-modal_menu");
    const m_bg = document.querySelector(".bg-modal_menu");
    m.classList.add("from-right-menu", "left-100");
    m_bg.classList.add("from-transparent-bg-menu");
};

const createBurger = () => {
    let modalMenu = document.createElement("div");
    modalMenu.classList.add("layout-modal_menu", "to-left-menu");
    let template = `
    <div class="burger-modal-menu">
            <div class="burger-modal-header">
                <div><a class="burger-header__logo" href="">
                        <h1>Singolo</h1><span class="burger-header__logo_star">*</span>
                    </a>
                </div>
            </div>
            <div class="header-navigation burger-menu-navigation">

                <ul class="navigation burger-navigation">
                    <li class="burger-navigation__item"><a class="menu_link burger-menu_link burger-menu_link_active"
                            href="#">Home</a>
                    </li>
                    <li class="navigation__item burger-navigation__item"><a class="menu_link burger-menu_link" href="#servise">Services</a></li>
                    <li class="navigation__item burger-navigation__item"><a class="menu_link burger-menu_link" href="#portfolio">Portfolio</a></li>
                    <li class="navigation__item burger-navigation__item"><a class="menu_link burger-menu_link" href="#about">About</a></li>
                    <li class="navigation__item burger-navigation__item"><a class="menu_link burger-menu_link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>`;

    modalMenu.innerHTML = template;

    return modalMenu;
};

const closeBurgerModal = () => {
    document.querySelector(".layout-modal_menu").remove();
    document.querySelector(".bg-modal_menu").remove();
};
