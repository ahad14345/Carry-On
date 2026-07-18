// Display accepted deliveries
let requests = JSON.parse(localStorage.getItem("deliveryRequests")) || [];
const myAcceptedDeliveries = requests.filter(
  (req) => req.travelerId == loggedInUser.id && req.status === "Accepted",
);

const acceptedDeliveriesList = document.getElementById(
  "acceptedDeliveriesList",
);

if (myAcceptedDeliveries.length === 0) {
  acceptedDeliveriesList.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; background: white; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);">
            <p style="font-size: 16px; color: #999;">No accepted deliveries yet.</p>
            <p style="font-size: 14px; color: #ccc; margin-top: 10px;">Browse and accept deliveries to see them here!</p>
        </div>
    `;
} else {
  let html = "";
  myAcceptedDeliveries.forEach((delivery) => {
    html += `
            <div class="delivery-card" style="background: #f0fdf4; border-left-color: #10b981;">
                <div class="delivery-header">
                    <div>
                        <h3>${delivery.pickup} → ${delivery.destination}</h3>
                        <p class="sender-name">👤 Sender: ${delivery.senderName}</p>
                    </div>
                    <span class="status-badge" style="background: #10b981;">✓ Accepted</span>
                </div>
                <div class="delivery-details">
                    <div class="detail-row">
                        <span class="detail-label">📏 Size:</span>
                        <span class="detail-value">${delivery.size}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">⚖️ Weight:</span>
                        <span class="detail-value">${delivery.weight} KG</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">📅 Accepted:</span>
                        <span class="detail-value">${delivery.acceptedAt}</span>
                    </div>
                </div>
            </div>
        `;
  });
  acceptedDeliveriesList.innerHTML = html;
}

const scheduleList = document.getElementById("scheduleList");

let schedules = JSON.parse(localStorage.getItem("travelSchedules")) || [];

// Only current traveler's schedules
const mySchedules = schedules.filter(
  (schedule) => schedule.travelerId == loggedInUser.id,
);

if (mySchedules.length === 0) {
  scheduleList.innerHTML = `
        <p>No travel schedules posted yet.</p>
    `;
} else {
  let html = "";

  mySchedules.forEach((schedule) => {
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
  let schedules = JSON.parse(localStorage.getItem("travelSchedules")) || [];

  const schedule = schedules.find((s) => s.id == id);

  if (!schedule) {
    alert("Schedule not found.");
    return;
  }

  const departure = prompt("Edit Departure City:", schedule.departure);

  if (departure === null) return;

  const destination = prompt("Edit Destination City:", schedule.destination);

  if (destination === null) return;

  const travelDate = prompt(
    "Edit Travel Date (YYYY-MM-DD):",
    schedule.travelDate,
  );

  if (travelDate === null) return;

  const capacity = prompt("Edit Capacity (KG):", schedule.capacity);

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

  localStorage.setItem("travelSchedules", JSON.stringify(schedules));

  alert("Travel schedule updated successfully!");

  location.reload();
}

function cancelSchedule(id) {
  const confirmDelete = confirm(
    "Are you sure you want to cancel this travel schedule?",
  );

  if (!confirmDelete) {
    return;
  }

  let schedules = JSON.parse(localStorage.getItem("travelSchedules")) || [];

  schedules = schedules.filter((schedule) => schedule.id != id);

  localStorage.setItem("travelSchedules", JSON.stringify(schedules));

  alert("Travel schedule cancelled successfully!");

  location.reload();
}
