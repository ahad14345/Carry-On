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
