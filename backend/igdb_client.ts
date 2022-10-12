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

  
  static async getGamesByName(name: string): Promise<Game[]> {
    const response = await axios.post(
      `${this.API_BASE_URL}/games`,
      `fields id, slug, name, cover.url, summary, genres.name, screenshots.url; search "${name}";`,
      {
        headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.CLIENT_ID,
          'Authorization': `Bearer ${IGDBClient.accessToken}`,
        },
      },
    );
    console.log(response.data);
    // TODO: populate with company
    return response.data.map(this.mapResponseToGame);
  }

  static async getGamesBySlug(slug: string): Promise<Game[]> {
    const response = await axios.post(
      `${this.API_BASE_URL}/games`,
      `fields id, slug, name, cover.url, summary, genres.name, screenshots.url; where slug = "${slug}";`,
      {
        headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.CLIENT_ID,
          'Authorization': `Bearer ${IGDBClient.accessToken}`,
        },
      },
    );
    console.log(response.data);
    // TODO: populate with company
    return response.data.map(this.mapResponseToGame);
  }

  static async getGames(): Promise<Game[]> {
    const response = await axios.post(
      `${this.API_BASE_URL}/games`,
      "fields id, slug, name, cover.url;",
      {
        headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.CLIENT_ID,
          'Authorization': `Bearer ${IGDBClient.accessToken}`,
        },
      },
    );
    console.log(response.data);
    return response.data.map(this.mapResponseToGame);
  }

  private static mapResponseToGame(response: any): Game {
    return {
      id: response.id,
      name: response.name,
      slug: response.slug,
      coverUrl: response.cover?.url,
      summary: response.summary,
      genres: response.genres?.map((genre: any) => genre.name),
      screenshots: response.screenshots?.map((screenshot: any) => screenshot.url),
      company: response.company?.name,
    };
  }
}
