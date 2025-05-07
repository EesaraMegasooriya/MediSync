const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { registerUser, loginUser, updateProfile } = require('../Controllers/UserController');


//  Setup multer for profile picture upload (define before using)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

//  Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

//  Update Profile Route (with picture upload)
router.put('/update-profile', upload.single('profilePicture'), updateProfile);


const { getUserById } = require('../Controllers/UserController');

router.get('/:id', getUserById); //  Add this to fetch by userId


module.exports = router;
