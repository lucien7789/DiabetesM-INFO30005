function toViewData() {
    window.location.href = "/patient/data";
}

function toHomePage() {
    window.location.href = "/patient/home";
}

function toClinicianDashboard() {
    window.location.href = "/clinician/dashboard";
}

function toPatientRegistration() {
    window.location.href = "/clinician/patientRegistration";
}


//navbar related
function openNav() {
    document.getElementById("myNav").style.width = "33%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }