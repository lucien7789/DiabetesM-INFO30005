async function onSubmit(e) {
    e.preventDefault();
    const [username, password] = [document.querySelector("#username-input"), document.querySelector("#password-input")];

    const response = await fetch("/user/login", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ username, password })
    });
    console.log(response);
}