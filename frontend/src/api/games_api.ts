import axios from "axios";
import { Game } from "@app/models";

export default class GamesApi {
  private static readonly API_BASE_URL = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`;

  private static readonly instance = axios.create({
    baseURL: GamesApi.API_BASE_URL,
  });

  static async getGamesByName(name: string, page: number): Promise<Game[]> {
    const response = await GamesApi.instance.get<Game[]>(
      `/games/name/${name}`,
      { params: { page: page } }
    );
    return response.data;
  }

  static async getGamesBySlug(slug: string): Promise<Game[]> {
    const response = await GamesApi.instance.get<Game[]>(`/games/slug/${slug}`);
    return response.data;
  }

  static async getGames(page: number): Promise<Game[]> {
    const response = await GamesApi.instance.get<Game[]>("/games", {
      params: { page: page },
    });
    return response.data;
  }
}
