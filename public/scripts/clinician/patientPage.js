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

    const [enabled, newUpperThreshold, newLowerThreshold] = [
        document.getElementById("measure-enabled-switch").checked === true, 
        Number(document.getElementById("upper-safety-threshold").value),
        Number(document.getElementById("lower-safety-threshold").value)
    ]

    console.log(parseFloat(newUpperThreshold) < 0);
    // Validate inputs
    if (newUpperThreshold === undefined || newUpperThreshold.length === 0 || isNaN(newUpperThreshold) || parseFloat(newUpperThreshold) < 0) {
        showErrorStatusMessage("The entered upper safety threshold value is invalid");
        return;
    }
    if (newLowerThreshold === undefined || newLowerThreshold.length === 0 || isNaN(newLowerThreshold) || parseFloat(newLowerThreshold) < 0) {
        showErrorStatusMessage("The entered lower safety threshold value is invalid");
        return;
    }
    if (newLowerThreshold > newUpperThreshold) {
        showErrorStatusMessage("The entered lower threshold value is larger than upper threshold value");
        return;
    }
    loadingDots.classList.add("loading-dots");
    container.appendChild(loadingDots);

    await httpPost(`/clinicianData/patientMeasures/${document.getElementById("patient-page").dataset.id}`, {
        [options[optionNo].dataset.code]:  enabled,
        [options[optionNo].dataset.code + "SafetyThresholdTop"]: newUpperThreshold,
        [options[optionNo].dataset.code + "SafetyThresholdBottom"]: newLowerThreshold
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

    await httpPost(`/clinicianData/message/${document.getElementById("patient-page").dataset.id}`, { message: message });

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
        showErrorStatusMessage("Please enter some text before adding a note");
    }
    
}
getNotes();
renderMessage();
renderPatientMeasureOptions();
