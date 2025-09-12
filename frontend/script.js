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
const welcomeMessage = document.createElement('h2');

// Our "database" of correct credentials
const CORRECT_EMAIL = "user@example.com";
const CORRECT_PASSWORD = "password123";

// --- Helper function to reset form states ---
function resetFormState() {
    emailInput.classList.remove('error', 'success');
    passwordInput.classList.remove('error', 'success');
    statusMessage.textContent = '';
    statusMessage.className = 'status';
}

// --- Event Listener for Email/Password Form ---
loginForm.addEventListener('submit', async (event) => {
    // 1. Prevent the default form submission behavior
    event.preventDefault();
    resetFormState();

    const email = emailInput.value;
    const password = passwordInput.value;
    // 3. The Login Logic
    // Show a "loading" message
    statusMessage.textContent = "Logging in...";
    statusMessage.style.color = 'gray';

    // Simulate a network delay (like a real API call) with setTimeout
    setTimeout(() => {
        if (email === CORRECT_EMAIL && password === CORRECT_PASSWORD) {
            // SUCCESS!
            statusMessage.textContent = "Success! Redirecting to dashboard...";
            statusMessage.classList.add('success');
            emailInput.classList.add('success');
            passwordInput.classList.add('success');
            // In a real app, you would redirect here:
            // window.location.href = "/dashboard";
        } else {
            // FAILED!
            statusMessage.textContent = "Error: Invalid email or password.";
            statusMessage.classList.add('error');
            emailInput.classList.add('error');
            passwordInput.classList.add('error');
        }
    }, 1000); // Wait 1 second (1000 milliseconds) to simulate loading
});

// --- Event Listener for Simulated Google Login ---
googleLoginButton.addEventListener('click', () => {
    const isConfirmed = confirm(
        "You are being redirected to Google to sign in.\n\n(This is a simulation)\n\nClick 'OK' to simulate a successful login as 'demo.user@gmail.com'."
    );

    if (isConfirmed) {
        // 3. Create a realistic success experience
        statusMessage.textContent = "Successfully authenticated with Google. Welcome back!";
        statusMessage.className = 'status success'; // Use classes instead of inline styles

        // Hide the entire login form
        loginForm.classList.add('hidden');
        googleLoginButton.classList.add('hidden'); // Also hide the Google button

        // Display a welcome message
        welcomeMessage.textContent = 'Welcome, Demo User!';
        loginForm.after(welcomeMessage); // Insert the welcome message after the hidden form
    } else {
        // 4. Handle the case where the user cancels
        statusMessage.textContent = "Google sign-in cancelled.";
        statusMessage.className = 'status error';
    }
});
// --- Event Listeners to clear errors on user input ---
emailInput.addEventListener('input', resetFormState);
passwordInput.addEventListener('input', resetFormState);