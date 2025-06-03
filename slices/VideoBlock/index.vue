<script setup lang="ts">
	import type { Content } from '@prismicio/client';

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.VideoBlockSlice>([
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
		<div class="video-wrap">
			<VimeoBackground :video-url="slice.primary.video.url" />
		</div>
	</section>
</template>

<style lang="scss" scoped>
	.video-wrap {
		height: 100svh;
		width: 100%;

		@include media('<phone') {
			height: 40svh;
			width: 100%;
			padding-bottom: 24px;
		}
	}
</style>
