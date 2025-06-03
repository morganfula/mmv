<script setup lang="ts">
	import type { Content } from '@prismicio/client';

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.HomeHeroSlice>([
			'slice',
			'index',
			'slices',
			'context',
		])
	);
</script>

<template>
	<section
		:data-slice-type="slice.slice_type"
		:data-slice-variation="slice.variation">
		<VimeoBackground :video-url="slice.primary.video.url" />
		<h1 class="title h1">
			{{ slice.primary.title }}
		</h1>
	</section>
</template>

<style lang="scss" scoped>
	section {
		height: 100svh;
		width: 100%;
		min-height: 100svh;
		position: relative;
		background: $color-black;
	}
	.title {
		font-size: 3.2vw;
		position: absolute;
		z-index: 1;
		color: $color-white;
		bottom: $default-gap;
		left: $default-gap;
	}
</style>
