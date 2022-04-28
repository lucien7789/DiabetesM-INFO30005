async function render() {

    let options = document.getElementById("patient-data-dropdown");
    let optionNo = options.value;
    document.getElementById("patient-data-table-title").innerText = options[optionNo].dataset.name;
    let table = document.getElementById("patient-data-table");
    
    const response = await httpGet(options[optionNo].dataset.endpoint);

    if (!response.ok) {
        return;
    }

    let data = await response.json();
    let newTable;
    
    if (data && data.length > 0) {
        newTable = document.createElement("table");

        newTable.setAttribute("id", "patient-data-table");
        let tableRow = document.createElement("tr");
    
        let tableData = document.createElement("td");
        tableData.innerText = "Timestamp";
        tableRow.appendChild(tableData);
    
        
        tableData = document.createElement("td");
        tableData.innerText = "Value";
        tableRow.appendChild(tableData);
        
        newTable.appendChild(tableRow);

        for (let datapoint of data) {
            tableRow = document.createElement("tr");

            tableData = document.createElement("td");
            let tm = new Date(datapoint.time);
            tableData.innerText = tm.toLocaleDateString("en-US");
            tableRow.appendChild(tableData);

            tableData = document.createElement("td");
            tableData.innerText = datapoint.level;
            tableRow.appendChild(tableData);

            newTable.appendChild(tableRow);
        }
    } else {
        newTable = document.createElement("h2");

        newTable.innerText = "No data has been entered yet for this measure...";

    }
    console.log(newTable);
    table.replaceWith(newTable);
    
}
function onSubmitPlaceholder(e) {
    e.preventDefault();
}
async function onSubmit() {
    const datapoint = document.getElementById("patient-data-input-bgl").value;
    console.log(datapoint);
    let options = document.getElementById("patient-data-dropdown");
    let optionNo = options.value;

    await httpPost(options[optionNo].dataset.endpoint, { level: parseFloat(datapoint)});
//post comment
    render();
}
render();