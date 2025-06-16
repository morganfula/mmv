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
				let transTop = top > 0 ? 0 : top * -1;
				if (transTop >= 1000) transTop = 1000;

				if (top <= 0 && idx !== stickySections.length - 1) {
					el.style.filter = `blur(${transTop * 0.0005}px)`;
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
	<!-- 1) On place TOUTES les <section> dans un seul conteneur pour le compteur CSS -->
	<div class="portfolio-wrapper">
		<section
			v-for="(item, i) in slice.primary.items"
			:key="i"
			:data-slice-type="slice.slice_type"
			:data-slice-variation="slice.variation">
			<div class="sticky">
				<div class="container">
					<div class="card">
						<div class="top">
							<div class="title">{{ item.title }}</div>
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
	</div>
</template>

<style lang="scss" scoped>
	/***** 1) LE CONTENEUR PARENT (reset du compteur) *****/
	.portfolio-wrapper {
		counter-reset: i;
		background-color: $color-black;
		height: 600vh;
	}

	/***** 2) CHAQUE SECTION = 200vh + position relative + décalage via --i *****/
	section {
		position: relative;
		height: 200vh; /* <- 2× la hauteur du viewport */
		width: 100%;
		// background-color: $color-white;
		counter-increment: i;
		--i: counter(i);

		/* On décale chaque section suivante d'1 viewport vers le haut */

		@include media('<phone') {
			padding: calc($default-gap * 2) 0;
		}
	}

	section:nth-child(2) {
		top: -100vh;
	}

	section:nth-child(3) {
		top: -200vh;
	}

	section:nth-child(4) {
		top: -300vh;
	}

	section:nth-child(5) {
		top: -400vh;
	}

	section:last-child {
		top: -500vh;
		height: 100vh;
	}

	/***** 3) L'ÉLÉMENT "sticky" *****/
	.sticky {
		position: sticky;

		top: 0;
		width: 100%;
		height: 100vh; /* <- exactement la taille du viewport */
		will-change: filter, transform;
	}

	/***** 4) CONTENU EN DEDANS DU STICKY (scroll interne) *****/
	.container {
		width: 100%;
		height: 100%;
		background-color: $color-white;
		padding: 0 $default-gap;
		overflow: scroll;

		/* Masquer le scrollbar si besoin */
		&::-webkit-scrollbar {
			display: none;
		}
	}

	.dark-mode .container {
		background-color: $color-dark;
		color: $color-white;
	}

	/***** 5) CONTENU DE LA CARTE *****/
	.card {
		background-color: $color-white;
		padding-top: $default-gap * 3.2;
		display: flex;
		flex-direction: column;
		gap: 60px;
		height: 100vh;
		@include media('<phone') {
			gap: 16px;
		}
	}
	.dark-mode .card {
		background-color: $color-dark;
		color: $color-white;
	}

	.top {
		display: flex;
		justify-content: space-between;
		text-transform: uppercase;
		font-size: 5vw;
		line-height: 1;
		font-variation-settings: 'wght' 480;
	}

	.content {
		display: grid;
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
		grid-column: 1 / 5;

		@include media('<phone') {
			grid-row-start: 3;
			font-size: 4.3vw;
			grid-column: 1 / 7;
		}
	}

	.video {
		aspect-ratio: 16 / 9;
		grid-row-start: 1;
		grid-row-end: 3;
		overflow: hidden;
		grid-column: 5 / 13;
		max-height: 600px;
		position: relative;

		@include media('<phone') {
			grid-column: 1 / 7;
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
		grid-column-start: 1;
		grid-row-start: 2;
		font-size: 24px;
		display: flex;
		flex-direction: column;
		align-self: end;
		width: max-content;
		@include media('<phone') {
			display: none;
		}
	}
</style>
