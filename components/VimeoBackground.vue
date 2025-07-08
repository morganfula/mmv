<template>
	<div
		class="video-background"
		:class="{ 'controls-active': controls }"
		v-if="embedUrl">
		<iframe
			:src="embedUrl"
			:class="{ zoomed: zoomed }"
			frameborder="0"
			allow="autoplay; fullscreen; picture-in-picture"
			allowfullscreen></iframe>
	</div>
</template>

<script setup lang="ts">
	import { toRef } from 'vue';
	import { useVideoEmbedUrl } from '@/composables/useVideoEmbedUrl';

	const props = defineProps({
		videoUrl: { type: String, required: true },
		controls: { type: Boolean, default: false },
		zoomed: { type: Boolean, default: false },
	});

	const showControls = toRef(props, 'controls');
	const { embedUrl } = useVideoEmbedUrl(props.videoUrl, showControls);
</script>

<style scoped lang="scss">
	.video-background {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;

		iframe {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			pointer-events: none; /* bloquer par défaut */
		}
		&.controls-active iframe {
			pointer-events: auto; /* autoriser l’interaction si controls=true */
		}
	}

	.zoomed {
		@include test;
		transform: scale(1.5);
	}
</style>
