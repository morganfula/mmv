<script setup lang="ts">
	import { ref, computed } from 'vue';
	import type { Content } from '@prismicio/client';
	const route = useRoute();
	const prismic = usePrismic();

	const { data: news } = await useAsyncData('project', () =>
		prismic.client.getAllByType('project')
	);

	const selectedCategory = ref<'All' | string>('All');

	/* Category list for the buttons (adds “All” in front). */
	const categories = computed(() => {
		if (!news.value) return ['All'];
		const set = new Set<string>(news.value.map(doc => doc.data.category));
		return ['All', ...Array.from(set)];
	});

	/* News actually shown on screen. */
	const filteredNews = computed(() => {
		if (!news.value) return [];
		return selectedCategory.value === 'All'
			? news.value
			: news.value.filter(doc => doc.data.category === selectedCategory.value);
	});

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.ProjectsBlockSlice>([
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
			<h2 class="h1 big-title">
				{{ slice.primary.title }}
			</h2>

			<div class="filters">
				<button
					v-for="cat in categories"
					:key="cat"
					:class="{ active: selectedCategory === cat }"
					@click="selectedCategory = cat">
					{{ cat }}
				</button>
			</div>

			<div class="cards">
				<ProjectCard
					v-for="doc in filteredNews"
					:key="doc.id"
					:project="{ item: doc }"
					class="card" />
			</div>
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	section {
		padding-top: $default-gap;
		background: $color-white;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-rows: min-content;
		gap: calc($default-gap / 2);
		padding-bottom: calc($default-gap * 2);

		@include media('<phone') {
			grid-template-columns: 1fr;
			gap: calc($default-gap * 2);
		}
	}

	.filters {
		display: flex;
		gap: 16px;
		margin: calc($default-gap/2) 0;

		@include media('<phone') {
			margin: ($default-gap * 2) 0;
		}
	}

	.filters button {
		padding: 16px 28px;
		border-radius: 50px;
		border: none;
		font-size: 1.2vw;
		transition: $default-transition;
		font-variation-settings: 'wght' 500;

		@include media('<phone') {
			padding: 8px 14px;
			font-size: 4vw;
			color: $color-black;
		}
	}

	.filters button.active {
		color: $color-white;
		background: $color-black;
	}

	.filters button:hover {
		cursor: pointer;
		font-variation-settings: 'wght' 680;
	}
</style>
