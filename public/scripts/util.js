/**
 * Utility function for displaying an error status message, which dissappears roughly 5 seconds later
 * 
 * Assumes that there is a DOM element with class "status-message", which will be populated with message.
 * @param {*} message The message to display
 */
function clamp(num, min, max) {
    return Math.max(Math.min(num, max), min);
}
function showErrorStatusMessage(message) {
    let statusMsg = document.querySelector(".status-message")
    if (message) {
        statusMsg.innerText = message || "";
        statusMsg.classList.add("status-message-active", "alert-message", "alert-message-danger");
        setTimeout(() => {
            statusMsg.className = "";
            statusMsg.classList.add("status-message");
        }, 5000);
    } else {
        statusMsg.classList.remove("status-message-active", "alert-message", "alert-message-danger");
    }
}
/**
 * Utility function for displaying a success status message, which dissappears roughly 5 seconds later
 * 
 * Assumes that there is a DOM element with class "status-message", which will be populated with message.
 * @param {*} message The message to display
 */
function showSuccessStatusMessage(message) {
    let statusMsg = document.querySelector(".status-message")
    if (message) {
        statusMsg.innerText = message || "";
        statusMsg.classList.add("status-message-active", "alert-message", "alert-message-success");
        setTimeout(() => {
            statusMsg.className = "";
            statusMsg.classList.add("status-message");
        }, 5000);
    } else {
        statusMsg.classList.remove("status-message-active", "alert-message", "alert-message-sucess");
    }
}

function addLoadingDots(container) {
    let loadingDots = document.createElement("span");

    loadingDots.classList.add("loading-dots");
    container.appendChild(loadingDots);
}

function removeLoadingDots(container) {
    let loadingDots = container.getElementsByClassName("loading-dots")[0];
    if (loadingDots) {
        container.removeChild(loadingDots);
    }
    
}

function setCookie(name, value, time) {
    var expires = "";
    if (time) {
        var date = new Date();
        date.setTime(date.getTime() + time);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var cookieName = name + "=";
    var cookies = document.cookie.split(";");
    for(var i = 0 ; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1, c.length);
        }
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}