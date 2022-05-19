async function updatePassword() {
    const [password, confirmPassword] = [document.getElementById("password").value, document.getElementById("password-confirm").value];

    if (!password || password.length === 0) {
        showErrorStatusMessage("Password must not be empty!");
        return;
    }
    if (password !== confirmPassword) {
        showErrorStatusMessage("Passwords do not match!");
        return;
    }
    
    let res = await httpPost("/user/password", { password });

    let body = await res.json();
    if (!res.ok) {
        showErrorStatusMessage(body.message);
    } else {
        showSuccessStatusMessage(body.message);
    }
}