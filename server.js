require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const morgan = require("morgan");
const { connection } = require("./connection/config");
const cors = require("cors");
morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    "-",
    tokens.url(req, res),
    "-",
    tokens.status(req, res),
    "-",
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});

// database connectivity
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/shadeImages", express.static("shadeImages/"));

// routes added
app.use(require("./routes/router"));

app.listen(port, () => console.log("Server is running at port", port));
