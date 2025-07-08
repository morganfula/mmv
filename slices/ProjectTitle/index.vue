<script setup lang="ts">
	import type { Content } from '@prismicio/client';

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.ProjectTitleSlice>([
			'slice',
			'index',
			'slices',
			'context',
		])
	);
</script>

<template>
	<Bounded as="div">
		<section
			:data-slice-type="slice.slice_type"
			:data-slice-variation="slice.variation">
			<h2
				class="h1 title"
				:class="{ leftAlign: slice.variation === 'leftAlign' }">
				{{ slice.primary.title }}
			</h2>
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	section {
		@include default-grid;
		padding: $default-gap 0;
		background-color: $color-white;

		@include media('<phone') {
			display: block;
		}
	}

	.dark-mode section {
		background-color: $color-dark;
		color: $color-white;
	}

	.title {
		grid-column: 6/13;
	}

	.title.leftAlign {
		padding-top: $default-gap;
		grid-column: 1/13;
	}
</style>
