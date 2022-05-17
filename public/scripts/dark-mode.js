const cookieTTL = 24*60*60*1000 * 5
function toggleDarkMode() {

    var toggle = document.getElementsByClassName("color-switch-input")[0];

    if (toggle.checked) {
        document.getElementsByTagName("body")[0].classList.remove("light-mode");
        setCookie("colortheme", "dark", cookieTTL);
        httpPost("/user/colortheme/dark");
    } else {
        document.getElementsByTagName("body")[0].classList.add("light-mode");
        setCookie("colortheme", "light", cookieTTL);
        httpPost("/user/colortheme/light");
    }

    if (render !== undefined) {
        render();
    }
}

async function checkColorMode() {
    let mode;
    const color = await httpGet("/user/colortheme");
    if (color.ok) {
        mode = (await color.json()).mode;
    }
    if (mode === "none") {
        mode = getCookie("colortheme") || "dark";
    }
    if (mode === "dark") {
        document.getElementsByClassName("color-switch-input")[0].checked = true;
        document.getElementsByTagName("body")[0].classList.remove("light-mode");
    } else {
        document.getElementsByClassName("color-switch-input")[0].checked = false;
        document.getElementsByTagName("body")[0].classList.add("light-mode");
    }
}

checkColorMode();