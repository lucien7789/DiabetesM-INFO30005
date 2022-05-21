async function getMessage() {
    var res = await httpGet("/patientData/message");

    let msg = await res.json();

    if (msg.message) {
        var messageBox = document.getElementById("message-box");

        messageBox.setAttribute("style", "{ display: block; }");
        
        let header = document.createElement("h2");
        header.innerText = "Your clinician has a message for you:";

        let body = document.createElement("p");
        body.innerText = "\"" + msg.message + "\"";
        
        messageBox.appendChild(header);
        messageBox.appendChild(body);
    }
}

getMessage();