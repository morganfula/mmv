<script setup lang="ts">
	import type { Content } from '@prismicio/client';

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.HeaderBlockSlice>([
			'slice',
			'index',
			'slices',
			'context',
		])
	);
</script>

<template>
	<Bounded as="header">
		<section
			:data-slice-type="slice.slice_type"
			:data-slice-variation="slice.variation">
			<h1 class="title">
				{{ slice.primary.title }}
			</h1>

			<h2 class="subtitle p1--grey">
				{{ slice.primary.subtitle }}
			</h2>
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	section {
		min-height: 50svh;
		padding: $default-gap 0;
		background-color: $color-white;

		@include media('<phone') {
			min-height: 100%;

			padding-bottom: calc($default-gap * 2);
		}
	}

	.dark-mode section {
		background-color: $color-dark;
		color: $color-white;
	}

	.title {
		margin-top: calc($default-gap * 3);
		font-size: 9vw;
		font-variation-settings: 'wght' 440;
		text-transform: uppercase;
		line-height: 1;

		@include media('<phone') {
			margin-top: calc($default-gap * 8);
			font-size: 10vw;
		}
	}

	.subtitle {
		margin-top: $default-gap;
		font-variation-settings: 'wght' 350;
	}
</style>
