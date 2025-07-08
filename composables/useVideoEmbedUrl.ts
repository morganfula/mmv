import { computed, type Ref } from 'vue'

export function useVideoEmbedUrl(
  videoUrl: string,
  controls: boolean | Ref<boolean> = false
) {
  // Extraire ID Vimeo
  const getVimeoId = (url: string): string | null => {
    const m = url.match(/vimeo\.com\/(\d+)/)
    return m ? m[1] : null
  }
  // Extraire ID YouTube
  const getYouTubeId = (url: string): string | null => {
    let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&#?/]+)/)
    if (m) return m[1]
    m = url.match(/youtube\.com\/embed\/([^&#?/]+)/)
    return m ? m[1] : null
  }

  const vimeoId   = computed(() => getVimeoId(videoUrl))
  const youTubeId = computed(() => getYouTubeId(videoUrl))
  const ctrl      = typeof controls === 'boolean' ? controls : controls.value

  const embedUrl = computed<string | null>(() => {
    // Vimeo
    if (vimeoId.value) {
      const params = new URLSearchParams({
        autoplay: '1',
        muted:    '1',
        loop:     '1'
      })
      if (ctrl) {
        // Affiche les contrôles Vimeo natifs
        params.set('controls', '1')
      } else {
        // En background mode, supprime toute UI
        params.set('background', '1')
        params.set('byline', '0')
        params.set('title', '0')
        params.set('portrait', '0')
      }
      return `https://player.vimeo.com/video/${vimeoId.value}?${params}`
    }
    // YouTube
    if (youTubeId.value) {
      const params = new URLSearchParams({
        autoplay:       '1',
        mute:           '1',            // toujours muted
        loop:           '1',            // boucle
        playlist:       youTubeId.value,
        modestbranding: '1',
        rel:            '0'
      })
      params.set('controls', ctrl ? '1' : '0')
      return `https://www.youtube.com/embed/${youTubeId.value}?${params}`
    }
    return null
  })

  return { embedUrl }
}
