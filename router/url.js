const express = require('express')
const { handleGenerateNewShortURL, handleShortURL, handleAnalytics, handleAllUrls, handleWebPage } = require("./../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/id/:shortId", handleShortURL)

router.get('/', handleAllUrls)

router.get("/test", handleWebPage)

router.get("/analytics/:shortId", handleAnalytics)


// router.delete("/:shortId", handleDeleteShortId)

module.exports = router;