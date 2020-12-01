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

  const into = document.querySelector(link);
  into.scrollIntoView({ behavior: "smooth" });
});
