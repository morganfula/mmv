<template>
	<Bounded as="div">
		<section
			ref="sectionRef"
			:data-slice-type="slice.slice_type"
			:data-slice-variation="slice.variation">
			<div
				class="title"
				ref="titleRef">
				{{ slice.primary.title }}
			</div>
			<PrismicLink
				class="link"
				:field="slice.primary.link"
				ref="linkRef" />
		</section>
	</Bounded>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { getSliceComponentProps, PrismicLink } from '@prismicio/vue';
	import type { Content } from '@prismicio/client';

	// get your slice props
	defineProps(
		getSliceComponentProps<Content.QuoteBlockSlice>([
			'slice',
			'index',
			'slices',
			'context',
		])
	);

	// element refs
	const sectionRef = ref<HTMLElement | null>(null);
	const titleRef = ref<HTMLElement | null>(null);
	const linkRef = ref<HTMLElement | null>(null);

	onMounted(() => {
		// register the plugin
		gsap.registerPlugin(gsap.ScrollTrigger);

		const triggerOpts = {
			trigger: sectionRef.value,
			start: 'top 50%',
			toggleActions: 'play none none none',
		};

		// build one timeline tied to scroll
		const tl = gsap.timeline({
			scrollTrigger: triggerOpts,
		});

		// 1) title fades/slides in over 1s
		tl.from(titleRef.value, {
			y: 50,
			opacity: 0,
			duration: 1,
			ease: 'power4.out',
		});

		// 2) link only starts after the above finishes
		tl.from(
			linkRef.value,
			{
				y: 30,
				opacity: 0,
				duration: 0.8,
				ease: 'power4.out',
			},
			'>'
		);
	});
</script>

<style lang="scss" scoped>
	section {
		padding: $default-gap 0;
		min-height: 100svh;
		background-color: $color-white;
		display: grid;
		grid-template-columns: repeat(12, 1fr);

		@include media('<phone') {
			display: block;
			padding: calc($default-gap * 5) 0;
		}
	}

	.dark-mode section {
		background-color: $color-dark;
		color: $color-white;
	}

	.title {
		grid-column: 2 / 12;
		font-size: 8vw;
		line-height: 1;
		text-transform: uppercase;
		font-variation-settings: 'wght' 480;
		align-self: end;

		@include media('<phone') {
			font-size: 12vw;
			line-height: 1.2;
		}
	}

	.link {
		align-self: start;
		margin-top: $default-gap;
		grid-column: 2 / 12;
		grid-row-start: 2;
		width: max-content;

		@include media('<phone') {
			margin-top: calc($default-gap * 2);
		}
	}
</style>
