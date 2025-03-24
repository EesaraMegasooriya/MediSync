const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/UserModel'); // User model

// Register User
const registerUser = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        
        email: newUser.email,
        username: newUser.username
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const updateProfile = async (req, res) => {
  try {
    const {
      userId, name, dob, age, address,
      weight, height, emergencyContacts,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'Missing user ID' });
    }

    const updateFields = {
      name,
      dob,
      age,
      address,
      weight,
      height,
      emergencyContacts: Array.isArray(emergencyContacts)
        ? emergencyContacts
        : [emergencyContacts],
    };

    if (req.file) {
      updateFields.profilePicture = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      updatedUser,
    });
  } catch (error) {
    console.error('Update Error:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    console.error('Get user error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};




// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      username: user.username,
      profilePicture: user.profilePicUrl,
      user: { _id: user._id } ,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, updateProfile ,getUserById};
