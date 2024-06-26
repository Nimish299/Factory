const userModel = require('../models/UserModel');
const cardmodel = require('../models/CardModel');
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

const signup = async (req, res) => {
  const { name, emailID, password, mobileNumber } = req.body;

  console.log('Incoming signup request:', {
    name,
    emailID,
    password,
    mobileNumber,
  });

  try {
    // Check if user already exists
    // console.log('Checking if user already exists with emailID:', emailID);
    const existingUser = await userModel.findOne({ emailID });

    if (existingUser) {
      // console.log('User with emailID already exists:', emailID);
      return res.status(400).json({ error: 'Email already exists' });
    }

    // console.log('User does not exist. Proceeding to create a new user...');

    // If user does not exist, create a new user
    const user = await userModel.create({
      name,
      emailID,
      password,
      mobileNumber,
    });

    // console.log('New user created:', user);

    // Generate token for the new user
    const token = createToken(user._id);
    // console.log('Token generated for user:', user._id);

    // Respond with token
    return res.status(200).json({ token });
  } catch (err) {
    console.error('Error during signup:', err);
    return res.status(500).json({ error: 'Server error during signup' });
  }
};

const profile = async (req, res) => {
  try {
    // console.log(req.userid);
    const user = await userModel.findOne({ _id: req.userid });
    // console.log('print:', { user });
    if (!user) return res.status(404).json({ error: 'user not found' });

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching player profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const createCard = async (req, res) => {
  try {
    const userId = req.userid; // Assuming user info is added by middleware
    console.log(userId);
    // Create a new card instance
    const newCard = new cardmodel({
      user: userId,
      ...req.body,
    });

    // Save the new card
    const savedCard = await newCard.save();
    console.log('dd');
    // Update the user's cards array
    await userModel.findByIdAndUpdate(
      userId,
      { $push: { cards: { cardId: savedCard._id } } },
      { new: true, useFindAndModify: false }
    );

    res.status(201).json(savedCard);
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.userid });
    if (!user) return res.status(404).json({ error: 'user not found' });

    const { emailID, password, ...updatedData } = req.body;
    console.log('updatedata', { updatedData });
    user.set(updatedData);

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const Fetchcard = async (req, res) => {
  try {
    const cardId = req.params.cardId;
    // console.log(req.userid);
    const card = await cardmodel
      .findById(cardId)
      .populate('user', 'name email profile company address socialMediaLinks');

    if (!card) return res.status(404).json({ error: 'Card not found' });

    res.status(200).json(card);
  } catch (error) {
    console.error('Error fetching Card info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updatecard = async (req, res) => {
  try {
    const cardId = req.params.cardId;
    // console.log(req.userid);
    const card = await cardmodel
      .findById(cardId)
      .populate('user', 'name email profile company address socialMediaLinks');

    const { user, ...updatedData } = req.body;
    console.log('updatedata', { updatedData });
    card.set(updatedData);

    await card.save();

    res.status(200).json(card);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
///
// Export the functions
module.exports = {
  login,
  signup,
  profile,
  updateProfile,
  Fetchcard,
  updatecard,
  createCard,
};
