import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export default class IGDBProxy {

  private static readonly AUTH_BASE_URL = "https://id.twitch.tv";
  private static readonly API_BASE_URL = "https://api.igdb.com/v4";

  private static readonly authInstance = axios.create({
    baseURL: IGDBProxy.AUTH_BASE_URL,
  });

  private static apiInstance: AxiosInstance | null = null;

  static async initAccessToken(): Promise<void> {
    const authResponse = await IGDBProxy.authInstance.post("/oauth2/token", null, {
      params: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "client_credentials",
      }
    });
    this.apiInstance = axios.create({
      baseURL: IGDBProxy.API_BASE_URL,
      headers: {
        'Accept': 'application/json',
        'Client-ID': process.env.CLIENT_ID,
        'Authorization': `Bearer ${authResponse.data.access_token}`,
      }
    });
    console.log(authResponse.data.access_token);
  }

  static async post(path: string, body: string): Promise<AxiosResponse<any, any>> {
    if (!this.isInitialized()) {
      // lazy init and retry
      return {
        data: "IGDBProxy is not initialized!",
        status: 400,
        statusText: "Bad Request",
        headers: {},
        config: {},
      }
    }
    const response = await IGDBProxy.apiInstance!.post(path, body);
    return response;
  }

  static async get(path: string): Promise<AxiosResponse<any, any>> {
    if (!this.isInitialized()) {
      return {
        data: "IGDBProxy is not initialized!",
        status: 400,
        statusText: "Bad Request",
        headers: {},
        config: {},
      }
    }
    const response = await IGDBProxy.apiInstance!.get(path);
    return response;
  }

  private static isInitialized(): boolean {
    return this.apiInstance !== null;
  }
}
