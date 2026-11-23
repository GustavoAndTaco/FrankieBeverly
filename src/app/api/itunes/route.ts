import { cacheLife } from "next/cache";
import { ALBUMS, type AlbumItem } from "@/data/albums";

export interface AlbumMediaResult {
  albumId: string;
  artworkUrl: string | null;
  previewUrl: string | null;
  trackViewUrl: string | null;
  matchedTrackName: string;
  matchedCollectionName: string;
}

interface ItunesSearchTrack {
  artistName?: string;
  trackName?: string;
  collectionName?: string;
  previewUrl?: string;
  artworkUrl100?: string;
  trackViewUrl?: string;
}

interface ItunesSearchResponse {
  results?: ItunesSearchTrack[];
}

function upgradeArtworkUrl(url?: string): string | null {
  if (!url) return null;
  return url.replace(/\/100x100bb\.(jpg|png)$/i, "/600x600bb.$1");
}

function scoreTrackMatch(item: ItunesSearchTrack, album: AlbumItem): number {
  const artist = (item.artistName ?? "").toLowerCase();
  const track = (item.trackName ?? "").toLowerCase();
  const collection = (item.collectionName ?? "").toLowerCase();
  const targetTrack = album.featuredTrack.toLowerCase().replace(/['"]/g, "");
  const targetAlbum = album.title.toLowerCase();

  let score = 0;
  if (artist.includes("maze") || artist.includes("frankie beverly")) {
    score += 40;
  } else {
    return -100;
  }
  if (item.previewUrl) score += 25;
  if (item.artworkUrl100) score += 10;

  const cleanTrack = track.replace(/['"]/g, "");
  if (cleanTrack === targetTrack) score += 30;
  else if (cleanTrack.includes(targetTrack)) score += 18;

  if (collection.includes(targetAlbum)) score += 20;
  if (album.isSpecialLive && collection.includes("live in new orleans")) {
    score += 15;
  }
  return score;
}

async function lookupSingleAlbum(album: AlbumItem): Promise<AlbumMediaResult> {
  const fallback: AlbumMediaResult = {
    albumId: album.id,
    artworkUrl: null,
    previewUrl: null,
    trackViewUrl: null,
    matchedTrackName: album.featuredTrack,
    matchedCollectionName: album.title,
  };

  try {
    const query = encodeURIComponent(album.itunesQuery);
    const url = `https://itunes.apple.com/search?term=${query}&entity=song&limit=10&country=US`;
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(6000),
    });

    if (!response.ok) {
      return fallback;
    }

    const data = (await response.json()) as ItunesSearchResponse;
    const results = data.results ?? [];
    if (results.length === 0) {
      return fallback;
    }

    const ranked = results
      .map((item) => ({ item, score: scoreTrackMatch(item, album) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);

    const best = ranked[0]?.item ?? results[0];

    return {
      albumId: album.id,
      artworkUrl: upgradeArtworkUrl(best.artworkUrl100),
      previewUrl: best.previewUrl ?? null,
      trackViewUrl: best.trackViewUrl ?? null,
      matchedTrackName: best.trackName ?? album.featuredTrack,
      matchedCollectionName: best.collectionName ?? album.title,
    };
  } catch {
    return fallback;
  }
}

async function fetchAlbumMediaMap(): Promise<Record<string, AlbumMediaResult>> {
  "use cache";
  cacheLife("hours");

  const settled = await Promise.allSettled(
    ALBUMS.map((album) => lookupSingleAlbum(album)),
  );

  const items: Record<string, AlbumMediaResult> = {};
  ALBUMS.forEach((album, idx) => {
    const result = settled[idx];
    if (result.status === "fulfilled") {
      items[album.id] = result.value;
    } else {
      items[album.id] = {
        albumId: album.id,
        artworkUrl: null,
        previewUrl: null,
        trackViewUrl: null,
        matchedTrackName: album.featuredTrack,
        matchedCollectionName: album.title,
      };
    }
  });

  return items;
}

/** Cached iTunes Search proxy returning 30s preview URLs and 600px covers for all 9 albums. */
export async function GET() {
  const items = await fetchAlbumMediaMap();
  return Response.json({ items });
}
