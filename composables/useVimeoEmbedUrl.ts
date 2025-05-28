// composables/useVimeoEmbedUrl.ts
export function useVimeoEmbedUrl(videoUrl?: string) {
  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const videoId = computed(() => (videoUrl ? getVimeoId(videoUrl) : null));

  const embedUrl = computed(() =>
    videoId.value
      ? `https://player.vimeo.com/video/${videoId.value}?background=1&autoplay=1&muted=1&loop=1&byline=0&title=0`
      : null
  );

  return { videoId, embedUrl };
}
