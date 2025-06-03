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

	const cardsWrap = ref<HTMLElement | null>(null);

	const items = computed(() => {
		const arr = page.value?.data.items ?? [];
		return [...arr, ...arr]; // duplicate array
	});
</script>

<template>
	<Bounded as="div">
		<section
			:data-slice-type="slice.slice_type"
			:data-slice-variation="slice.variation">
			<h2 class="big-title">{{ page?.data.title }}</h2>

			<div class="marquee">
				<!-- First pass -->
				<div class="cards marquee__content">
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
	.big-title {
		margin-bottom: $default-gap;
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
		margin-bottom: $default-gap;

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
		height: 105px;

		@include media('<phone') {
			height: 120px;
		}
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
		font-size: 1.1vw;
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
