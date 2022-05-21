async function getentries() {
    const container = document.getElementById("comments-section");

    addLoadingDots(container);
    let res = await httpGet("/clinicianData/comments");

    if (!res.ok) {
        return;
    }

    let entries = await res.json();

    removeLoadingDots(container);
    for (let e of entries) {
        let comment = document.createElement("div");

        // For navigating to the patient page
        comment.setAttribute("onclick", `
            window.location.href = "/clinician/patient/${e.userID}";
        `);

        comment.classList.add("comment");
        let top = document.createElement("div");
        top.classList.add("flex-space-between");

        let timestamp = document.createElement("h3");
        let tm = new Date(e.time);

        timestamp.innerText = tm.toLocaleDateString("en-US") + " " + tm.toLocaleTimeString("en-US", {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        }).substring(0, 7);
        
        let name = document.createElement("h3");
        name.innerText = e.firstName + " " + e.lastName;

        top.appendChild(timestamp);
        top.appendChild(name);

        comment.appendChild(top);
        let text = document.createElement("p");
        text.innerText = e.comment;
        comment.appendChild(text);
        container.appendChild(comment);
    }
}

getentries();