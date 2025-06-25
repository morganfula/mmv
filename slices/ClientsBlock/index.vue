<script setup lang="ts">
	import type { Content } from '@prismicio/client';
	import { ref, onMounted, onUnmounted } from 'vue';

	const route = useRoute();
	const prismic = usePrismic();

	const { data: page } = useAsyncData('[clients]', () =>
		prismic.client.getSingle('clients')
	);

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.ClientsBlockSlice>([
			'slice',
			'index',
			'slices',
			'context',
		])
	);

	const sectionRef = ref<HTMLElement | null>(null);
	const titleRef = ref<HTMLElement | null>(null);
	const cardsRef = ref<HTMLElement | null>(null);
	const cardRef = ref<HTMLElement | null>(null);

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
			y: 50,
			opacity: 0,
			duration: 0.6,
			ease: 'power4.out',
		});

		// 2) link only starts after the above finishes
		tl.from(
			cardsRef.value,
			{
				y: 30,
				opacity: 0,
				duration: 0.8,
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
			<h2
				class="big-title"
				ref="titleRef">
				{{ page?.data.title }}
			</h2>

			<div
				class="marquee"
				ref="cardsRef">
				<!-- First pass -->
				<div
					class="cards marquee__content"
					ref="cardRef">
					<PrismicLink
						v-for="(item, i) in page?.data.items"
						:key="i"
						class="card"
						:field="item.url">
						<div class="logo-wrap">
							<PrismicImage
								class="logo"
								:field="item.logo" />
						</div>
						<div class="name p1--black">{{ item.name }}</div>
						<div class="description-wrap">
							<div class="description">
								<PrismicRichText :field="item.description" />
							</div>
						</div>
					</PrismicLink>
				</div>

				<!-- Duplicate for infinite loop -->
				<div
					class="cards marquee__content"
					aria-hidden="true">
					<PrismicLink
						v-for="(item, i) in page?.data.items"
						:key="`second-${i}`"
						class="card"
						:field="item.url">
						<div class="logo-wrap">
							<PrismicImage
								class="logo"
								:field="item.logo" />
						</div>
						<div class="name p1--black">{{ item.name }}</div>
						<div class="description-wrap">
							<div class="description">
								<PrismicRichText :field="item.description" />
							</div>
						</div>
					</PrismicLink>
				</div>
			</div>
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	section {
		background-color: $color-white;
	}

	.dark-mode section {
		background-color: $color-dark;
		color: $color-white;
	}

	.big-title {
		padding: $default-gap 0;
		// text-transform: capitalize;
	}

	.marquee {
		position: relative;
		display: flex;
		overflow: hidden;
		user-select: none;
		mask-image: linear-gradient(
			to right,
			hsl(0 0% 0% / 0),
			hsl(0 0% 0% / 1) 10%,
			hsl(0 0% 0% / 1) 90%,
			hsl(0 0% 0% / 0)
		);
	}

	.cards {
		display: flex;
		gap: $default-gap;
		flex-shrink: 0;
		min-width: 100%;
		animation: scroll 80s linear infinite;
		margin-bottom: 48px;

		transition: animation-duration 2s ease-in-out;

		.card:hover & {
			animation-play-state: paused;
		}

		@include media('<phone') {
			margin-top: $default-gap;
		}
	}

	.marquee:hover .cards {
		animation-play-state: paused;
	}

	.card {
		height: 400px;
		width: 280px;
		display: flex;
		flex-direction: column;
		transition: $default-transition;

		@include media('<phone') {
			height: 100%;
		}
	}

	.logo {
		margin-bottom: calc($default-gap / 2);
		width: auto;
		max-width: 120px;
		height: 105px;
		object-fit: contain;

		@include media('<phone') {
			height: 120px;
		}
	}

	.dark-mode .logo {
		filter: invert(100%);
	}

	.name {
		margin-bottom: calc($default-gap / 2);

		@include media('<phone') {
			display: none;
		}
	}

	.description-wrap {
		position: relative;
		overflow: hidden;

		@include media('<phone') {
			display: none;
		}
	}

	.description {
		transform: translateY(100%);
		font-size: 1vw;
		line-height: 1.1;
		color: rgba($color-grey, 0);
		color: rgba($color-grey, 1);
		transition: $default-transition;
	}

	.card:hover .description {
		transform: translateY(0);
	}

	.card:hover .description {
		color: rgba($color-grey, 1);
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-100% - $default-gap));
		}
	}

	.marquee__content {
		// inherit from .cards
	}
</style>
