if (!loggedInUser) {
  window.location.href = "login.html";
}

if (loggedInUser.role !== "Sender") {
  alert("Access Denied");
  window.location.href = "login.html";
}

document.getElementById("welcome").innerHTML =
  "Welcome, <b>" + loggedInUser.name + "</b>! Ready to send packages?";

// Display notifications (accepted deliveries)
let requests = JSON.parse(localStorage.getItem("deliveryRequests")) || [];
const myRequests = requests.filter((r) => r.senderId === loggedInUser.id);
const acceptedRequests = myRequests.filter((r) => r.status === "Accepted");

const notificationsList = document.getElementById("notificationsList");

if (acceptedRequests.length === 0) {
  notificationsList.innerHTML = `
    <div style="text-align: center; padding: 40px 20px; background: #f0fdf4; border-radius: 10px; border-left: 4px solid #10b981;">
      <p style="font-size: 16px; color: #999;">No notifications yet.</p>
      <p style="font-size: 14px; color: #ccc; margin-top: 10px;">Your accepted deliveries will appear here!</p>
    </div>
  `;
} else {
  let html = "";
  acceptedRequests.forEach((req) => {
    html += `
      <div class="delivery-card" style="background: #f0fdf4; border-left-color: #10b981;">
        <div class="delivery-header">
          <div>
            <h3>${req.pickup} → ${req.destination}</h3>
            <p class="sender-name">👤 Traveler: ${req.travelerName}</p>
          </div>
          <span class="status-badge" style="background: #10b981;">✓ Accepted</span>
        </div>
        <div class="delivery-details">
          <div class="detail-row">
            <span class="detail-label">📏 Size:</span>
            <span class="detail-value">${req.size}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">⚖️ Weight:</span>
            <span class="detail-value">${req.weight} KG</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">📅 Accepted:</span>
            <span class="detail-value">${req.acceptedAt}</span>
          </div>
        </div>
      </div>
    `;
  });
  notificationsList.innerHTML = html;
}

// Display sender's requests
const requestsList = document.getElementById("requestsList");

if (myRequests.length === 0) {
  requestsList.innerHTML = `
    <div style="text-align: center; padding: 60px 20px; background: white; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);">
      <p style="font-size: 16px; color: #999;">No delivery requests yet.</p>
      <p style="font-size: 14px; color: #ccc; margin-top: 10px;">Create your first request to get started!</p>
    </div>
  `;
} else {
  let html = "";
  myRequests.forEach((req) => {
    html += `
      <div class="delivery-card">
        <div class="delivery-header">
          <div>
            <h3>${req.pickup} → ${req.destination}</h3>
            <p class="sender-name">📅 Posted: ${req.createdAt}</p>
          </div>
          <span class="status-badge">${req.status}</span>
        </div>
        <div class="delivery-details">
          <div class="detail-row">
            <span class="detail-label">📏 Size:</span>
            <span class="detail-value">${req.size}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">⚖️ Weight:</span>
            <span class="detail-value">${req.weight} KG</span>
          </div>
          ${
            req.status === "Accepted"
              ? `
            <div class="detail-row">
              <span class="detail-label">👤 Traveler:</span>
              <span class="detail-value">${req.travelerName}</span>
            </div>
          `
              : ""
          }
        </div>
      </div>
    `;
  });
  requestsList.innerHTML = html;
}

// ==================== SCRUM-14: Match Travelers ====================
// Get all travel schedules
let schedules = JSON.parse(localStorage.getItem("travelSchedules")) || [];

// Find pending requests
const pendingRequests = myRequests.filter((r) => r.status === "Pending");

// Function to find matching travelers for a request
function findMatchingTravelers(request) {
  return schedules.filter(
    (schedule) =>
      schedule.destination.toLowerCase() ===
      request.destination.toLowerCase()
  );
}

// Display matching travelers section
const matchTravelersSection = document.getElementById("matchTravelersSection");

