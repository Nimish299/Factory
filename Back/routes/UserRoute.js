const express = require('express');
const router = express.Router();
const { UserMiddleware } = require('../middleware/UserMiddleware');

const {
  login,
  signup,
  profile,
  updateProfile,
} = require('../controllers/UserControllers');
// Define routes for login and signup
router.post('/login', login);
router.post('/signup', signup);
router.use(['/updateProfile', '/fetchPlayerInfo', '/profile'], UserMiddleware);
router.get('/profile', profile);
router.put('/updateProfile', updateProfile);
module.exports = router;
