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
function toCommentsPage() {
    window.location.href = "/clinician/comments";
}

var navMenuToggled = false;
function toggleNav() {
    if (navMenuToggled) {
        closeNav();
    } else {
        openNav();
    }
    navMenuToggled = !navMenuToggled;
}
//navbar related
function openNav() {
    document.getElementById("my-nav").classList.add("my-nav-active");
}
  
function closeNav() {
    document.getElementById("my-nav").classList.remove("my-nav-active");
}