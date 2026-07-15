const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location.href = "login.html";
}

const profileForm = document.getElementById("profileForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const roleInput = document.getElementById("role");

// Load current user information
nameInput.value = loggedInUser.name;
emailInput.value = loggedInUser.email;
phoneInput.value = loggedInUser.phone;
roleInput.value = loggedInUser.role;

// Show the correct dashboard button
if (loggedInUser.role === "Sender") {
    document.getElementById("travelerBack").style.display = "none";
} else {
    document.getElementById("senderBack").style.display = "none";
}

// Save profile
profileForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const updatedName = nameInput.value.trim();
    const updatedPhone = phoneInput.value.trim();

    let users = JSON.parse(localStorage.getItem("carryOnUsers")) || [];

    const userIndex = users.findIndex(user => user.id === loggedInUser.id);

    if (userIndex === -1) {
        alert("User not found.");
        return;
    }

    users[userIndex].name = updatedName;
    users[userIndex].phone = updatedPhone;

    localStorage.setItem("carryOnUsers", JSON.stringify(users));

    localStorage.setItem("loggedInUser", JSON.stringify(users[userIndex]));

    alert("Profile updated successfully!");

});