<script setup lang="ts">
	import type { Content } from '@prismicio/client';

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.NewTextSlice>([
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
		<div class="p1--grey text">
			<PrismicRichText :field="slice.primary.text" />
		</div>
	</section>
</template>

<style lang="scss" scoped>
	.text {
		margin-bottom: $default-gap;
	}
</style>
