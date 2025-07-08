<template>
	<div
		class="video-background"
		:class="{ 'controls-active': showControls }"
		v-if="embedUrl">
		<iframe
			:src="embedUrl"
			frameborder="0"
			allow="autoplay; fullscreen; picture-in-picture"
			allowfullscreen></iframe>
	</div>
</template>

<script setup lang="ts">
	import { toRef, computed } from 'vue';
	import { useVideoEmbedUrl } from '@/composables/useVideoEmbedUrl';

	const props = defineProps({
		videoUrl: { type: String, required: true },
		controls: { type: Boolean, default: false },

		context: {
			type: Object as PropType<{ slice_type?: string }>,
			default: () => ({}),
		},
	});

	// Si on est dans le slice HomeHero, on désactive toujours les contrôles
	const showControls = computed(() => {
		return props.context.slice_type === 'home_hero' ? false : props.controls;
	});

	const { embedUrl } = useVideoEmbedUrl(props.videoUrl, showControls);
</script>

<style lang="scss" scoped>
	//

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
			pointer-events: none; /* blocage par défaut */
		}

		/* quand on a la classe controls-active SUR LE CONTENEUR, on autorise l’interaction */
		&.controls-active iframe {
			pointer-events: auto;
		}
	}
</style>
