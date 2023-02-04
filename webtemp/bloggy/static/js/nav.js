const searchbarCtr = document.querySelector("#searchbar-ctr"); // "background" div
const searchForm = document.querySelector("#searchform"); // form w. search bar and search button
const searchInput = document.querySelector("#searchbar"); // search bar
const searchSubmit = document.querySelector("#search-submit"); // search button

const navMenu = document.querySelector("#nav-menu");
const closeMenuBtn = document.querySelector("#close-menu");

const acMenu = document.querySelector("#search-ac-menu"); // autocomplete list

searchbarCtr.style.height = nav.clientHeight.toString() + "px"; // resize searchbar to navbar height

var searchOpen = false;

//listen for scroll
window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.querySelector("#nav h2").style.fontSize = "32px";
        nav.style.padding = "10px 20px";
        searchbarCtr.style.height = nav.clientHeight.toString() + "px";
    } else {
        nav.style.padding = "";
        document.querySelector("#nav h2").style.fontSize = "";
        searchbarCtr.style.height = "91px";
    }
})

// listen for icon click
document.querySelector("#search-ico-ctr").addEventListener("click", () => {
    if (searchOpen == false) {
        acMenu.style.display = "";
        searchbarCtr.style.left = "";
        searchbarCtr.style.display = "flex";
        searchbarCtr.style.animationPlayState = "running";
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

// on unfocus of search bar, close
searchbarCtr.addEventListener("animationend", () => {
    if (!searchOpen) {
        searchOpen = true;
    }
    document.addEventListener("click", e => {
        if (!searchbarCtr.contains(e.target) && searchOpen)
        {
            acMenu.style.display = "none";
            searchForm.style.outline = "";
            searchbarCtr.style.animation = "slide-fade-left-out 1s";
            setTimeout(() => {
                searchbarCtr.style.left = "-100%";
                searchbarCtr.style.display = "";
                searchbarCtr.style.animation = "";
                searchOpen = false;
            }, 400); // wait until animation is done
        }
    }) 
})

// autocomplete options
searchInput.addEventListener("input", async function() {
    if (searchInput.value)
    {
        let results = await fetch('/q?q=' + searchInput.value.replace(/[^\w\s\']|_/g, ""));
        let titles = await results.json();
        // check if autocomplete options
        if (titles != {})
        {
            // clear ac menu
            acMenu.innerHTML = "";
            for (let id in titles)
            {
                acMenu.insertAdjacentHTML("beforeend", `<a class="no-format-a" href="/article/${titles[id].slug}"><li>${titles[id].title.replace('<','&lt;').replace('>','&gt;').replace('&','&amp;').replace('\'', '&#039;').replace('\"', '&quot;')}</li></a>`);
            }
        }
        // if not, suggest searching query
        else {
            acMenu.innerHTML = `<a class="no-format-a" href="/search?q=${searchInput.value}"><li><em>Search '${searchInput.value}'</em></li></a>`;
        }
    }
    // trending/suggested autocomplete
    else {
        let results = await fetch('/t');
        let titles = await results.json();
        acMenu.innerHTML = `<a class="no-format-a" href="/article/${Object.values(titles)[0].slug}"><li>Trending: <em>${Object.keys(titles)[0]}</em></li></a>`;
    }
})