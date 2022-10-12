export interface Game {
  // Small game object fields
  id: number;
  slug: string;
  name: string;
  coverUrl: string; // URL to the cover image
  // Full game object fields
  summary?: string;
  genres?: string[]; // Names
  screenshots?: string[]; // URLs of the game screenshots
  company?: string; // Company name
}
