const scheduleList = document.getElementById("scheduleList");

let schedules =
JSON.parse(localStorage.getItem("travelSchedules")) || [];

// Only current traveler's schedules
const mySchedules = schedules.filter(
    schedule => schedule.travelerId == loggedInUser.id
);

if (mySchedules.length === 0) {

    scheduleList.innerHTML = `
        <p>No travel schedules posted yet.</p>
    `;

}
else {

    let html = "";

    mySchedules.forEach(schedule => {

        html += `

        <div class="schedule-card">

            <h3>${schedule.departure} → ${schedule.destination}</h3>

            <p><strong>Date:</strong> ${schedule.travelDate}</p>

            <p><strong>Capacity:</strong> ${schedule.capacity} KG</p>

            <p><strong>Status:</strong> ${schedule.status}</p>

            <button
                class="btn primary"
                onclick="editSchedule(${schedule.id})">

                Edit

            </button>

            <button
                class="btn secondary"
                onclick="cancelSchedule(${schedule.id})">

                Cancel

            </button>

            <hr>

        </div>

        `;

    });

    scheduleList.innerHTML = html;

}

function editSchedule(id) {

    let schedules =
        JSON.parse(localStorage.getItem("travelSchedules")) || [];

    const schedule = schedules.find(s => s.id == id);

    if (!schedule) {
        alert("Schedule not found.");
        return;
    }

    const departure = prompt(
        "Edit Departure City:",
        schedule.departure
    );

    if (departure === null) return;

    const destination = prompt(
        "Edit Destination City:",
        schedule.destination
    );

    if (destination === null) return;

    const travelDate = prompt(
        "Edit Travel Date (YYYY-MM-DD):",
        schedule.travelDate
    );

    if (travelDate === null) return;

    const capacity = prompt(
        "Edit Capacity (KG):",
        schedule.capacity
    );

    if (capacity === null) return;

    if (
        departure.trim() === "" ||
        destination.trim() === "" ||
        travelDate.trim() === "" ||
        capacity.trim() === ""
    ) {
        alert("All fields are required.");
        return;
    }

    schedule.departure = departure.trim();
    schedule.destination = destination.trim();
    schedule.travelDate = travelDate;
    schedule.capacity = Number(capacity);

    localStorage.setItem(
        "travelSchedules",
        JSON.stringify(schedules)
    );

    alert("Travel schedule updated successfully!");

    location.reload();
}

function cancelSchedule(id){

    alert("Cancel feature will be added in Commit 3.");

}