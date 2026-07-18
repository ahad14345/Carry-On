

if (!loggedInUser) {
    window.location.href = "login.html";
}

if (loggedInUser.role !== "Sender") {
    alert("Only senders can create delivery requests.");
    window.location.href = "login.html";
}

document
    .getElementById("deliveryForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Commit 2 will save this request.");

});