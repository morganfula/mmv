<script setup lang="ts">
	import type { Content } from '@prismicio/client';

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.ProjectTextSlice>([
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
			<div class="description p1--grey">
				<PrismicRichText :field="slice.primary.description" />
			</div>
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

	.description {
		grid-column: 6/12;
	}
</style>
