
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

    // Validation
    if (
        pickup === "" ||
        destination === "" ||
        size === "" ||
        weight === ""
    ) {
        alert("Please fill in all fields.");
        return;
    }

    if (pickup.length < 2) {
        alert("Pickup location must be at least 2 characters.");
        return;
    }

    if (destination.length < 2) {
        alert("Destination must be at least 2 characters.");
        return;
    }

    if (pickup.toLowerCase() === destination.toLowerCase()) {
        alert("Pickup and destination cannot be the same.");
        return;
    }

    if (Number(weight) <= 0) {
        alert("Weight must be greater than 0.");
        return;
    }

    // Get existing requests
    let requests =
        JSON.parse(localStorage.getItem("deliveryRequests")) || [];

    // Create new request
    const newRequest = {
        id: Date.now(),
        senderId: loggedInUser.id,
        senderName: loggedInUser.name,
        pickup: pickup,
        destination: destination,
        size: size,
        weight: Number(weight),
        status: "Pending",
        createdAt: new Date().toLocaleString()
    };

    // Save request
    requests.push(newRequest);

    localStorage.setItem(
        "deliveryRequests",
        JSON.stringify(requests)
    );

    alert("Delivery request submitted successfully!");

    // Clear form
    deliveryForm.reset();

    // Optional: Return to Sender Dashboard
    window.location.href = "sender-dashboard.html";

});