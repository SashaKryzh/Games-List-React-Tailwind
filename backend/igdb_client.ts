import axios from "axios";

export default class IGDBClient {
  // proxy https://cors-anywhere.herokuapp.com/

  private static readonly AUTH_BASE_URL = "https://id.twitch.tv";
  private static readonly API_BASE_URL = "https://api.igdb.com/v4";

  public static accessToken: string | null = null;

  private static readonly instance = axios.create({
    baseURL: IGDBClient.API_BASE_URL,
    headers: {
      "Client-ID": process.env.CLIENT_ID,
      "Content-Type": "application/json",
    },
  });

  private static readonly authInstance = axios.create({
    baseURL: IGDBClient.AUTH_BASE_URL,
  });

  // Get access token and save
  static async initAccessToken(): Promise<void> {
    const response = await IGDBClient.authInstance.post("/oauth2/token", null, {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "client_credentials",
      },
    });
    this.accessToken = response.data.access_token;
    IGDBClient.instance.interceptors.request.use((config) => {
      config.headers!.Authorization = `Bearer ${IGDBClient.accessToken}`;
      return config;
    });
  }

  // Get game by name
  static async getGameByName(name: string) {
    const response = await IGDBClient.instance.post(
      "/games",
      `fields name, cover.url; search "${name}";`
    );
    return response.data;
  }

  static async getGames() {
    const response = await IGDBClient.instance.post(
      "/games",
      `fields name; limit 10;`
    );
    console.log("Here");
    
    console.log(response.data);
    
    return response.data;
  }
}
