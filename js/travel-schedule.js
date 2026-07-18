

if (!loggedInUser) {
    alert("Please login first.");
    window.location.href = "login.html";
}

if (loggedInUser.role !== "Traveler") {
    alert("Only travelers can post travel schedules.");
    window.location.href = "login.html";
}

const travelDateInput = document.getElementById("travelDate");
const scheduleForm = document.getElementById("scheduleForm");

// Set today's date as the minimum allowed date
travelDateInput.min = new Date().toISOString().split("T")[0];

scheduleForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const departure = document.getElementById("departure").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const travelDate = travelDateInput.value;
    const capacity = document.getElementById("capacity").value;

    // Validation
    if (!departure || !destination || !travelDate || !capacity) {
        alert("Please fill in all fields.");
        return;
    }

    if (departure.length < 2) {
        alert("Departure city must be at least 2 characters.");
        return;
    }

    if (destination.length < 2) {
        alert("Destination city must be at least 2 characters.");
        return;
    }

    if (departure.toLowerCase() === destination.toLowerCase()) {
        alert("Departure and destination cannot be the same.");
        return;
    }

    if (Number(capacity) <= 0) {
        alert("Capacity must be greater than 0.");
        return;
    }

    // Get existing schedules
    let schedules = JSON.parse(localStorage.getItem("travelSchedules")) || [];

    // Create new schedule
    const newSchedule = {
        id: Date.now(),
        travelerId: loggedInUser.id,
        travelerName: loggedInUser.name,
        departure: departure,
        destination: destination,
        travelDate: travelDate,
        capacity: Number(capacity),
        status: "Available",
        createdAt: new Date().toLocaleString()
    };

    // Save
    schedules.push(newSchedule);

    localStorage.setItem(
        "travelSchedules",
        JSON.stringify(schedules)
    );

    alert("Travel schedule published successfully!");

    scheduleForm.reset();

    // Keep today's minimum date after reset
    travelDateInput.min = new Date().toISOString().split("T")[0];

    // Optional: Go back to dashboard after success
    window.location.href = "traveler-dashboard.html";
});