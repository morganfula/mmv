<script setup lang="ts">
	import { ref } from 'vue';
	import type { Content } from '@prismicio/client';

	// Récupération typée des props Prismic
	const props = defineProps(
		getSliceComponentProps<Content.SelectorSlice>([
			'slice',
			'index',
			'slices',
			'context',
		])
	);

	// État : quel index est actif (0 par défaut)
	const activeIndex = ref(0);
</script>

<template>
	<section
		:data-slice-type="slice.slice_type"
		:data-slice-variation="slice.variation"
		class="carousel-section">
		<!-- Images en plein écran -->
		<div class="images-container">
			<div
				v-for="(item, i) in slice.primary.items"
				:key="i"
				class="image"
				:class="{ active: activeIndex === i }">
				<PrismicImage :field="item.item.data.image" />
			</div>
		</div>

		<!-- Menu / titres -->
		<ul class="menu">
			<li
				v-for="(item, i) in slice.primary.items"
				:key="i"
				@mouseover="activeIndex = i"
				class="menu-item">
				<NuxtLink :to="`/portfolio/${item.item.data.uid}`">
					{{ item.item.data.title }}
				</NuxtLink>
			</li>
		</ul>
	</section>
</template>

<style scoped lang="scss">
	.carousel-section {
		position: relative;
		width: 100%;
		height: 100svh;
		min-height: 100svh;
		overflow: hidden;

		.images-container {
			position: absolute;
			inset: 0;

			.image {
				position: absolute;
				inset: 0;
				opacity: 0;
				transition: $default-transition;

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}

				&.active {
					opacity: 1;
				}
			}
		}

		.menu {
			position: relative;
			height: 100%;
			z-index: 1;
			display: flex;
			flex-direction: column;
			gap: 2rem;
			padding: $default-gap;
			list-style: none;

			@include media('<phone') {
				gap: 18px;
			}
			// justify-content: center;

			.menu-item {
				cursor: pointer;
				color: rgba($color-white, 0.4);
				font-size: 4vw;
				white-space: nowrap;
				line-height: 1;
				text-transform: capitalize;
				transition: $default-transition;

				@include media('<phone') {
					font-size: 8vw;
					color: rgba($color-white, 1);
				}

				&:hover {
					color: rgba($color-white, 1);
				}
			}
		}

		@include media('<phone') {
			min-height: 60svh;
			height: 60svh;
		}
	}
</style>
