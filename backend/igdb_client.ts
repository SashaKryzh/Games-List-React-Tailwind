import axios from "axios";
import { Game } from "@app/models";

export default class IGDBClient {

  private static readonly AUTH_BASE_URL = "https://id.twitch.tv";
  private static readonly API_BASE_URL = "https://api.igdb.com/v4";

  public static accessToken: string | null = null;

  private static readonly authInstance = axios.create({
    baseURL: IGDBClient.AUTH_BASE_URL,
  });

  static async initAccessToken(): Promise<void> {
    const response = await IGDBClient.authInstance.post("/oauth2/token", null, {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "client_credentials",
      }
    });
    this.accessToken = response.data.access_token;
    console.log(this.accessToken);
  }

  static async getGameByName(name: string): Promise<Game[]> {
    console.log("igbd get game by name");
    const response = await axios.post(
      `${this.API_BASE_URL}/games`,
      `fields id, name, cover.url; search "${name}";`,
      {
        headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.CLIENT_ID,
          'Authorization': `Bearer ${IGDBClient.accessToken}`,
        },
      },
    );
    console.log(response.data);

    return response.data.map((game: any) => {
      return {
        id: game.id,
        name: game.name,
      };
    });
  }

  static async getGames(): Promise<Game[]> {
    console.log("igbd get games");
    const response = await axios.post(
      `${this.API_BASE_URL}/games`,
      "fields id, name, cover.url;",
      {
        headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.CLIENT_ID,
          'Authorization': `Bearer ${IGDBClient.accessToken}`,
        },
      },
    );
    
    console.log(response.data);
    return response.data.map((game: any) => {
      return {
        id: game.id,
        name: game.name,
      };
    });
  }
}