if (pendingRequests.length === 0) {
  matchTravelersSection.innerHTML = `
    <div style="text-align: center; padding: 40px 20px; background: white; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);">
      <p style="font-size: 16px; color: #999;">No pending requests to match.</p>
      <p style="font-size: 14px; color: #ccc; margin-top: 10px;">All your deliveries are either accepted or completed!</p>
    </div>
  `;
} else {
  let html = "";
  pendingRequests.forEach((req) => {
    const matchingTravelers = findMatchingTravelers(req);
    const matchCount = matchingTravelers.length;
    const matchColor = matchCount > 0 ? "#10b981" : "#ef4444";
    const matchText = matchCount > 0 ? `✓ ${matchCount} matches` : "✗ No matches";

    html += `
      <div class="delivery-card">
        <div class="delivery-header">
          <div>
            <h3>${req.pickup} → ${req.destination}</h3>
            <p class="sender-name">📅 Posted: ${req.createdAt}</p>
          </div>
          <span class="status-badge" style="background: ${matchColor}; cursor: pointer;" onclick="openMatchModal(${req.id})" title="Click to view travelers">
            ${matchText}
          </span>
        </div>
        <div class="delivery-details">
          <div class="detail-row">
            <span class="detail-label">📏 Size:</span>
            <span class="detail-value">${req.size}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">⚖️ Weight:</span>
            <span class="detail-value">${req.weight} KG</span>
          </div>
        </div>
        <div class="delivery-actions" style="margin-top: 15px;">
          ${
            matchCount > 0
              ? `<button class="btn primary" onclick="openMatchModal(${req.id})" style="width: 100%;">🤝 View & Select Travelers</button>`
              : `<p style="color: #999; font-size: 14px; margin: 0;">No matching travelers found</p>`
          }
        </div>
      </div>
    `;
  });
  matchTravelersSection.innerHTML = html;
}

// Modal functions
function openMatchModal(requestId) {
  const request = myRequests.find((r) => r.id === requestId);
  const matchingTravelers = findMatchingTravelers(request);

  document.getElementById("matchModalDeliveryInfo").innerHTML =
    `<strong>${request.pickup} → ${request.destination}</strong> | Size: ${request.size} | Weight: ${request.weight} KG`;

  let travelersList = "";
  if (matchingTravelers.length === 0) {
    travelersList = `
      <div style="text-align: center; padding: 20px; color: #999;">
        <p>No travelers available for this route.</p>
      </div>
    `;
  } else {
    travelersList = matchingTravelers
      .map(
        (traveler) => `
      <div class="delivery-card" style="margin-bottom: 15px;">
        <div class="delivery-header">
          <div>
            <h3>👤 ${traveler.travelerName}</h3>
            <p class="sender-name">📍 ${traveler.departure} → ${traveler.destination}</p>
          </div>
        </div>
        <div class="delivery-details">
          <div class="detail-row">
            <span class="detail-label">📅 Travel Date:</span>
            <span class="detail-value">${traveler.travelDate}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">📦 Capacity:</span>
            <span class="detail-value">${traveler.capacity} KG</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">📊 Status:</span>
            <span class="detail-value">${traveler.status}</span>
          </div>
        </div>
        <div class="delivery-actions" style="margin-top: 15px;">
          <button class="btn primary" onclick="selectTraveler(${requestId}, ${traveler.id})" style="width: 100%;">✓ Select This Traveler</button>
        </div>
      </div>
    `
      )
      .join("");
  }

  document.getElementById("matchModalTravelersList").innerHTML = travelersList;
  document.getElementById("matchModal").style.display = "flex";
}

function closeMatchModal() {
  document.getElementById("matchModal").style.display = "none";
}

function selectTraveler(requestId, travelerId) {
  const request = myRequests.find((r) => r.id === requestId);
  const traveler = schedules.find((t) => t.id === travelerId);

  if (!request || !traveler) return;

  // Store the match preference
  let matches = JSON.parse(localStorage.getItem("travelerMatches")) || [];
  
  // Check if already matched
  const existingMatch = matches.find(
    (m) => m.requestId === requestId && m.travelerId === travelerId
  );

  if (existingMatch) {
    alert("Already matched with this traveler!");
    return;
  }

  // Create match record
  const match = {
    id: Date.now(),
    requestId: requestId,
    travelerId: travelerId,
    senderId: loggedInUser.id,
    senderName: loggedInUser.name,
    travelerName: traveler.travelerName,
    matchedAt: new Date().toLocaleString(),
  };

  matches.push(match);
  localStorage.setItem("travelerMatches", JSON.stringify(matches));

  alert(`✓ Matched with ${traveler.travelerName}! They will be notified.`);
  closeMatchModal();
  location.reload();
}
