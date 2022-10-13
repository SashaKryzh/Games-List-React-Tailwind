import express from "express";
import dotenv from "dotenv";
import gameRoutes from "./api/routes/game_routes.js";
import IGDBProxy from "./api/proxies/igdb_proxy.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.REACT_CLIENT_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// apis
app.use("/games", gameRoutes);


const port = process.env.PORT || 3030;
app.set('port', port);

app.listen(port, () => console.log(`Listening on port ${port}!`));


// init client
// TODO: remove this from here
IGDBProxy.initAccessToken().then(
  () => console.log("Token gained"),
  () => console.error("Failed to get token!")
);