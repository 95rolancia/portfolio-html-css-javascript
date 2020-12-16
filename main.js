"use strict";

const navbar = document.querySelector("#navbar");
document.addEventListener("scroll", () => {
  if (window.scrollY >= 1) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target =
    event.target.nodeName === "LI" ? event.target : event.target.childNode;
  if (target == null) {
    return;
  }
  const link = target.dataset.link;
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent as the window scrolls down
const homeContainer = document.querySelector(".home__container");
const homeContainerHeight = homeContainer.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  homeContainer.style.opacity =
    (homeContainerHeight - window.scrollY) / homeContainerHeight;
});

// Show arrow up button when scrolls down
const arrowUpBtn = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY >= homeContainerHeight) {
    arrowUpBtn.classList.add("visible");
  } else {
    arrowUpBtn.classList.remove("visible");
  }
});

arrowUpBtn.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Handle projects button
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", (event) => {
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // Remove selection from the previous item and select the
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    event.target.nodeName === "BUTTON" ? event.target : event.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

// Auto select navbar menu
const section = document.querySelectorAll("section");
const sectionIds = ["#home", "#about", "#skills", "#work", "#contact"];

const sections = sectionIds.map((id) => document.querySelector(id));

const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

// skill animation observation
const skills = document.querySelectorAll(".skill__value");
const skillOption = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};
const skillCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("move");
    } else {
      entry.target.classList.remove("move");
    }
  });
};

const skillObserver = new IntersectionObserver(skillCallback, skillOption);
skills.forEach((skill) => skillObserver.observe(skill));

// -----------------------

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

function selectNavItem(selected) {
  selectedNavItem.classList.remove("selected");
  selectedNavItem = selected;
  selectedNavItem.classList.add("selected");
}
