async function render() {
    let options = document.getElementById("patient-data-dropdown");
    let optionNo = options.value;

    var container = document.getElementById("patient-view-left");

    let [oldDataTable, placeholderMsg] = [document.getElementById("patient-data-table"), document.getElementById("no-data-placeholder-msg")];

    if (oldDataTable) {
        container.removeChild(oldDataTable);
    }
    if (placeholderMsg) {
        container.removeChild(placeholderMsg);
    }
    
    let loadingDots = document.createElement("span");

    loadingDots.classList.add("loading-dots");
    container.appendChild(loadingDots);
    const response = await httpGet(options[optionNo].dataset.endpoint);

    if (!response.ok) {
        return;
    }

    let data = await response.json();
    let newTable;
    
    if (data && data.length > 0) {
        newTable = document.createElement("table");

        newTable.setAttribute("id", "patient-data-table");
        newTable.classList.add("data-table");
        let tableRow = document.createElement("tr");
    
        let tableData = document.createElement("td");
        tableData.innerText = "Timestamp";
        tableRow.appendChild(tableData);
    
        
        tableData = document.createElement("td");
        tableData.innerText = "Value";
        tableRow.appendChild(tableData);
        
        newTable.appendChild(tableRow);

        var dataEnteredToday = false;

        let today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let datapoint of data) {
            tableRow = document.createElement("tr");

            tableData = document.createElement("td");
            let tm = new Date(datapoint.time);

            let temp = new Date(datapoint.time);
            temp.setHours(0, 0, 0, 0);
            
            /**
             * If there is already a data entry for today, don't allow user to enter more data today
             */
            if (temp.valueOf() === today.valueOf()) {
                let cover = document.getElementsByClassName("disabled")[0];

                cover.classList.add("disabled-active");
            }
            tableData.innerText = tm.toLocaleDateString("en-US") + " " + tm.toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: false }).substring(0, 7);
            tableRow.appendChild(tableData);
            
            tableData = document.createElement("td");
            tableData.classList.add("flex-space-between");
            let text = document.createElement("p");
            text.innerText = datapoint.value + options[optionNo].dataset.unit;
            tableData.appendChild(text);

            if (datapoint.comment) {
                let icon = document.createElement("span");
                icon.classList.add("material-symbols-outlined", "data-comment-button");
                
                icon.innerText = "chat_bubble";
                icon.setAttribute("onclick", "showComment(event)");
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
        newTable.setAttribute("id", "no-data-placeholder-msg");
        newTable.innerText = "No data has been entered yet for this measure...";
        newTable.style.color = "white";
        newTable.style.fontWeight = "200";
    }

    container.removeChild(loadingDots);
    container.appendChild(newTable);
    
}
function onSubmitPlaceholder(e) {
    e.preventDefault();
}
async function onSubmit() {
    const datapoint = document.getElementById("data-input-value").value;
    const comment = document.getElementById("data-input-comment").value;
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