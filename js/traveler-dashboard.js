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

function editSchedule(id){

    alert("Edit feature will be added in Commit 2.");

}

function cancelSchedule(id){

    alert("Cancel feature will be added in Commit 3.");

}