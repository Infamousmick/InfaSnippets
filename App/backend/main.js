require("dotenv").config();
const express = require("express");
const initDatabaseConnection = require("./src/config/db");
const server = express();
const PORT = process.env.PORT || 3001
const cors = require("cors");
const pc = require("picocolors");

server.use(cors());
server.use(express.json());

const initServer = async () => {
  await initDatabaseConnection();
  server.listen(PORT, () => {
    console.log(
      pc.green("Server running and listening on port: ") + pc.yellow(PORT),
    );
  });
};
initServer();
