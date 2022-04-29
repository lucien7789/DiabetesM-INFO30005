function onSubmitPlaceholder(e) {
    e.preventDefault();
}
async function onSubmitPatient() {
    onSubmit(0, { redirect : false});
}
async function onSubmitClinician() {
    onSubmit(1);
}
async function onSubmit(accountType, options) {
    const [username, password, confirmPassword, firstName, lastName] = [
        document.querySelector("#username-input").value, 
        document.querySelector("#password-input").value, 
        document.querySelector("#password-confirm-input").value, 
        document.querySelector("#first-name-input").value, 
        document.querySelector("#last-name-input").value
    ];
    if (password !== confirmPassword) {
        showErrorStatusMessage("Passwords do not match, please validate again");
        return;
    }

    let reqBody = { username, password, firstName, lastName, accountType};

    if (options) {
        Object.assign(reqBody, options);
    }

    let response = await httpPost("/user/register", reqBody);

    if (response.ok && response.redirected) {
        window.location.href = response.url;
    } else if (!response.ok) {
        let body = await response.json();
        showErrorStatusMessage(body.message);
    } else {
        showSuccessStatusMessage("User has been successfully registered");
    }
}