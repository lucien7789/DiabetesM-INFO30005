function onSubmitPlaceholder(e) {
    e.preventDefault();
}
async function onSubmitPatient() {
    onSubmit(0, { redirect : false});
}
async function onSubmitClinician() {
    onSubmit(1);
}
function isValidEmail(email) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (email.match(validRegex)) {
      return true;
    }
    return false;
  
  }
async function onSubmit(accountType, options) {
    const [username, password, confirmPassword, firstName, lastName] = [
        document.querySelector("#username-input").value, 
        document.querySelector("#password-input").value, 
        document.querySelector("#password-confirm-input").value, 
        document.querySelector("#first-name-input").value, 
        document.querySelector("#last-name-input").value
    ];
    if (username === undefined || username.length === 0) {
        showErrorStatusMessage("Please enter a username");
        return;
    }
    /**
     * Check username conforms to email structure
     */
    if (!isValidEmail(username)) {
        showErrorStatusMessage("Please enter a valid email input");
        return;
    }
    if (firstName === undefined || firstName.length === 0) {
        showErrorStatusMessage("Please enter a first name");
        return;
    }
    if (lastName === undefined || lastName.length === 0) {
        showErrorStatusMessage("Please enter a last name");
        return;
    }
    if (password === undefined || password.length === 0) {
        showErrorStatusMessage("Please enter a password");
        return;
    }
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