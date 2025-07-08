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
		<div class="title-wrap">
			<h1 class="title h1 default-title">
				{{ slice.primary.title }}
			</h1>
		</div>
		<div class="video-wrap">
			<VimeoBackground
				class="video"
				:video-url="slice.primary.video.url"
				:controls="false"
				:zoomed="true" />
		</div>
	</section>
</template>

<style lang="scss" scoped>
	section {
		height: 100svh;
		width: 100%;
		min-height: 100svh;
		position: relative;
		background: $color-black;

		@include media('<phone') {
			height: 80svh;
			// min-height: 100svh;
			// aspect-ratio: 7/5;
			background: $color-white;
		}
	}

	.dark-mode section {
		background-color: $color-dark;
		color: $color-white;
	}

	.dark-mode .title-wrap {
		color: $color-white;
	}

	.title-wrap {
		overflow: hidden;
		position: absolute;
		font-size: 3.2vw;
		z-index: 1;
		color: $color-white;
		bottom: $default-gap;
		left: $default-gap;

		@include media('<phone') {
			color: $color-black;
			top: 25%;
			display: block;

			font-size: 9.4vw;
			line-height: 1.1;
			max-width: 85%;
			height: 25%;
		}
	}
	.title {
		width: 100%;
	}

	.video-wrap {
		height: 100%;
		width: 100%;

		@include media('<phone') {
			position: absolute;
			bottom: 20%;
			height: 245px;
			width: 100%;
			aspect-ratio: 16/9;
		}
	}
</style>
