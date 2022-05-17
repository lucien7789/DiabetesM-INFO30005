const measures = ["bloodGlucose"];
async function updateDataEntryStatusMessage() {

    let msg = document.getElementById("health-data-msg");
    msg.classList.add("loading-dots");
    const latestData = await httpGet("/patientData/latest");

    let body = await latestData.json();
    
    var today = new Date().setHours(0, 0, 0, 0);

    var dataEntryTodayFulfilled = true;
    console.log(body);
    for (let measure of measures) {
        if (body.patientMeasures[measure] === true && (!body[measure] || new Date(body[measure].time).setHours(0, 0, 0, 0).valueOf() !== today.valueOf())) {
            dataEntryTodayFulfilled = false;
            break;
        }
    }
    msg.classList.remove("loading-dots");
    if (dataEntryTodayFulfilled) {
        msg.innerText = "Well done, you have entered all your health data measurements for today!"
    } else {
        msg.innerText = "You still have remaining health measurement data to enter for today"
    }
}

updateDataEntryStatusMessage();