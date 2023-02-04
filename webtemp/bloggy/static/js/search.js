const visAcMenu = document.querySelector("#vis-search-ac-menu"); // search page autocomplete
const visSearchInput = document.querySelector("#vis-searchbar");
const visSearchForm = document.querySelector("#vis-searchform");
const visSearchbarCtr = document.querySelector("#vis-searchbar-ctr");

// autocomplete options
visSearchbarCtr.addEventListener("click", () => {
    visSearchForm.style.outline = "2px solid #9cf";
    visAcMenu.style.display = "";
    document.addEventListener("click", e => {
        if (!visSearchbarCtr.contains(e.target))
        {
            visSearchForm.style.outline = "";
            visAcMenu.style.display = "none";
        }
    }) 
})

visSearchInput.addEventListener("input", async function() {
    if (visSearchInput.value)
    {
        let results = await fetch('/q?q=' + visSearchInput.value.replace(/[^\w\s\']|_/g, ""));
        let titles = await results.json();
        // check if autocomplete options
        if (titles != {})
        {
            // clear ac menu
            visAcMenu.innerHTML = "";
            for (let id in titles)
            {
                visAcMenu.insertAdjacentHTML("beforeend", `<a class="no-format-a" href="/article/${titles[id].slug}"><li>${titles[id].title.replace('<','&lt;').replace('>','&gt;').replace('&','&amp;').replace('\'', '&#039;').replace('\"', '&quot;')}</li></a>`);
            }
        }
        // if not, suggest searching query
        else {
            visAcMenu.innerHTML = `<a class="no-format-a" href="/search?q=${searchInput.value}"><li><em>Search '${searchInput.value}'</em></li></a>`;
        }
    }
    // trending/suggested autocomplete
    else {
        let results = await fetch('/t');
        let titles = await results.json();
        visAcMenu.innerHTML = `<a class="no-format-a" href="/article/${Object.values(titles)[0].slug}"><li>Trending: <em>${Object.keys(titles)[0]}</em></li></a>`;
    }
})