const express = require("express");
const { json } = require("body-parser");
const cors = require("cors"); // ✅ import cors
const adminRoutes = require("./routes/adminRoutes")
const contactRoutes = require("./routes/contactRoutes")
const memberRoutes = require("./routes/memberRoutes")
const seriesRoutes = require("./routes/seriesRoutes")
const testRoutes = require("./routes/testRoutes")
const userRoutes = require("./routes/userRoutes")
const questionRoutes = require("./routes/questionRoutes")

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true })); // ✅ use cors middleware
app.use(json());         // body parser

app.use("/api/admin", adminRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/member", memberRoutes)
app.use("/api/series", seriesRoutes)
app.use("/api/test", testRoutes)
app.use("/api/user", userRoutes)
app.use("/api/question", questionRoutes)

module.exports = app;
