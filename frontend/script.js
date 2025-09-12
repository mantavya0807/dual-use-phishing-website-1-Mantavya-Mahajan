// The URL of your deployed back-end API.
// Replace this with your actual Render URL when you deploy.
const API_URL = 'https://api.outlier-test.com'; // Example URL

// --- DOM Element Selection ---
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const googleLoginButton = document.getElementById('google-login-button');
const statusMessage = document.getElementById('status-message');
const loginWrapper = document.getElementById('login-wrapper');

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
    resetFormState();

    const email = emailInput.value;
    const password = passwordInput.value;

    statusMessage.textContent = "Checking credentials...";

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const resultText = await response.text();

        if (response.ok) {
            statusMessage.textContent = resultText;
            statusMessage.classList.add('success');
            emailInput.classList.add('success');
            passwordInput.classList.add('success');
            // In a real app, you would redirect here or store a token
        } else {
            statusMessage.textContent = resultText;
            statusMessage.classList.add('error');
            emailInput.classList.add('error');
            passwordInput.classList.add('error');
        }
    } catch (error) {
        console.error('Network or server error:', error);
        statusMessage.textContent = 'Failed to connect to the server.';
        statusMessage.classList.add('error');
    }
});

// --- Event Listener for Simulated Google Login ---
googleLoginButton.addEventListener('click', () => {
    const isConfirmed = confirm(
        "You are being redirected to Google to sign in.\n\n(This is a simulation)\n\nClick 'OK' to simulate a successful login."
    );

    if (isConfirmed) {
        loginWrapper.innerHTML = `
            <h1>Welcome Back!</h1>
            <p class="status success">Successfully authenticated via Google.</p>
        `;
    }
});

// --- Event Listeners to clear errors on user input ---
emailInput.addEventListener('input', resetFormState);
passwordInput.addEventListener('input', resetFormState);