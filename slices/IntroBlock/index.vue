<script setup lang="ts">
	import type { Content } from '@prismicio/client';

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.IntroBlockSlice>([
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
			class="section"
			:data-slice-type="slice.slice_type"
			:data-slice-variation="slice.variation">
			<h1 class="h1 title">
				{{ slice.primary.title }}
			</h1>
			<div class="description_wrap p1--grey">
				<PrismicRichText :field="slice.primary.description" />
			</div>
			<PrismicLink
				class="link"
				:field="slice.primary.link" />
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	section {
		margin-top: $default-gap;
		min-height: 100svh;

		@include default-grid;
	}

	.title {
		grid-column: 5 / 12;
		grid-row-start: 1;
	}

	.description_wrap {
		margin-top: calc($default-gap * 2);
		grid-column: 7 / 12;
		grid-row-start: 2;
	}

	.link {
		margin-top: calc($default-gap * 2);
		grid-column: 7 /10;
		grid-row-start: 3;
		position: relative;
		overflow: hidden;
		cursor: pointer;
	}

	.link::after {
		content: '';
		background: $color-black;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1px;
	}
</style>
