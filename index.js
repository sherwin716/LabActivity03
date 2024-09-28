// Import the Express library
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of an Express application
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Array to store user data
const users = [];

// Function to validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Function to validate password length
const isValidPassword = (password) => {
    return password && password.length >= 6; // Minimum length of 6 characters
};

// Route to handle GET requests
app.get('/users', (req, res) => {
    console.log('GET /users endpoint was accessed');
    res.status(200).json(users);
});

// Route to handle POST requests
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Check for required fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    // Check for valid email format
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Check for valid password length
    if (!isValidPassword(password)) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    // Check if the email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).json({ error: 'Email already registered.' });
    }

    // Add new user
    users.push({ name, email, password });
    console.log(`POST /register endpoint was accessed: ${JSON.stringify(users)}`);
    res.status(201).json({ message: 'User registered successfully.' });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
