function toggleDarkMode() {
    var toggle = document.getElementsByClassName("color-switch-input")[0];

    if (toggle.checked) {
        document.getElementsByTagName("body")[0].classList.add("dark-mode");
        httpPost("/user/colortheme/dark");
    } else {
        document.getElementsByTagName("body")[0].classList.remove("dark-mode");
        httpPost("/user/colortheme/light");
    }

    if (render !== undefined) {
        render();
    }
}

async function checkColorMode() {
    const color = await httpGet("/user/colortheme");

    if (color.ok) {
        let body = await color.json();
        if (body.mode === "dark") {
            document.getElementsByClassName("color-switch-input")[0].checked = true;
            document.getElementsByTagName("body")[0].classList.add("dark-mode");
        } else {
            document.getElementsByClassName("color-switch-input")[0].checked = false;
            document.getElementsByTagName("body")[0].classList.remove("dark-mode");
        }
    }
}

checkColorMode();