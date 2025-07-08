// composables/useVideoEmbedUrl.ts
import { computed, type Ref } from 'vue'

export function useVideoEmbedUrl(
  videoUrl: string,
  showControls: boolean | Ref<boolean> = true
) {
  const getVimeoId = (url: string) => {
    const m = url.match(/vimeo\.com\/(\d+)/)
    return m ? m[1] : null
  }
  const getYouTubeId = (url: string) => {
    let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&#?/]+)/)
    if (m) return m[1]
    m = url.match(/youtube\.com\/embed\/([^&#?/]+)/)
    return m ? m[1] : null
  }

  const vimeoId    = computed(() => getVimeoId(videoUrl))
  const youTubeId  = computed(() => getYouTubeId(videoUrl))
  const ctrl       = typeof showControls === 'boolean' ? showControls : showControls.value

  const embedUrl = computed(() => {
    if (vimeoId.value) {
      // Vimeo
      const params = new URLSearchParams({
        autoplay: '1',
        muted:    '1',      // muet au load
        controls: ctrl ? '1' : '0', // affiche ou non
        loop:     '1',
      })
      return `https://player.vimeo.com/video/${vimeoId.value}?${params}`
    }
    if (youTubeId.value) {
      // YouTube
      const params = new URLSearchParams({
        autoplay: '1',
        mute:     '1',      // muet au load
        controls: ctrl ? '1' : '0',
        loop:     '1',
        playlist: youTubeId.value, 
        modestbranding: '1',
      })
      return `https://www.youtube.com/embed/${youTubeId.value}?${params}`
    }
    return null
  })

  return { embedUrl }
}
