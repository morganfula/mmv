<script setup lang="ts">
	import type { Content } from '@prismicio/client';

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.ContactBlockSlice>([
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
			<a
				class="text"
				:href="'mailto:' + slice.primary.link.url">
				<div>
					{{ slice.primary.link.text }}
				</div>
				<div class="mail">
					{{ slice.primary.link.url }}
				</div>
			</a>
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	section {
		padding: calc($default-gap * 2) 0;
		background-color: $color-white;
	}
	.text {
		display: flex;
		justify-content: space-between;
		font-size: 3vw;
		font-variation-settings: 'wght' 480;
	}

	.mail {
		position: relative;
	}

	.mail::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		background: $color-black;
		height: 2px;
		width: 100%;
	}
</style>
