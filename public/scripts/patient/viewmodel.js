async function render() {

    let options = document.getElementById("patient-data-dropdown");
    let optionNo = options.value;
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
            tableData.classList.add("flex-space-between");
            let text = document.createElement("p");
            text.innerText = datapoint.value;
            tableData.appendChild(text);

            if (datapoint.comment) {
                let icon = document.createElement("span");
                icon.classList.add("material-symbols-outlined", "data-comment-button");
                
                icon.innerText = "chat_bubble";

                let comment = document.createElement("div");
                comment.classList.add("data-comment");
                comment.innerText = datapoint.comment;

                tableData.appendChild(icon);
                tableData.appendChild(comment);
            }
            tableRow.appendChild(tableData);

            newTable.appendChild(tableRow);
        }
    } else {
        newTable = document.createElement("h3");

        newTable.innerText = "No data has been entered yet for this measure...";
        newTable.style.color = "white";
        newTable.style.fontWeight = "200";
    }

    table.replaceWith(newTable);
    
}
function onSubmitPlaceholder(e) {
    e.preventDefault();
}
async function onSubmit() {
    const datapoint = document.getElementById("patient-data-input-value").value;
    const comment = document.getElementById("patient-data-input-comment").value;
    let options = document.getElementById("patient-data-dropdown");
    let optionNo = options.value;

    if (comment && comment.length > 0) {
        await httpPost(options[optionNo].dataset.endpoint, { value: parseFloat(datapoint), comment });
    } else {
        await httpPost(options[optionNo].dataset.endpoint, { value: parseFloat(datapoint) });
    }
    
    render();
}
render();