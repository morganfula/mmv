<script setup lang="ts">
	import type { Content } from '@prismicio/client';
	import Bounded from '~/components/Bounded.vue';

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.QuoteBlockSlice>([
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
			<div class="title">
				{{ slice.primary.title }}
			</div>
			<PrismicLink
				class="link"
				:field="slice.primary.link" />
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	section {
		padding: $default-gap 0;
		min-height: 100svh;

		display: grid;
		grid-template-columns: repeat(12, 1fr);
	}

	.title {
		grid-column: 2 /12;
		font-size: 8vw;
		line-height: 1;
		text-transform: uppercase;
		font-variation-settings: 'wght' 480;
		align-self: end;
	}

	.link {
		align-self: start;
		margin-top: $default-gap;
		grid-column: 2 /12;
		grid-row-start: 2;
	}
</style>
