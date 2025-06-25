<script setup lang="ts">
	import { ref, onMounted } from 'vue';
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

	const sectionRef = ref<HTMLElement | null>(null);
	const arrowRef = ref<HTMLElement | null>(null);
	const titleRef = ref<HTMLElement | null>(null);
	const descRef = ref<HTMLElement | null>(null);

	onMounted(() => {
		// register the plugin
		gsap.registerPlugin(gsap.ScrollTrigger);

		const triggerOpts = {
			trigger: sectionRef.value,
			start: 'top 80%',
			toggleActions: 'play none none none',
		};

		// build one timeline tied to scroll
		const tl = gsap.timeline({
			scrollTrigger: triggerOpts,
		});

		// 1) title fades/slides in over 1s
		tl.from(arrowRef.value, {
			y: 50,
			opacity: 0,
			duration: 0.6,
			ease: 'power4.out',
		});

		// 2) link only starts after the above finishes
		tl.from(
			titleRef.value,
			{
				y: 30,
				opacity: 0,
				duration: 0.8,
				delay: 0.3,
				ease: 'power4.out',
			},
			'<'
		);

		tl.from(
			descRef.value,
			{
				y: 30,
				opacity: 0,
				duration: 0.8,
				delay: 0.3,
				ease: 'power4.out',
			},
			'<'
		);
	});
</script>

<template>
	<Bounded as="div">
		<section
			class="section"
			ref="sectionRef"
			:data-slice-type="slice.slice_type"
			:data-slice-variation="slice.variation">
			<div
				class="arrow-wrap"
				ref="arrowRef">
				<ArrowRight />
			</div>
			<h1
				class="h1 title"
				ref="titleRef">
				{{ slice.primary.title }}
			</h1>
			<div
				class="description_wrap p1--grey"
				ref="descRef">
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
		padding-top: $default-gap;
		min-height: 100svh;
		background-color: $color-white;
		@include default-grid;

		@include media('<phone') {
			border: none;
			min-height: 100%;
			padding: 0;
			padding-bottom: calc($default-gap * 2);
		}
	}

	.dark-mode section {
		background-color: $color-dark;
		color: $color-white;
	}

	.arrow-wrap {
		height: 60px;
		// width: 70px;
		grid-column: 1 / 2;
	}

	.title {
		grid-column: 5 / 12;
		grid-row-start: 1;
	}

	.description_wrap {
		margin-top: calc($default-gap * 2);
		grid-column: 7 / 12;
		grid-row-start: 2;

		@include media('<phone') {
			margin-top: calc($default-gap * 2);
		}
	}

	.link {
		margin: calc($default-gap * 2) 0;
		grid-column: 7 /10;
		grid-row-start: 3;
		position: relative;
		overflow: hidden;
		cursor: pointer;

		@include media('<phone') {
			margin-top: calc($default-gap * 2);
			grid-column: 1 / 11;
		}
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

	.dark-mode .link::after {
		background: $color-white;
	}
</style>
