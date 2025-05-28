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
			:data-slice-type="slice.slice_type"
			:data-slice-variation="slice.variation">
			{{ slice.primary.title }}
			<PrismicRichText :field="slice.primary.description" />
			<PrismicLink :field="slice.primary.link" />
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	.co
</style>
