<script setup lang="ts">
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
</script>

<template>
	<Bounded as="div">
		<section
			:data-slice-type="slice.slice_type"
			:data-slice-variation="slice.variation">
			<div class="titles">
				<h3 class="h1 big-title">{{ slice.primary.title }}</h3>
				<h4 class="p1--black subtitle">{{ slice.primary.subtitle }}</h4>
			</div>

			<div
				class="cards"
				:class="{ news: slice.variation === 'news' }">
				<ProjectCard
					v-if="slice.variation === 'default'"
					class="card"
					v-for="(item, i) in slice.primary.item"
					:key="i"
					:project="item" />

				<!-- <NewCard :new="{ test: 'Test' }" /> -->

				<NewCard
					v-if="slice.variation === 'news'"
					class="card"
					v-for="(item, i) in slice.primary.item"
					:key="i"
					:new="item" />
			</div>
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	section {
		margin-top: $default-gap;
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
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-rows: min-content;
		gap: calc($default-gap / 2);
		padding-bottom: calc($default-gap * 2);
	}

	.cards.news {
		grid-template-columns: repeat(3, 1fr);
	}
</style>
