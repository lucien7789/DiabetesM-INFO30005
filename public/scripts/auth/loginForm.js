async function onSubmit(e) {
    e.preventDefault();
    const [username, password] = [document.querySelector("#username-input").value, document.querySelector("#password-input").value];

    const response = await httpPost("/user/login", { username, password });

    if (response.ok && response.redirected) {
        window.location.href = response.url
    } else if (!response.ok && response.body) {
        let body = await response.json();
        let statusMsg = document.querySelector(".status-message");
        showErrorStatusMessage(body.message);
    }
    
}