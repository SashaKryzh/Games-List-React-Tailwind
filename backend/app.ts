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
app.get("/games/name/:name", async (req, res) => {
  res.send(await IGDBClient.getGamesByName(req.params.name));
});
app.get("/games/slug/:slug", async (req, res) => {
  res.send(await IGDBClient.getGamesBySlug(req.params.slug));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
