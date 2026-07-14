document.getElementById("email").focus();

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Please enter your email and password.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("carryOnUsers")) || [];

  const user = users.find(
    (user) => user.email.toLowerCase() === email && user.password === password,
  );

  if (!user) {
    alert("Invalid email or password.");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));

  alert("Login Successful!");

  if (user.role === "Sender") {
    window.location.href = "sender-dashboard.html";
  } else {
    window.location.href = "traveler-dashboard.html";
  }
});
