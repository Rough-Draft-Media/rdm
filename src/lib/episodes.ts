import { parse as parseFeed } from 'rss-to-json'
import { array, number, object, parse, string } from 'valibot'

export interface Episode {
  id: string
  title: string
  published: Date
  summary: string
  description: string
  audio: {
    src: string
    type: string
  }
}

export async function getAllEpisodes() {
  let FeedSchema = object({
    items: array(
      object({
        title: string(),
        published: number(),
        description: string(),
        enclosures: array(
          object({
            url: string(),
            type: string(),
          }),
        ),
      }),
    ),
  })

  let podcastFeed = 'https://anchor.fm/s/e1550c44/podcast/rss'
  let feed = (await parseFeed(podcastFeed)) as unknown
  let items = parse(FeedSchema, feed).items

  let episodes: Array<Episode> = items.map(
    ({ title, description, enclosures, published }) => ({
      id: `ep` + `${title}`.match('([0-9]+)')?.[0] as string,
      title: `${title}`,
      published: new Date(published),
      summary: `${description}`.match('(?<=<p>)(.*?)(?=</p>)')?.[0] as string,
      description: `${description}`.split('---')[0],
      audio: enclosures.map((enclosure) => ({
        src: enclosure.url,
        type: enclosure.type,
      }))[0],
    }),
  )

  return episodes
}
