import express from "express";
import dotenv from "dotenv";
import IGDBClient from "./igdb_client.js";
import url from "url";
import { type } from "os";

const app = express();
dotenv.config();
const port = process.env.PORT;
console.log(port);

// init client
IGDBClient.initAccessToken().then(
  () => console.log("Token gained"),
  () => console.error("Failed to get token!")
);

// use cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.REACT_CLIENT_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// apis
app.get("/games", async (req, res) => res.send(await IGDBClient.getGames()));
app.get("/game", async (req, res) => {
  const parsedQuery = url.parse(req.url, true).query;
  if (parsedQuery.name !== undefined) {
    res.send(await IGDBClient.getGameByName(parsedQuery.name as string));
  } else {
    res.send("No name in query");
  }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
