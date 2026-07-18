if (!loggedInUser) {
  alert("Please login first.");
  window.location.href = "login.html";
}

if (loggedInUser.role !== "Traveler") {
  alert("Only travelers can browse deliveries.");
  window.location.href = "login.html";
}

const deliveriesList = document.getElementById("deliveriesList");

let requests = JSON.parse(localStorage.getItem("deliveryRequests")) || [];

if (requests.length === 0) {
  deliveriesList.innerHTML = `
        <p>No delivery requests available at the moment.</p>
    `;
} else {
  let html = "";

  requests.forEach((request) => {
    html += `
            <div class="delivery-card">
                <div class="delivery-header">
                    <h3>${request.pickup} → ${request.destination}</h3>
                    <span class="status-badge">${request.status}</span>
                </div>
                <div class="delivery-details">
                    <p><strong>Sender:</strong> ${request.senderName}</p>
                    <p><strong>Package Size:</strong> ${request.size}</p>
                    <p><strong>Weight:</strong> ${request.weight} KG</p>
                    <p><strong>Posted:</strong> ${request.createdAt}</p>
                </div>
                <button class="btn primary" onclick="acceptDelivery(${request.id})">
                    Accept Delivery
                </button>
            </div>
        `;
  });

  deliveriesList.innerHTML = html;
}

function acceptDelivery(requestId) {
  alert(
    "You accepted delivery request #" + requestId + ". Feature coming soon!",
  );
}
