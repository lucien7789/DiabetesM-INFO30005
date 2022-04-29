async function logout() {
    const response = await httpPost("/user/logout", {});

    if (response.redirected) {
        window.location.href = response.url;
    }
}