import { Game } from "@app/models";
import IGDBProxy from "../proxies/igdb_proxy.js";

export default class GameController {
  static async getGames(page: number): Promise<Game[]> {
    const offset = (page - 1) * 20;

    const response = await IGDBProxy.post(
      "/games",
      `fields id, slug, name, cover.url; limit 20; offset ${offset};`
    );
    if (response.status !== 200) {
      return [];
    }
    return response.data.map(this.mapResponseToGame);
  }

  static async getGamesByName(name: string, page: number): Promise<Game[]> {
    const offset = (page - 1) * 20;

    const response = await IGDBProxy.post(
      "/games",
      `fields id, slug, name, cover.url, summary, genres.name, screenshots.url; limit 20; offset ${offset}; search "${name}";`
    );
    if (response.status !== 200) {
      return [];
    }
    // TODO: populate with company
    return response.data.map(this.mapResponseToGame);
  }

  static async getGamesBySlug(slug: string): Promise<Game[]> {
    const response = await IGDBProxy.post(
      "/games",
      `fields id, slug, name, cover.url, summary, genres.name, screenshots.url; limit 20; where slug = "${slug}";`
    );
    if (response.status !== 200) {
      return [];
    }
    // TODO: populate with company
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
      screenshots: response.screenshots?.map(
        (screenshot: any) => screenshot.url
      ),
      company: response.company?.name,
    };
  }
}
