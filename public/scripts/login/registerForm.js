function onSubmitPlaceholder(e) {
    e.preventDefault();
}
async function onSubmitPatient() {
    onSubmit(0);
}
async function onSubmitClinician() {
    onSubmit(1);
}
async function onSubmit(accountType) {
    const [username, password, firstName, lastName] = [
        document.querySelector("#username-input").value, 
        document.querySelector("#password-input").value, 
        document.querySelector("#first-name-input").value, 
        document.querySelector("#last-name-input").value
    ];
    let response = await httpPost("/user/register", { username, password, firstName, lastName, accountType} );

    if (response.ok && response.redirected) {
        window.location.href = response.url;
    } else if (!response.ok && response.body) {
        let body = await response.json();
        let statusMsg = document.querySelector(".status-message")
        if (body?.message) {
            statusMsg.innerText = body.message || "";
            statusMsg.classList.add("status-message-active", "alert-message", "alert-message-danger");
            setTimeout(() => {
                statusMsg.classList.remove("status-message-active");
            }, 5000);
        } else {
            statusMsg.classList.remove("status-message-active", "alert-message", "alert-message-danger");
        }
    }
}