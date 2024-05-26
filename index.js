const express = require("express");
const app = express();
const path = require("path");
const connectToMongoDB = require("./connect");
const urlRoute = require("./router/url");
const staticRoute = require("./router/static");
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/Url-Shortner").then(() => console.log("MongoDB connected Successfully !!"));

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/url", urlRoute);
app.use("/", staticRoute)

// Server stared on port
app.listen(PORT, () => console.log("Server Started on PORT", PORT));
