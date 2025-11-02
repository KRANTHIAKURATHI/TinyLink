const express = require('express');
const router = express.Router();
const validateUrl = require('../utils/validateUrl');
const { shortenUrl } = require('../controllers/urlController');

router.post('/shorten', shortenUrl);

module.exports = router;
