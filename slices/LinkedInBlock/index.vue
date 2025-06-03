<script setup lang="ts">
	import type { Content } from '@prismicio/client';

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	const props = defineProps(
		getSliceComponentProps<Content.CardsGridSlice>([
			'slice',
			'index',
			'slices',
			'context',
		])
	);

	/* 🔑 grab URLs from slice.primary.items */
	const urls = (props.slice.primary.items ?? [])
		.filter(i => i.post_url?.url)
		.map(i => i.post_url.url);

	/* fetch OG previews for every URL (server-side once) */
	const { data: previews } = await useAsyncData('liPreviews', () =>
		Promise.all(urls.map(url => $fetch('/api/og', { query: { url } })))
	);
</script>

<template>
	<section
		class="section"
		:data-slice-type="slice.slice_type"
		:data-slice-variation="slice.variation">
		<Bounded as="div">
			<div class="titles">
				<h3 class="h1 big-title">{{ slice.primary.title }}</h3>
				<h4 class="p1--black subtitle">{{ slice.primary.subtitle }}</h4>
			</div>

			<div class="cards">
				<a
					v-for="p in previews"
					:key="p.url"
					:href="p.url"
					target="_blank"
					rel="noopener"
					class="card">
					<!-- <img
						:src="p.image"
						:alt="p.title" /> -->
					<h4>{{ p.title }}</h4>
				</a>
			</div>
		</Bounded>
	</section>
</template>

<style lang="scss" scoped>
	section {
		padding: $default-gap 0;
		background: #e7f0f9;
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
			grid-template-columns: 1fr;
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
		}
	}

	.cards.news {
		grid-template-columns: repeat(3, 1fr);
	}
</style>
