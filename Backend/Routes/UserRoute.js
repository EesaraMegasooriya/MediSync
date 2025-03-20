const express = require('express');
const { registerUser, loginUser } = require('../Controllers/UserController'); // Import the controller functions
const router = express.Router();

// POST route for user registration
router.post('/register', registerUser);

// POST route for user login
router.post('/login', loginUser);

module.exports = router;
