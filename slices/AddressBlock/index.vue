<script setup lang="ts">
	import type { Content } from '@prismicio/client';

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.AddressBlockSlice>([
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
			<h3 class="p1--black">{{ slice.primary.title }}</h3>
			<div class="text">
				<PrismicRichText :field="slice.primary.address" />
			</div>
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	section {
		padding: calc($default-gap * 2) 0;
		background-color: $color-white;
	}

	.text {
		margin-top: 20px;
		font-size: 1.2vw;
	}
</style>
