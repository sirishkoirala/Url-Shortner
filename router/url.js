const express = require('express')
const { handleGenerateNewShortURL } = require('../controllers/url')
const router = express.Router();

router.post("/", handleGenerateNewShortURL);

// router.delete("/:shortId", handleDeleteShortId)

module.exports = router;