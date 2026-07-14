const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
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

    // Password Length
    if (password.length < 8) {
        alert("Password must contain at least 8 characters.");
        return;
    }

    // Password Match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    alert("Validation Successful!");

});