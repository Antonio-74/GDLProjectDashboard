const express = require('express');
const auth = require('../controllers/auth.js');

const router = express.Router();

router.post('/login', auth.login);
router.post('/register', auth.register);
router.post('/logout', auth.logout);

module.exports = router;