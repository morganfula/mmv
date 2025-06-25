// composables/useVideoEmbedUrl.ts
import { computed } from 'vue'

export function useVideoEmbedUrl(videoUrl?: string) {
  // pull a numeric ID out of Vimeo URLs like “vimeo.com/12345678”
  const getVimeoId = (url: string): string | null => {
    const m = url.match(/vimeo\.com\/(\d+)/)
    return m ? m[1] : null
  }

  // pull a video ID out of YouTube URLs:
  // - youtube.com/watch?v=ID
  // - youtu.be/ID
  // - youtube.com/embed/ID
  const getYouTubeId = (url: string): string | null => {
    // try watch?v= or youtu.be/
    let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&#?/]+)/)
    if (m) return m[1]
    // try embed/
    m = url.match(/youtube\.com\/embed\/([^&#?/]+)/)
    return m ? m[1] : null
  }

  // computed IDs
  const vimeoId = computed(() => (videoUrl ? getVimeoId(videoUrl) : null))
  const youTubeId = computed(() => (videoUrl ? getYouTubeId(videoUrl) : null))

  // whichever one matched first
  const videoId = computed(() => vimeoId.value || youTubeId.value)

  // build the correct embed URL
  const embedUrl = computed(() => {
    if (vimeoId.value) {
      return `https://player.vimeo.com/video/${vimeoId.value}` +
             `?background=1&autoplay=1&muted=1&loop=1&byline=0&title=0`
    }
    if (youTubeId.value) {
      // note: YouTube loops only if you also pass &playlist=ID
      return `https://www.youtube.com/embed/${youTubeId.value}` +
             `?autoplay=1&mute=1&loop=1&playlist=${youTubeId.value}` +
             `&controls=0&modestbranding=1`
    }
    return null
  })

  return { videoId, embedUrl }
}
