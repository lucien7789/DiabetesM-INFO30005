const measures = [["bloodGlucose", "Blood Glucose"], ["weight", "Weight"], ["insulin", "Doses of Insulin"], ["exercise", "Exercise"]];

async function render() {

    let container = document.getElementById("clinician-patient-table-container");

    let loadingDots = document.createElement("span");
    loadingDots.classList.add("loading-dots");
    container.appendChild(loadingDots);

    let table = document.createElement("table");
    table.setAttribute("id", "clinician-patient-table");
    table.classList.add("data-table");

    let tableRow = document.createElement("tr");
    let tableData = document.createElement("td");
    tableData.innerText = "Name";
    tableRow.appendChild(tableData);
    for (let measure of measures) {
        tableData = document.createElement("td");
        tableData.innerText = measure[1];
        tableRow.appendChild(tableData);
        
        table.appendChild(tableRow);
    }
       
    const response = await httpGet("/clinicianData");

    if (!response.ok) {
        return;
    }

    let data = await response.json();
    
    if (data && data.length > 0) {
        for (let datapoint of data) {
            tableRow = document.createElement("tr");

            tableData = document.createElement("td");

            let name = document.createElement("a");
            name.innerText = datapoint.p.firstName + " " + datapoint.p.lastName;
            name.setAttribute("href", `/clinician/patient/${datapoint.p._id}`);
            tableData.appendChild(name);
            tableRow.appendChild(tableData);
            for (let m of measures) {
                let measure = m[0];
                tableData = document.createElement("td");
                tableData.setAttribute("style", "padding: 0;");
                let cell = document.createElement("div");
                if (!datapoint.patientMeasures[measure] || datapoint[measure] === undefined || datapoint[measure] === null) {
                    cell.innerText = "";
                } else {
                    
                    cell.classList.add("flex-space-between");
                    cell.setAttribute("style", "height: 100%;");
                    let text = document.createElement("p");
                    text.innerText = datapoint[measure].value;
                    cell.appendChild(text);
                    
                    if (datapoint[measure].value <= datapoint.patientMeasures[measure + "SafetyThresholdBottom"]
                        || datapoint[measure].value >= datapoint.patientMeasures[measure + "SafetyThresholdTop"]) {
                            cell.classList.add("alert-message-deep-danger");
                        }
                    if (datapoint[measure].comment) {
                        let icon = document.createElement("span");
                        icon.classList.add("material-symbols-outlined", "data-comment-button");
                        icon.innerText = "chat_bubble";
                        icon.setAttribute("onclick", "showComment(event)");
                        let comment = document.createElement("div");
                        comment.classList.add("data-comment");
                        comment.innerText = datapoint[measure].comment;
        
                        cell.appendChild(icon);
                        cell.appendChild(comment);
                    }
                }
                tableData.appendChild(cell);
                tableRow.appendChild(tableData);
            }
            
            table.appendChild(tableRow);
        }
    }
    
    container.removeChild(loadingDots);
    container.appendChild(table);
}