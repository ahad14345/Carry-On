const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    alert("Please login first.");
    window.location.href = "login.html";
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}