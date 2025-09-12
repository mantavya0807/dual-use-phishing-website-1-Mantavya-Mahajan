// The URL of your deployed back-end API.
// Replace this with your actual Render URL when you deploy.
// const API_URL = 'https://localhost:3000'; // Example URL

// --- DOM Element Selection ---
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const statusMessage = document.getElementById('status-message');
const googleLoginButton = document.getElementById('google-login-button');
const loginWrapper = document.getElementById('login-wrapper');

// Our "database" of correct credentials
const CORRECT_EMAIL = "user@example.com";
const CORRECT_PASSWORD = "password123";

// --- Helper function to reset form states ---
// function resetFormState() {
//     emailInput.classList.remove('error', 'success');
//     passwordInput.classList.remove('error', 'success');
//     statusMessage.textContent = '';
//     statusMessage.className = 'status';
// }

// --- Event Listener for Email/Password Form ---
loginForm.addEventListener('submit', async (event) => {
    // 1. Prevent the default form submission behavior
    event.preventDefault();
    // resetFormState();

    const email = emailInput.value;
    const password = passwordInput.value;
    // 2. Get the values from the input fields
    statusMessage.textContent = "Checking credentials...";
    // 3. The Login Logic
    // Show a "loading" message
    statusMessage.textContent = "Logging in...";
    statusMessage.style.color = 'gray';

    // Simulate a network delay (like a real API call) with setTimeout
    setTimeout(() => {
        if (email === CORRECT_EMAIL && password === CORRECT_PASSWORD) {
            // SUCCESS!
            statusMessage.textContent = "Success! Redirecting to dashboard...";
            statusMessage.style.color = 'green';
            // In a real app, you would redirect here:
            // window.location.href = "/dashboard";
        } else {
            // FAILED!
            statusMessage.textContent = "Error: Invalid email or password.";
            statusMessage.style.color = 'red';
        }
    }, 1000); // Wait 1 second (1000 milliseconds) to simulate loading
});

// // --- Event Listener for Simulated Google Login ---
// googleLoginButton.addEventListener('click', () => {
//     const isConfirmed = confirm(
//         "You are being redirected to Google to sign in.\n\n(This is a simulation)\n\nClick 'OK' to simulate a successful login."
//     );

//     if (isConfirmed) {
//         loginWrapper.innerHTML = `
//             <h1>Welcome Back!</h1>
//             <p class="status success">Successfully authenticated via Google.</p>
//         `;
//     }
// });

// // --- Event Listeners to clear errors on user input ---
// emailInput.addEventListener('input', resetFormState);
// passwordInput.addEventListener('input', resetFormState);