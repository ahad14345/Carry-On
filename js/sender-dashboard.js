const loggedInUser = requireRole("Sender");
if (!loggedInUser) return;

// Set welcome message
document.getElementById("welcome").innerHTML =
  "Welcome, <b>" + loggedInUser.name + "</b>! Ready to send packages?";

// Display sender's requests
const requests = getAllRequests();
const myRequests = requests.filter((r) => r.senderId === loggedInUser.id);
const requestsList = document.getElementById("requestsList");

if (myRequests.length === 0) {
  requestsList.innerHTML = `
    <div style="text-align: center; padding: 40px; color: #999;">
      <p>No delivery requests yet.</p>
      <p style="font-size: 14px;">Create your first request to get started!</p>
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
            <p class="sender-name">📅 ${req.createdAt}</p>
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
        </div>
      </div>
    `;
  });
  requestsList.innerHTML = html;
}
