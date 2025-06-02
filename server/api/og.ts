export default defineEventHandler(async (event) => {
  const { url } = getQuery(event)
  if (!url) throw createError({ statusCode: 400, message: 'Missing ?url=' })

  /** 1️⃣  Turn any share link into the public “embed” page */
  const embedUrl = toEmbed(url as string)

  try {
    /** 2️⃣  Fetch raw HTML (embed pages are public, no login) */
    const html = await $fetch<string>(embedUrl, {
      responseType: 'text',
      headers: { 'User-Agent': 'Mozilla/5.0' }   // some CDNs block default UA
    })

    /** 3️⃣  Micro-parser: grab <meta property="…"> content with RegEx */
    const pick = (prop: string) => {
      const rx = new RegExp(
        `<meta[^>]+property=["']${prop}["'][^>]*content=["']([^"']+)["'][^>]*>`,
        'i'
      )
      return html.match(rx)?.[1]
    }

    return {
      url,                                     // original post link
      title: pick('og:title')  ?? 'LinkedIn post',
      image: pick('og:image')  ?? '/fallback.jpg',
      date:  pick('og:published_time') ?? null
    }
  } catch {
    return { url, title: 'LinkedIn post', image: '/fallback.jpg', date: null }
  }
})

/** Helper: share URL → canonical embed URL */
function toEmbed(link: string): string {
  const id = link.match(/(?:activity|share)[-:](\d{19})/)?.[1]
  return id
    ? `https://www.linkedin.com/embed/feed/update/urn:li:activity:${id}`
    : link         // fallback: return original if pattern fails
}
