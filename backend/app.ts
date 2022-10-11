import express from "express";
import dotenv from "dotenv";
import IGDBClient from "./igdb_client.js";

const app = express();
dotenv.config();
const port = process.env.PORT;
console.log(port);

// init client
IGDBClient.initAccessToken().then(
  () => console.log("Token gained"),
  () => console.error("Failed to get token!")
);

// apis
app.get("/games", async (req, res) => res.send(await IGDBClient.getGames()));
app.get("/game", async (req, res) => {
  var query = require("url").parse(req.url, true).query;
  console.log(query);
  res.send(IGDBClient.getGameByName(query.name));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
