

if (!loggedInUser) {
    alert("Please login first.");
    window.location.href = "login.html";
}

if (loggedInUser.role !== "Sender") {
    alert("Only senders can create delivery requests.");
    window.location.href = "login.html";
}

const deliveryForm = document.getElementById("deliveryForm");

deliveryForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const pickup = document.getElementById("pickup").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const size = document.getElementById("size").value;
    const weight = document.getElementById("weight").value;

    let requests =
        JSON.parse(localStorage.getItem("deliveryRequests")) || [];

    const newRequest = {

        id: Date.now(),

        senderId: loggedInUser.id,

        senderName: loggedInUser.name,

        pickup,

        destination,

        size,

        weight,

        status: "Pending"

    };

    requests.push(newRequest);

    localStorage.setItem(
        "deliveryRequests",
        JSON.stringify(requests)
    );

    alert("Delivery request submitted successfully!");

    deliveryForm.reset();

});