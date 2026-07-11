"use strict";

//DOM SELECTION GLOBAL
const btnScrollTo = document.querySelector(".btn-text");
const section1 = document.querySelector("#section-1");
const allSections = document.querySelectorAll(".section");
const nav = document.querySelector(".nav");
const footerNav = document.querySelector(".footer-nav");
const tabsContainer = document.querySelector(".operations-tab-container");
const tabs = document.querySelectorAll(".operations-tab");
const tabsContent = document.querySelectorAll(".operations-content");
// on clcick learn btn move to feature


btnScrollTo.addEventListener("click", function (e) {
  e.preventDefault();

  const s1coords = section1.getBoundingClientRect();

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  });
});

// on scroll move offset all section reveal section
const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

// feature img reveal on scroll

// on hover nav link bright only the hover navlink

const handleHoverHeader = function (e) {
  if (!e.target.classList.contains("nav-link")) return;

  const link = e.target;
  const sibiling = link.closest(".nav").querySelectorAll(".nav-link");
  const logo = link.closest(".nav").querySelector(".logo");

  sibiling.forEach((el) => {
    if (el !== link) el.style.opacity = this;
  });

  logo.style.opacity = this;
};

nav.addEventListener("mouseover", handleHoverHeader.bind(0.5));
nav.addEventListener("mouseout", handleHoverHeader.bind(1));

// for footer

const handleHoverFooter = function (e) {
  if (!e.target.classList.contains("footer-link")) return;

  const link = e.target;
  const sibilingFooter = link
    .closest(".footer-nav")
    .querySelectorAll(".footer-link");

  sibilingFooter.forEach((el) => {
    if (el !== link) el.style.opacity = this;
  });
};

footerNav.addEventListener("mouseover", handleHoverFooter.bind(0.5));
footerNav.addEventListener("mouseout", handleHoverFooter.bind(1));

// on click nav link take to respective location
document.querySelector(".nav-links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

//Nav goes stickey on section 1

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//operation btn on click puss up rest down and change side as per data

tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();

  const clicked = e.target.closest(".operations-tab");
  if (!clicked) return;

  // Remove active classes
  tabs.forEach((t) => t.classList.remove("operations-tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations-content--active"));

  // Activate clicked tab
  clicked.classList.add("operations-tab--active");

  // Activate corresponding content
  document
    .querySelector(`.operations-content--${clicked.dataset.tab}`)
    .classList.add("operations-content--active");
});

//testimoneal left and right arrow
//Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider-btn--left");
  const btnRight = document.querySelector(".slider-btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots-dot" data-slide="${i}"></button>`,
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots-dot--active")
      .forEach((dot) => dot.classList.remove("dots-dot--active"));

    document
      .querySelector(`.dots-dot[data-slide="${slide}"]`)
      .classList.add("dots-dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`),
    );
  };

  const nextSlide = function () {
    curSlide = curSlide === maxSlide - 1 ? 0 : curSlide + 1;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    curSlide = curSlide === 0 ? maxSlide - 1 : curSlide - 1;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnLeft.addEventListener("click", prevSlide);
  btnRight.addEventListener("click", nextSlide);

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots-dot")) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};

slider();
