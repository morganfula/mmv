<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import type { Content } from '@prismicio/client';

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.HeaderBlockSlice>([
			'slice',
			'index',
			'slices',
			'context',
		])
	);

	const sectionRef = ref<HTMLElement | null>(null);
	const titleRef = ref<HTMLElement | null>(null);
	const subtitleRef = ref<HTMLElement | null>(null);

	onMounted(() => {
		gsap.registerPlugin(gsap.ScrollTrigger);

		// Animation en scroll pour le titre :
		ScrollTrigger.create({
			trigger: sectionRef.value,
			start: 'top 80%',
			animation: animateTitleChars(titleRef.value!),
		});

		// Animation du sous-titre (inchangé) :
		gsap
			.timeline({
				scrollTrigger: {
					trigger: sectionRef.value,
					start: 'top 80%',
					toggleActions: 'play none none none',
				},
			})
			.from(subtitleRef.value, {
				y: 30,
				opacity: 0,
				duration: 1.6,
				delay: 1.6,
				ease: 'power4.out',
				stagger: 0.1,
			});
	});
</script>

<template>
	<Bounded as="header">
		<section
			:data-slice-type="slice.slice_type"
			:data-slice-variation="slice.variation"
			ref="sectionRef">
			<div class="title__wrap">
				<h1
					class="title title__block"
					ref="titleRef">
					{{ slice.primary.title }}
				</h1>
			</div>

			<h2
				class="subtitle p1--grey"
				ref="subtitleRef">
				{{ slice.primary.subtitle }}
			</h2>
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	section {
		min-height: 50svh;
		padding: $default-gap 0;
		padding-top: calc($default-gap * 3);
		background-color: $color-white;

		@include media('<phone') {
			min-height: 100%;

			padding-bottom: calc($default-gap * 2);
		}
	}

	.dark-mode section {
		background-color: $color-dark;
		color: $color-white;
	}

	.title__wrap {
		// @include test;
		line-height: 1;
		overflow: hidden;
	}

	.title {
		// margin-top: calc($default-gap * 3);
		font-size: 9vw;
		font-variation-settings: 'wght' 440;
		text-transform: uppercase;

		@include media('<phone') {
			margin-top: calc($default-gap * 8);
			font-size: 10vw;
		}
	}

	.subtitle {
		margin-top: $default-gap;
		font-variation-settings: 'wght' 350;
	}
</style>
