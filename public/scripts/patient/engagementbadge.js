const minEngagementRatio = 0.8;

async function badge_visibility() {
    const response = await httpGet("/patientData/engagement");

    if (!response.ok) {
        return;
    }

    let data = await response.json();

    if (data?.engagement) {

        console.log("engagement ratio is", data.engagement);

        if (data.engagement > minEngagementRatio){
            document.getElementById("badge-frame").style.visibility = "visible";
        }
    }
}
badge_visibility();