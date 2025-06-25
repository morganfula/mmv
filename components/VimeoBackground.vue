<template>
	<div
		class="video-background"
		v-if="embedUrl">
		<iframe
			:src="embedUrl"
			frameborder="0"
			allow="autoplay; fullscreen; picture-in-picture"
			allowfullscreen></iframe>
	</div>
</template>

<script setup>
	const props = defineProps({ videoUrl: { type: String, required: true } });

	const { embedUrl } = useVideoEmbedUrl(props.videoUrl);
</script>

<style lang="scss" scoped>
	.video-background {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;

		@include media('<phone') {
			// aspect-ratio: 7/5;
		}
	}
	.video-background iframe {
		position: absolute;
		inset: 0;

		height: 100%;
		width: 100%;
		transform: scale(1.5);
		/* transform: translate(-50%, -50%); */
		pointer-events: none;

		@include media('<phone') {
		}
	}
</style>
