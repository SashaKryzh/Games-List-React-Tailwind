import axios from "axios";
import { Game } from "@app/models";

export default class GamesApi {
  private static readonly API_BASE_URL = "https://localhost:3030";

  private static readonly instance = axios.create({
    baseURL: GamesApi.API_BASE_URL,
  });

  // Get game by name
  static async getGameByName(name: string) {
    const response = await GamesApi.instance.get<Game>("/game", {
      params: { name: name },
    });
    return response.data;
  }

  static async getGames() {
    const response = await GamesApi.instance.get<Game[]>("/games");
    return response.data;
  }
}
