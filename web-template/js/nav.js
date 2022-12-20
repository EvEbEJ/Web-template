const searchbar = document.querySelector("#searchbar-ctr"); // "background" div
const searchForm = document.querySelector("#searchform"); // form w. search bar and search button
const searchInput = document.querySelector("#searchbar"); // search bar
const searchSubmit = document.querySelector("#search-submit"); // search button

const navMenu = document.querySelector("#nav-menu");
const closeMenuBtn = document.querySelector("#close-menu");

searchbar.style.height = nav.clientHeight.toString() + "px"; // resize searchbar to navbar height

searchInput.style.width = (searchForm.clientWidth - searchSubmit.clientWidth).toString() + "px";

var preventSearch = false;

//listen for scroll
window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.querySelector("#nav h2").style.fontSize = "32px";
        nav.style.padding = "10px 20px";
        searchbar.style.height = nav.clientHeight.toString() + "px";
    } else {
        nav.style.padding = "";
        document.querySelector("#nav h2").style.fontSize = "";
        searchbar.style.height = "91px";
    }
})

// listen for icon click
document.querySelector("#search-ico-ctr").addEventListener("click", () => {
    if (preventSearch == false) {
        preventSearch = true;
        searchbar.style.left = "";
        searchbar.style.display = "flex";
        searchInput.style.width = (searchForm.clientWidth - searchSubmit.clientWidth).toString() + "px";
        searchbar.style.animationPlayState = "running";
        searchForm.style.outline = "2px solid #9cf";
    } // wait until animation is done
    
    // scroll down to where user was to prevent scrolling up when search bar is focused
    let x = window.scrollX;
    let y = window.scrollY;
    searchInput.focus({preventScroll: true});
    setTimeout(() => {window.scrollTo(x, y)}, 0.01);
})

document.querySelector("#menu-ico-ctr").addEventListener("click", () => {
    if (navMenu.style.display == "none" || navMenu.style.display == "") {
        navMenu.style.display = "flex";
        navMenu.style.animation = "";
        document.querySelector("body").style.overflow = "hidden";
        navMenu.style.animationPlayState = "running";
        // scroll down to where user was to prevent scrolling up when menu is opened
        let x = window.scrollX;
        let y = window.scrollY;
        navMenu.focus({preventScroll: true});
        setTimeout(() => {window.scrollTo(x, y)}, 0.01);
    }
})

closeMenuBtn.addEventListener("click", () => {
    document.querySelector("body").style.overflow = "";
    navMenu.style.animation = "fade-out 0.5s";
    setTimeout(() => {
        navMenu.style.animationPlayState = "";
        navMenu.style.display = "none";
    }, 400);
})


// on unfocus of search bar, close
searchbar.addEventListener("animationend", () => {
    searchInput.addEventListener("focusout", () => {
        searchForm.style.outline = "";
        searchbar.style.animation = "slide-fade-left-out 1s";
        setTimeout(() => {
            searchbar.style.left = "-100%";
            searchbar.style.display = "";
            searchbar.style.animation = "";
            preventSearch = false;
        }, 900); // wait until animation is done
    }) 
})

// on resize of window, resize width of search bar
window.addEventListener("resize", () => {
    searchInput.style.width = "calc(70vw - 50px)";
})