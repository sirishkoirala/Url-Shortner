const express = require("express");
const app = express();
const connectToMongoDB = require("./connect");
const urlRoute = require("./router/url");
const { handleShortURL, handleAnalytics, handleDeleteShortId , handleAllUrls} = require("./controllers/url");
const PORT = 8001;
// const shortid = require('shortid')
connectToMongoDB("mongodb://127.0.0.1:27017/Url-Shortner").then(() => console.log("MongoDB connected Successfully !!"));

app.use(express.json());


app.use("/url", urlRoute);
// app.use("/:shortId", urlRoute);
app.get("/:shortId", handleShortURL)

app.get('/url/all', handleAllUrls)

app.get("/analytics/:shortId", handleAnalytics)

app.delete("/:shortId", handleDeleteShortId)




// Server stared on port
app.listen(PORT, () => console.log("Server Started on PORT", PORT));
