import { Game } from "@app/models";
import IGDBProxy from "../proxies/igdb_proxy.js";

export default class GameController {

    static async getGames(): Promise<Game[]> {
        const response = await IGDBProxy.post("/games", "fields id, slug, name, cover.url;");
        console.log(response.data);
        if (response.status !== 200) {
            return [];
        }
        return response.data.map(this.mapResponseToGame);
    }

    static async getGamesByName(name: string): Promise<Game[]> {
        const response = await IGDBProxy.post("/games", `fields id, slug, name, cover.url, summary, genres.name, screenshots.url; search "${name}";`);
        console.log(response.data);
        if (response.status !== 200) {
            return [];
        }
        // TODO: populate with company
        return response.data.map(this.mapResponseToGame);
    }

    static async getGamesBySlug(slug: string): Promise<Game[]> {
        const response = await IGDBProxy.post("/games", `fields id, slug, name, cover.url, summary, genres.name, screenshots.url; where slug = "${slug}";`);
        if (response.status !== 200) {
            console.log(response.data);
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
            screenshots: response.screenshots?.map((screenshot: any) => screenshot.url),
            company: response.company?.name,
        };
    }
}
