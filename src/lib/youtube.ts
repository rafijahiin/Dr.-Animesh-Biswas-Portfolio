import { XMLParser } from 'fast-xml-parser';

export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  published: string;
  isPinned?: boolean;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

function extractVideoIdFromUrl(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

/**
 * Fetch latest videos from a YouTube channel via its public RSS feed.
 * No API key required. Runs at build time.
 *
 * If channelId is empty (not yet configured), returns an empty list — the section
 * gracefully shows an empty state.
 */
export async function fetchLatestVideos(
  channelId: string,
  limit = 6,
  pinnedUrl?: string,
): Promise<YouTubeVideo[]> {
  let videos: YouTubeVideo[] = [];

  if (channelId) {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    try {
      const res = await fetch(feedUrl);
      if (res.ok) {
        const xml = await res.text();
        const parsed = parser.parse(xml);
        const entries = parsed?.feed?.entry ?? [];
        const list = Array.isArray(entries) ? entries : [entries];
        videos = list.slice(0, limit).map((e: any) => {
          const id: string = e['yt:videoId'] ?? '';
          return {
            id,
            title: e.title ?? '',
            url: `https://www.youtube.com/watch?v=${id}`,
            thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            published: e.published ?? '',
          };
        });
      }
    } catch (err) {
      console.warn('[youtube] feed fetch failed:', err);
    }
  }

  // Pin handling: if a pinned URL is set, move that video to the front
  // (or prepend it if it isn't already in the feed)
  if (pinnedUrl) {
    const pinnedId = extractVideoIdFromUrl(pinnedUrl);
    if (pinnedId) {
      const existingIdx = videos.findIndex((v) => v.id === pinnedId);
      if (existingIdx >= 0) {
        const [pinned] = videos.splice(existingIdx, 1);
        pinned.isPinned = true;
        videos.unshift(pinned);
      } else {
        videos.unshift({
          id: pinnedId,
          title: 'Featured',
          url: pinnedUrl,
          thumbnail: `https://i.ytimg.com/vi/${pinnedId}/hqdefault.jpg`,
          published: '',
          isPinned: true,
        });
        videos = videos.slice(0, limit);
      }
    }
  }

  return videos;
}
