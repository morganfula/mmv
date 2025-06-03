<template>
	<div
		class="video-background"
		v-if="embedUrl">
		<iframe
			:src="embedUrl"
			frameborder="0"
			allow="autoplay; fullscreen; picture-in-picture"
			allowfullscreen></iframe>
		<div class="content-overlay">
			<slot />
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({ videoUrl: { type: String, required: true } });

	const { embedUrl } = useVimeoEmbedUrl(props.videoUrl);
</script>

<style scoped>
	.video-background {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}
	.video-background iframe {
		position: absolute;
		inset: 0;

		height: 100%;
		width: 100%;
		transform: scale(1.2);
		/* transform: translate(-50%, -50%); */
		pointer-events: none;
	}
	.content-overlay {
		position: relative;
		z-index: 1;
		color: white;
		text-align: center;
		padding: 2rem;
	}
</style>
