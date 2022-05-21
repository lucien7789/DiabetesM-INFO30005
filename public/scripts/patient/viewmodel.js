const dataVisualizationPointLimit = 10;
const chartToFontRatio = 32
const chartMinFont = 1
const chartMaxFont = 18
function getChartConfig(data, labels, xAxisTitle, yAxisTitle) {

    var fontColor = null;
    function getResponsiveColor(context) {
        // Cache value
        if (fontColor) {
            return fontColor;
        }
        const body = document.getElementsByTagName("body")[0];

        // Check whether dark mode is on or not
        fontColor = "white";
        if (body.classList.contains("light-mode")) {
            fontColor = "black";
        }
        
        return fontColor;
    }
    function getResponsiveFont(context) {

        let width = context.chart.width;
        let size = clamp(Math.round(width / chartToFontRatio), 1, chartMaxFont);

        return {
            size: size,
        };
    }
    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: {
                    color: getResponsiveColor(),
                    font: getResponsiveFont
                },
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: data
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let value = context?.raw || "";
                            
                            if (value) {
                                value = value.toString().concat(yAxisTitle);
                            }
                            return value;
                        }
                    }
                }
            },
            scales: {
                y: {
                    grace: "10%",
                    title: {
                        display: true,
                        text: yAxisTitle || "Value",
                        color: getResponsiveColor(),
                        font: getResponsiveFont
                    },
                    ticks: {
                        color: getResponsiveColor(),
                        font: getResponsiveFont,
                        beginAtZero: true
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: xAxisTitle || "X Axis",
                        color: getResponsiveColor(),
                        font: getResponsiveFont
                    },
                    ticks: {
                        color: getResponsiveColor(),
                        font: getResponsiveFont,
                    }
                }
            }
        }
    };
}
async function render(dataEndpoint) {

    function renderChart(data) {
    
        data.sort((a, b) => new Date(a.time) - new Date(b.time));
        data = data.splice(data.length - dataVisualizationPointLimit < 0 ? 0 : data.length - dataVisualizationPointLimit, data.length);
        const chartRoot = document.getElementById("chart-root");
    
        const prevGraph = document.getElementById("chart-main");
        if (prevGraph) {
            chartRoot.removeChild(prevGraph);
        }
        const values = data.map(datapoint => datapoint.value);
        const dates = data.map(datapoint => datapoint.time.substring(0, 10));
    
        const graph = document.createElement("canvas");
        graph.setAttribute("id", "chart-main");
    
        chartRoot.appendChild(graph);
    
        
        const myChart = new Chart(
            graph,
            getChartConfig(values, dates, "Date", options[optionNo].dataset.unit)
        );
    }
    var options = document.getElementById("patient-data-dropdown");
    var optionNo = options.value;

    var container = document.getElementById("patient-data-table-container");

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

    var dataEnteredToday = false;

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
                dataEnteredToday = true;
            }
            tableData.innerText = tm.toLocaleDateString("en-US") + " " + tm.toLocaleTimeString("en-US", {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false
            }).substring(0, 7);
            tableRow.appendChild(tableData);

            tableData = document.createElement("td");
            tableData.classList.add("flex-space-between", "border-none");
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
        renderChart(data);
    } else {
        newTable = document.createElement("h3");
        newTable.setAttribute("id", "no-data-placeholder-msg");
        newTable.innerText = "No data has been entered yet for this measure...";
        newTable.style.color = "white";
        newTable.style.fontWeight = "200";
    }
    if (dataEnteredToday) {
        disableEntry();
    } else {
        enableEntry();
    }
    container.removeChild(loadingDots);
    container.appendChild(newTable);

}
function enableEntry() {
    let cover = document.getElementsByClassName("disabled")[0];
    if (cover) {
        cover.classList.remove("disabled-active");
    }
    
}
function disableEntry() {
    let cover = document.getElementsByClassName("disabled")[0];

    if (cover) {
        cover.classList.add("disabled-active");
    }
}
function onSubmitPlaceholder(e) {
    e.preventDefault();
}
async function onSubmit() {
    const datapoint = document.getElementById("data-input-value").value;
    const comment = document.getElementById("data-input-comment").value;
    let options = document.getElementById("patient-data-dropdown");
    let optionNo = options.value;

    if (datapoint.length === 0) {
        showErrorStatusMessage("Please enter a value");
    } else if (isNaN(datapoint)) {
        showErrorStatusMessage("Please enter numerical value");
    } else if (datapoint <= 0) {
        showErrorStatusMessage("Please enter a positive value");
    } else {
        disableEntry();
        if (comment && comment.length > 0) {
            await httpPost(options[optionNo].dataset.endpoint, {
                value: parseFloat(datapoint),
                comment
            });
        } else {
            await httpPost(options[optionNo].dataset.endpoint, {
                value: parseFloat(datapoint)
            });
        }
    }
    

    render();
}
render();