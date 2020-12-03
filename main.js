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
  const link = event.target.dataset.link;
  if (link === null) {
    return;
  }
  scrollIntoView(link);
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

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
