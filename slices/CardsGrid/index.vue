<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import type { Content } from '@prismicio/client';

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.CardsGridSlice>([
			'slice',
			'index',
			'slices',
			'context',
		])
	);

	const sectionRef = ref<HTMLElement | null>(null);
	const titleRef = ref<HTMLElement | null>(null);
	const cardsRef = ref<HTMLElement | null>(null);

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
		tl.from(titleRef.value, {
			y: 30,
			opacity: 0,
			duration: 1.6,
			ease: 'power4.out',
		});

		// 2) link only starts after the above finishes
		tl.from(
			cardsRef.value,
			{
				y: 30,
				opacity: 0,
				duration: 1.6,
				delay: 0.3,
				ease: 'power4.out',
				stagger: 0.1,
			},
			'<'
		);
	});
</script>

<template>
	<Bounded as="div">
		<section
			ref="sectionRef"
			:data-slice-type="slice.slice_type"
			:data-slice-variation="slice.variation">
			<div
				v-if="slice.primary.title"
				class="titles"
				ref="titleRef">
				<h3 class="h1 big-title">
					{{ slice.primary.title }}
				</h3>
				<h4 class="p1--black subtitle">{{ slice.primary.subtitle }}</h4>
			</div>

			<div
				class="cards"
				ref="cardsRef"
				:class="{ news: slice.variation === 'news' }">
				<ProjectCard
					v-if="slice.variation === 'default'"
					class="card"
					v-for="(item, i) in slice.primary.item"
					:key="i"
					:project="item" />

				<NewCard
					v-if="slice.variation === 'news'"
					class="card"
					v-for="(item, i) in slice.primary.item"
					:key="i"
					:new="item" />
			</div>

			<div class="link-wrap">
				<PrismicLink
					class="link"
					:field="slice.primary.link" />
			</div>
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	section {
		padding: $default-gap 0;
		background-color: $color-white;
	}

	.dark-mode section {
		background-color: $color-dark;
		color: $color-white;
	}

	.titles {
		display: flex;
		justify-content: space-between;
		align-items: end;

		margin-bottom: calc($default-gap * 2);
	}

	.subtitle {
		max-width: 400px;
		text-align: right;

		@include media('<phone') {
			display: none;
		}
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: min-content;
		gap: calc($default-gap / 2);
		padding-bottom: calc($default-gap * 2);

		@include media('<phone') {
			grid-template-columns: 1fr;
			gap: calc($default-gap * 2);
		}
	}

	.cards.news {
		grid-template-columns: repeat(3, 1fr);

		@include media('<phone') {
			grid-template-columns: 1fr;
			gap: calc($default-gap * 2);
		}
	}
</style>
