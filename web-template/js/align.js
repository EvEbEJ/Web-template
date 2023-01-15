const nav = document.querySelector("nav");
const main = document.querySelector("main");

// content so that there's no gap between navbar
main.style.marginTop = nav.clientHeight.toString() + "px";