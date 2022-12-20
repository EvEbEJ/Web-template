const bannerLeft = document.querySelectorAll(".band-left");
const blockLeft = document.querySelectorAll(".block-left");
const bannerRight = document.querySelectorAll(".band-right");
const blockRight = document.querySelectorAll(".block-right");

const bannerLeftList = Array.from(bannerLeft);
const blockLeftList = Array.from(blockLeft);
const bannerRightList = Array.from(bannerRight);
const blockRightList = Array.from(blockRight);

// function declarations

function animateBanner(value, index, pos="left")
{
    if (desktop_window)
    {
        if (pos == "left")
        {   
            value.style.left = "20%"; // change banner pos
            blockLeftList[index].style.width = "40%"; // change block size
        }
        else if (pos == "right")
        {
            value.style.right = "20%"; // change banner pos
            blockRightList[index].style.width = "40%"; // change block size
        }
    }
}

function deanimateBanner(value, index, pos="left")
{
    value.style.left = ""; // change banner pos to default
    value.style.right = ""; // change banner pos to default
    if (pos == "left")
    {   
        blockLeftList[index].style.width = ""; // change block size to default
    }
    else if (pos == "right")
    {
        blockRightList[index].style.width = ""; // change block size to default
    }
}

function animateBlock(value, index, pos="left")
{   
    if (desktop_window)
    {
        value.style.width = "40%"; // change block size
        if (pos == "left")
        {   
            bannerLeftList[index].style.left = "20%"; // change banner pos
        }
        else if (pos == "right")
        {
            bannerRightList[index].style.right = "20%"; // change banner pos
        }
    }
}

function deanimateBlock(value, index, pos="left")
{
    value.style.width = ""; // change block size to default
    if (pos == "left")
    {   
        bannerLeftList[index].style.left = ""; // change banner pos to default
    }
    else if (pos == "right")
    {
        bannerRightList[index].style.right = ""; // change banner pos to default
    }
}

// event listeners

bannerLeftList.forEach((value, index) => {
    value.addEventListener("mouseover", () => {
        animateBanner(value, index);
    });
    value.addEventListener("mouseout", () => {
        deanimateBanner(value, index);
    });
})

blockLeftList.forEach((value, index) => {
    value.addEventListener("mouseover", () => {
        animateBlock(value, index);
    });
    value.addEventListener("mouseout", () => {
        deanimateBlock(value, index);
    });
})

bannerRightList.forEach((value, index) => {
    value.addEventListener("mouseover", () => {
        animateBanner(value, index, pos="right");
    });
    value.addEventListener("mouseout", () => {
        deanimateBanner(value, index, pos="right");
    });
})

blockRightList.forEach((value, index) => {
    value.addEventListener("mouseover", () => {
        animateBlock(value, index, pos="right");
    });
    value.addEventListener("mouseout", () => {
        deanimateBlock(value, index, pos="right");
    });
})

