const express = require('express');
const router = express.Router();
const { UserMiddleware } = require('../middleware/UserMiddleware');

const { login, signup } = require('../controllers/UserControllers');
// Define routes for login and signup
router.post('/login', login);
router.post('/signup', signup);
router.use([], UserMiddleware);

module.exports = router;
