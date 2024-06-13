const userModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60; // 3 days

// Function to create a JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: maxAge,
  });
};

// Login Controller
const login = async (req, res) => {
  const { emailID, password } = req.body;
  // console.log(`here`, emailID);
  try {
    // Attempt to login the user
    const user = await userModel.login(emailID, password);
    console.log(`here`, emailID);
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    // Create JWT token
    const token = createToken(user._id);
    console.log('token', token);

    // Send the token to the client
    res.status(200).json({ token });
  } catch (error) {
    // Handle errors and send error response
    return res.status(400).json({ error: error.message });
  }
};

// Signup Controller
const signup = async (req, res) => {
  const { name, emailID, password, mobileNumber } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ emailID });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    // console.log(`here`, emailID);
    // Create a new user
    const newUser = await userModel.create({
      name,
      emailID,
      password,
      mobileNumber,
    });
    // console.log(`here 2.0`, newUser);
    // Create JWT token
    const token = createToken(newUser._id);

    // Send the token to the client
    res.status(200).json({ token });
  } catch (error) {
    // Handle errors and send error response
    return res.status(400).json({ error: error.message });
  }
};

// Export the functions
module.exports = {
  login,
  signup,
};
