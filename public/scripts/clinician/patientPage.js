async function renderPatientMeasureOptions() {
    let container = document.getElementById("measure-options");
    addLoadingDots(container);

    var options = document.getElementById("patient-data-dropdown");
    var optionNo = options.value;
    var enabledSwitch = document.getElementById("measure-enabled-switch");

    console.log(document.getElementById("patient-page").dataset)
    let res = await httpGet(`/clinicianData/patientMeasures/${document.getElementById("patient-page").dataset.id}`);

    if (!res.ok) {
        return;
    }
    let body = await res.json();

    if (body[options[optionNo].dataset.code]) {
        enabledSwitch.checked = true;
    } else {
        enabledSwitch.checked = false;
    }
    document.getElementById("upper-safety-threshold").value = body[options[optionNo].dataset.code + "SafetyThresholdTop"];
    document.getElementById("lower-safety-threshold").value = body[options[optionNo].dataset.code + "SafetyThresholdBottom"];
    removeLoadingDots(container);
}

async function updateMeasureOptions() {
    let container = document.getElementById("measure-options");
    let loadingDots = document.createElement("span");

    var options = document.getElementById("patient-data-dropdown");
    var optionNo = options.value;

    loadingDots.classList.add("loading-dots");
    container.appendChild(loadingDots);

    var enabledSwitch = document.getElementById("measure-enabled-switch");

    await httpPost(`/clinicianData/patientMeasures/${document.getElementById("patient-page").dataset.id}`, {
        [options[optionNo].dataset.code]:  enabledSwitch.checked === true,
        [options[optionNo].dataset.code + "SafetyThresholdTop"]: document.getElementById("upper-safety-threshold").value,
        [options[optionNo].dataset.code + "SafetyThresholdBottom"]: document.getElementById("lower-safety-threshold").value
     });

    renderPatientMeasureOptions();

    container.removeChild(loadingDots);
}
async function renderMessage() {
    let message = document.getElementById("clinician-message");

    let res = await httpGet(`/clinicianData/message/${document.getElementById("patient-page").dataset.id}`);

    if (!res.ok) {
        return;
    }

    let body = await res.json();

    if (body.message) {
        message.value = body.message;
    }
}
async function updateMessage() {
    let message = document.getElementById("clinician-message").value;

    await httpPost(`/clinicianData/message/${document.getElementById("patient-page").dataset.id}/${message}`);

    renderMessage();
}
async function getNotes() {
    var notesSection = document.getElementById("notes-section");
    var oldNotes = document.getElementsByClassName("note");
    for (let note of oldNotes) {
        notesSection.removeChild(note);
    }
    addLoadingDots(notesSection);
    let res = await httpGet(`/clinicianData/note/${document.getElementById("patient-page").dataset.id}`);

    if (!res.ok) {
        return;
    }
    let notes = await res.json();
    
    var notesSection = document.getElementById("notes-section");
    
    
    
    for (let n of notes) {
        let note = document.createElement("div");
        note.classList.add("note");
        let timestamp = document.createElement("h3");
        let tm = new Date(n.time);
        timestamp.innerText = tm.toLocaleDateString("en-US") + " " + tm.toLocaleTimeString("en-US", {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        }).substring(0, 7);
        
        note.appendChild(timestamp);
        let text = document.createElement("p");
        text.innerText = n.text;
        note.appendChild(text);
        notesSection.appendChild(note);
    }
    removeLoadingDots(notesSection);
}
async function createNote() {
    let text = document.getElementById("new-note").value;

    if (text && text.length > 0) {
        await httpPost(`/clinicianData/note/${document.getElementById("patient-page").dataset.id}`, { text: text });

        getNotes();
    } else {
        showErrorStatusMessage("Please enter some message before adding");
    }
    
}
getNotes();
renderMessage();
renderPatientMeasureOptions();
