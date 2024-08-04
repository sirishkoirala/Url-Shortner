const shortid = require('shortid')
const URL = require('../models/url')

async function handleAllUrls(req, res) {
   const allUrls = await URL.find({});
   return res.end(`
   <html>
      <body>
         <ol>
         ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join("")}
         </ol>
      </body>
   </html>`)
}

async function handleGenerateNewShortURL(req, res) {
   const body = req.body;
   if (!body.url) return res.status(400).json({ error: "url is required" });
   const shortID = shortid();
   await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
   });
   return res.render("home", {
      id: shortID
   })
   // return res.json({ id: shortID });
}
async function handleShortURL(req, res) {
   const shortId = req.params.shortId;

   try {
      const entry = await URL.findOneAndUpdate(
         { shortId },
         {
            $push: {
               visitHistory: {
                  timestamp: Date.now()
               }
            }
         },
         { new: true }
      );

      if (entry) {
         console.log(entry.shortId);
         res.redirect(entry.redirectURL);
      } else {
         console.error('No entry found for the provided shortId');
         res.status(404).send('URL not found');
      }
   } catch (error) {
      console.error('Error finding and updating entry:', error);
      res.status(500).send('Internal Server Error');
   }
};



async function handleAnalytics(req, res) {
   const shortId = req.params.shortId;
   const result = await URL.findOne({ shortId })
   return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory
   })
}


async function handleDeleteShortId(req, res) {
   try {
      const deletedURL = await URL.findOneAndDelete({ shortId: req.params.shortId });
      if (!deletedURL) {
         return res.status(404).json({ status: 'not found' });
      }
      return res.status(200).json({ status: 'deleted' });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
   }
}


async function handleWebPage(req, res) {
   const allUrls = await URL.find({})
   return res.render("home", { urls: allUrls });
}
module.exports = { handleGenerateNewShortURL, handleShortURL, handleAnalytics, handleDeleteShortId, handleAllUrls, handleWebPage };