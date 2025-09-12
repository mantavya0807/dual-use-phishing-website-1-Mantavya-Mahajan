const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();

// --- Middleware ---
// Allow requests from any origin (for development)
// In production, you should restrict this to your front-end's domain
app.use(cors()); 
// Enable the express server to parse JSON bodies from requests
app.use(express.json());

// --- In-Memory "Database" ---
// In a real application, this data would be in a persistent database like MongoDB or PostgreSQL.
const users = [];

// --- API Endpoints ---

// POST /register
// Creates a new user with a hashed password.
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Simple validation
        if (!email || !password) {
            return res.status(400).send("Email and password are required.");
        }

        // Check if user already exists
        if (users.find(user => user.email === email)) {
            return res.status(409).send("User with this email already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { email, password: hashedPassword };
        users.push(newUser);

        console.log("Current users in DB:", users);
        res.status(201).send("User registered successfully!");

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send("Internal server error.");
    }
});

// POST /login
// Authenticates a user.
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.find(u => u.email === email);
        
        if (!user) {
            // Use a generic message to prevent leaking info about which emails are registered
            return res.status(400).send("Invalid email or password.");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            res.status(200).send("Success! You are logged in.");
        } else {
            res.status(400).send("Invalid email or password.");
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Internal server error.");
    }
});

// --- Start the server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});