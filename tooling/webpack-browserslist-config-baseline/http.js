/* eslint-disable */

const path = require("path");
const express = require("express");
const app = express();
const htdocs = path.join(process.cwd(), "dist");

// Run static server
app.use(express.static(htdocs));
app.listen(8080);

console.log("App test up and running at http://localhost:8080/");
console.log("Press Ctrl+C to quit.");
