const nav = document.querySelector("#nav");
const bodyDiv = document.querySelector("#body");

// content so that there's no gap between navbar
bodyDiv.style.marginTop = nav.clientHeight.toString() + "px";