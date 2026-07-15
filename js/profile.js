const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location.href = "login.html";
}

document.getElementById("name").value = loggedInUser.name;
document.getElementById("email").value = loggedInUser.email;
document.getElementById("phone").value = loggedInUser.phone;
document.getElementById("role").value = loggedInUser.role;

// Show correct dashboard button
if (loggedInUser.role === "Sender") {
    document.getElementById("travelerBack").style.display = "none";
} else {
    document.getElementById("senderBack").style.display = "none";
}