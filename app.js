const express = require("express");
const { json } = require("body-parser");
const cors = require("cors"); // ✅ import cors

const app = express();

app.use(cors());         // ✅ use cors middleware
app.use(json());         // body parser

module.exports = app;
