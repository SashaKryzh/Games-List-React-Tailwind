import express from "express";
import GameController from "../controllers/game_controller.js";

const router = express.Router();

router.get("/", async (req, res) =>
  res.send(await GameController.getGames(Number(req.query.page)))
);

router.get("/name/:name", async (req, res) =>
  res.send(
    await GameController.getGamesByName(req.params.name, Number(req.query.page))
  )
);

router.get("/slug/:slug", async (req, res) =>
  res.send(await GameController.getGamesBySlug(req.params.slug))
);

export default router;
