const engagementRange = 14;
const minEngagementRatio = 0.8;

async function badge_visibility() {
    var options = document.getElementById("patient-data-dropdown");
    var optionNo = options.value;

    const response = await httpGet(options[optionNo].dataset.endpoint);

    if (!response.ok) {
        return;
    }

    let data = await response.json();
    let newTable;

    if (data && data.length > 0) {
        let today = new Date();
        today.setHours(0, 0, 0, 0);

        let engagement_count = 0;

        for (let datapoint of data) {
            let tm = new Date(datapoint.time);
            tm.setHours(0, 0, 0, 0);

            let diff_days = Math.ceil((today - tm) / (1000 * 60 * 60 * 24));

            if (diff_days <= engagementRange){
                engagement_count += 1;
            }
        }

        let engagement_ratio = engagement_count / engagementRange;

        console.log("engagement ratio in last",engagementRange, "days is",engagement_ratio,"with",engagement_count,"days entered.")

        if (engagement_ratio > minEngagementRatio){
            document.getElementById("badge-frame").style.visibility = "visible";
        }
    }
}
badge_visibility();