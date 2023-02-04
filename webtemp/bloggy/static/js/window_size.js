var desktop_window, tablet_window, mobile_window;


if (window.innerWidth > 1000) {
    desktop_window = true;
    tablet_window = false;
    mobile_window = false;
}
else if (window.innerWidth > 600 && window.innerWidth <= 1000) {
    desktop_window = false;
    tablet_window = true;
    mobile_window = false;
}
else if (window.innerWidth <= 600) {
    desktop_window = false;
    tablet_window = false;
    mobile_window = true;
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
        desktop_window = true;
        tablet_window = false;
        mobile_window = false;
    }
    else if (window.innerWidth > 600 && window.innerWidth <= 1000) {
        desktop_window = false;
        tablet_window = true;
        mobile_window = false;
    }
    else if (window.innerWidth <= 600) {
        desktop_window = false;
        tablet_window = false;
        mobile_window = true;
    }
});