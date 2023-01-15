const searchbar = document.querySelector("#searchbar-ctr"); // "background" div
const searchForm = document.querySelector("#searchform"); // form w. search bar and search button
const searchInput = document.querySelector("#searchbar"); // search bar
const searchSubmit = document.querySelector("#search-submit"); // search button

const navMenu = document.querySelector("#nav-menu");
const closeMenuBtn = document.querySelector("#close-menu");

const afMenu = document.querySelector("#search-af-menu");

searchbar.style.height = nav.clientHeight.toString() + "px"; // resize searchbar to navbar height

var preventSearch = false;
var formSubmit = false;

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
        afMenu.style.display = "";
        searchbar.style.left = "";
        searchbar.style.display = "flex";
        // width of input
        searchInput.style.width = (searchForm.clientWidth - searchSubmit.clientWidth).toString() + "px";
        searchbar.style.animationPlayState = "running";
        searchForm.style.outline = "2px solid #9cf";
    } // wait until animation is done
    
    // scroll down to where user was to prevent scrolling up when search bar is focused
    let x = window.scrollX;
    let y = window.scrollY;
    searchInput.focus({preventScroll: true});
    setTimeout(() => {window.scrollTo(x, y)}, 0.01);
    formFocus = true;
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

searchbar.addEventListener("focusin", () => {
    console.log("Focused");
})

// on unfocus of search bar, close
searchbar.addEventListener("animationend", () => {
    searchbar.addEventListener("focusout", () => {
        if (!formSubmit)
        {
            afMenu.style.display = "none";
            searchForm.style.outline = "";
            searchbar.style.animation = "slide-fade-left-out 1s";
            setTimeout(() => {
                searchbar.style.left = "-100%";
                searchbar.style.display = "";
                searchbar.style.animation = "";
                preventSearch = false;
            }, 400); // wait until animation is done
        }
    }) 
})

// submit search via btn
searchSubmit.addEventListener("click", () => {
    alert("submit!");
    formSubmit = true;
})

// submit search via af
afMenu.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => {
        alert(`submit! ${li.textContent}`);
        formSubmit = true;
    })
})

// autocomplete options
searchInput.addEventListener("input", () => {
    if (!afMenu.querySelector("li")) {
        afMenu.innerHTML = "<li><em>Search</em></li>"
    }
})