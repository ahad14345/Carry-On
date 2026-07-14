const registerForm = document.getElementById("registerForm");

document.getElementById("name").focus();

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const role = document.querySelector('input[name="role"]:checked').value;

  // Empty Fields
  if (
    name === "" ||
    email === "" ||
    phone === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }

  // Name Validation
  if (name.length < 3) {
    alert("Name must be at least 3 characters.");
    return;
  }

  // Email Validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email.");
    return;
  }

  // Phone Validation
  const phonePattern = /^01\d{9}$/;

  if (!phonePattern.test(phone)) {
    alert("Phone number must be 11 digits and start with 01.");
    return;
  }

  // Password Validation
  if (password.length < 8) {
    alert("Password must contain at least 8 characters.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Get Existing Users
  let users = JSON.parse(localStorage.getItem("carryOnUsers")) || [];

  // Check Duplicate Email
  const emailExists = users.some((user) => user.email.toLowerCase() === email);

  if (emailExists) {
    alert("An account with this email already exists.");
    return;
  }

  // Create New User
  const newUser = {
    id: Date.now(),

    name: name,

    email: email,

    phone: phone,

    role: role,

    password: password,
  };

  // Save User
  users.push(newUser);

  localStorage.setItem("carryOnUsers", JSON.stringify(users));

  alert("Registration successful! Redirecting to Login...");

  registerForm.reset();

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
});
