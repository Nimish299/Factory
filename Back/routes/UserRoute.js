const express = require('express');
const router = express.Router();
const { UserMiddleware } = require('../middleware/UserMiddleware');

const {
  login,
  signup,
  profile,
  updateProfile,
  Fetchcard,
  updatecard,
  createCard,
} = require('../controllers/UserControllers');
// Define routes for login and signup
router.post('/login', login);
router.post('/signup', signup);
router.use(
  [
    '/updateProfile',
    '/fetchPlayerInfo',
    '/profile',
    // '/card/:cardId',
    '/updatecard/:cardId',
    '/createCard',
  ],
  UserMiddleware
);
router.get('/profile', profile);
router.put('/updateProfile', updateProfile);

//card

router.get('/card/:cardId', Fetchcard);
router.put('/updatecard/:cardId', updatecard);
router.post('/createCard', createCard);

module.exports = router;
