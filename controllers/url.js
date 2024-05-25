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
   // console.log("function first line");
   const body = req.body;
   // console.log(body);
   if (!body.url) return res.status(400).json({ error: "url is required" });
   const shortID = shortid();
   await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
   });
   // console.log("hello from controller");
   return res.json({ id: shortID });
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
         { new: true } // This option returns the modified document
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
   console.log(req.params.shortId);
   await URL.findByIdAndDelete(req.params.id);
   return res.status(400).json({ status: 'deleted' })
}
module.exports = { handleGenerateNewShortURL, handleShortURL, handleAnalytics, handleDeleteShortId, handleAllUrls };