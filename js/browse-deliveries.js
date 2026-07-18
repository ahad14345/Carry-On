if (!loggedInUser) {
  alert("Please login first.");
  window.location.href = "login.html";
}

if (loggedInUser.role !== "Traveler") {
  alert("Only travelers can browse deliveries.");
  window.location.href = "login.html";
}

const deliveriesList = document.getElementById("deliveriesList");

// Get traveler's active schedule
let schedules = JSON.parse(localStorage.getItem("travelSchedules")) || [];
const activeSchedule = schedules.find((s) => s.travelerId == loggedInUser.id);

// Display traveler's route info
if (activeSchedule) {
  document.getElementById("travelerDeparture").textContent =
    activeSchedule.departure;
  document.getElementById("travelerDestination").textContent =
    activeSchedule.destination;
  document.getElementById("travelerDate").textContent =
    activeSchedule.travelDate;
} else {
  document.getElementById("travelerDeparture").textContent = "No active trip";
  document.getElementById("travelerDestination").textContent = "No active trip";
  document.getElementById("travelerDate").textContent = "No active trip";
}

let requests = JSON.parse(localStorage.getItem("deliveryRequests")) || [];
let acceptedDeliveries =
  JSON.parse(localStorage.getItem("acceptedDeliveries")) || [];

// Filter requests matching traveler's destination
const matchingRequests = activeSchedule
  ? requests.filter(
      (req) =>
        req.destination.toLowerCase() ===
        activeSchedule.destination.toLowerCase(),
    )
  : [];

// Update match count
document.getElementById("matchCount").textContent =
  "(" + matchingRequests.length + ")";

if (matchingRequests.length === 0) {
  deliveriesList.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #999;">
            <p>📭 No delivery requests match your destination.</p>
            <p style="font-size: 12px;">Check back later or adjust your travel schedule.</p>
        </div>
    `;
} else {
  let html = "";

  matchingRequests.forEach((request) => {
    const isAccepted = acceptedDeliveries.some(
      (ad) => ad.requestId === request.id && ad.travelerId === loggedInUser.id,
    );

    const buttonHTML = isAccepted
      ? `<button class="btn secondary" disabled>✓ Accepted</button>`
      : `<button class="btn primary" onclick="acceptDelivery(${request.id})">Accept Delivery</button>`;

    html += `
            <div class="delivery-card ${isAccepted ? "accepted" : ""}">
                <div class="delivery-header">
                    <div>
                        <h3>${request.pickup} → ${request.destination}</h3>
                        <p class="sender-name">📦 By ${request.senderName}</p>
                    </div>
                    <span class="status-badge ${isAccepted ? "badge-accepted" : ""}">${
                      isAccepted ? "✓ Accepted" : request.status
                    }</span>
                </div>
                <div class="delivery-details">
                    <div class="detail-row">
                        <span class="detail-label">📏 Size:</span>
                        <span class="detail-value">${request.size}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">⚖️ Weight:</span>
                        <span class="detail-value">${request.weight} KG</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">📅 Posted:</span>
                        <span class="detail-value">${request.createdAt}</span>
                    </div>
                </div>
                <div class="delivery-actions">
                    ${buttonHTML}
                </div>
            </div>
        `;
  });

  deliveriesList.innerHTML = html;
}

function acceptDelivery(requestId) {
  const request = requests.find((r) => r.id === requestId);
  if (!request) return;

  const isAlreadyAccepted = (
    JSON.parse(localStorage.getItem("acceptedDeliveries")) || []
  ).some(
    (ad) => ad.requestId === requestId && ad.travelerId === loggedInUser.id,
  );

  if (isAlreadyAccepted) {
    alert("You have already accepted this delivery.");
    return;
  }

  // Create acceptance record
  const acceptance = {
    id: Date.now(),
    requestId: requestId,
    travelerId: loggedInUser.id,
    travelerName: loggedInUser.name,
    senderId: request.senderId,
    acceptedAt: new Date().toLocaleString(),
  };

  // Save to localStorage
  let acceptedDeliveries =
    JSON.parse(localStorage.getItem("acceptedDeliveries")) || [];
  acceptedDeliveries.push(acceptance);
  localStorage.setItem(
    "acceptedDeliveries",
    JSON.stringify(acceptedDeliveries),
  );

  alert("✓ Delivery accepted! Check your dashboard for details.");
  location.reload();
}
