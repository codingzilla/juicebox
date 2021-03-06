require("dotenv").config();
const PORT = 3000;
const express = require("express");
const server = express();
const apiRouter = require("./api");
const { client } = require("./db");
const morgan = require("morgan");
const bodyParser = require("body-parser");

server.use(morgan("dev"));
server.use(express.json());
server.use("/api", apiRouter);

client.connect();

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

server.use("/api", (req, res, next) => {
  console.log("A request was made to /api");
  next();
});

server.get("/api", (req, res, next) => {
  console.log("A get request was made to /api");
  res.send({ message: "success" });
});

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
