<script setup lang="ts">
	import { onMounted } from 'vue';
	import type { Content } from '@prismicio/client';

	const pad2 = (n: number) => n.toString().padStart(2, '0');

	onMounted(() => {
		const stickySections = Array.from(
			document.querySelectorAll<HTMLElement>('.sticky')
		);

		const animate = () => {
			stickySections.forEach((el, idx) => {
				const { top } = el.parentElement!.getBoundingClientRect();
				let transTop = top > 0 ? 0 : -top;
				if (transTop > 1000) transTop = 1000;

				// Don’t animate the final section after it scrolls past
				if (top <= 0 && idx !== stickySections.length - 1) {
					el.style.filter = `blur(${transTop * 0.005}px)`;
					const scale = 1 - transTop * 0.0001;
					el.style.transform = `scale3d(${scale},${scale},1)`;
					el.style.opacity = `${1 - transTop * 0.001}`;
				}
			});

			requestAnimationFrame(animate);
		};

		animate();
	});

	defineProps(
		getSliceComponentProps<Content.PortfolioBlockSlice>([
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
			class="portfolio-wrapper"
			:data-slice-type="slice.slice_type"
			:data-slice-variation="slice.variation">
			<section
				class="portfolio"
				v-for="(item, i) in slice.primary.items"
				:key="i">
				<div class="sticky">
					<div class="wrapper">
						<div class="card">
							<div class="top">
								<div class="title">
									{{ item.title }}
								</div>
								<div class="number">{{ pad2(i + 1) }}</div>
							</div>

							<div class="content">
								<div class="description">
									<PrismicRichText :field="item.description" />
								</div>

								<VimeoBackground
									class="video"
									:video-url="item.video.url" />

								<PrismicLink
									class="link"
									:field="item.link" />
							</div>
						</div>
					</div>
				</div>
			</section>
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	.portfolio-wrapper {
		counter-reset: i; /* base counter for custom property */
		background-color: $color-white;
	}

	.portfolio {
		position: relative;
		height: 100vh; /* twice the viewport -> room to scroll past */
		width: 100%;

		/* pull each subsequent section upward by exactly one viewport height */
		&:nth-child(n + 2) {
			top: calc(-100vh * (var(--i, 1)));
		}
		counter-increment: i;
		--i: counter(i); /* expose counter as CSS var for the calc */

		@include media('<phone') {
			padding: calc($default-gap * 2) 0;
		}
	}
	.sticky {
		position: sticky;
		width: 100%;
		height: 100svh;
		top: 0;
		/* padding: 2rem; */
		will-change: filter, transform;
	}

	.wrapper {
		width: 100%;
		height: 100%;
	}

	.card {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 60px;

		@include media('<phone') {
			gap: 16px;
		}
	}

	.top {
		display: flex;
		justify-content: space-between;
		text-transform: uppercase;
		// margin-bottom: 80px;
		font-size: 5vw;
		line-height: 1;
		font-variation-settings: 'wght' 480;
	}

	.content {
		display: grid;
		// flex-direction: column;
		grid-template-columns: repeat(12, 1fr);
		gap: calc($default-gap / 2);

		@include media('<phone') {
			grid-template-columns: repeat(6, 1fr);
			gap: 16px;
		}
	}

	.description {
		font-size: 1.2vw;
		line-height: 1.2;
		grid-column: 1 /5;

		@include media('<phone') {
			grid-row-start: 3;
			font-size: 4.3vw;
			grid-column: 1 /7;
		}
	}

	.video {
		aspect-ratio: 16/9;
		overflow: hidden;
		grid-column: 5 /13;
		max-height: 600px;
		position: relative;

		@include media('<phone') {
			grid-row-start: 1;
			grid-column: 1 /7;
		}
	}

	.title {
		@include media('<phone') {
			font-size: 7vw;
		}
	}

	.video iframe {
		position: absolute;
		inset: 0;
	}

	.link {
		grid-column: 1 / span 3;
		font-size: 24px;
		display: flex;
		flex-direction: column;

		@include media('<phone') {
			display: none;
		}
	}
</style>
