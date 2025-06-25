<script setup lang="ts">
	import type { Content } from '@prismicio/client';
	import { getSliceComponentProps } from '@prismicio/vue';

	// helper de décodage
	function decodeHtml(html: string): string {
		// si on est en client on profite du textarea
		if (typeof document !== 'undefined') {
			const txt = document.createElement('textarea');
			txt.innerHTML = html;
			return txt.value;
		}
		// fallback serveur (décodage numérique + entités courantes)
		return (
			html
				// décodage &#123; et &#x1aF;
				.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(+dec))
				.replace(/&#x([\da-fA-F]+);/g, (_, hex) =>
					String.fromCharCode(parseInt(hex, 16))
				)
				// entités nommées de base
				.replace(/&quot;|&amp;|&lt;|&gt;|&apos;/g, entity => {
					switch (entity) {
						case '&quot;':
							return '"';
						case '&amp;':
							return '&';
						case '&lt;':
							return '<';
						case '&gt;':
							return '>';
						case '&apos;':
							return "'";
						default:
							return entity;
					}
				})
		);
	}

	const props = defineProps(
		getSliceComponentProps<Content.CardsGridSlice>([
			'slice',
			'index',
			'slices',
			'context',
		])
	);

	// extraire les URLs…
	const urls = (props.slice.primary.items ?? [])
		.filter(i => i.post_url?.url)
		.map(i => i.post_url!.url!);

	// fetch OG previews
	const { data: previews } = await useAsyncData('liPreviews', async () => {
		const raw = await Promise.all(
			urls.map(url => $fetch('/api/og', { query: { url } }))
		);
		return raw.map(p => ({
			...p,
			// double‐decode si besoin
			title: decodeHtml(decodeHtml(p.title)),
		}));
	});
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
					<img
						src="@/assets/image/linkedin.png"
						:alt="p.title" />
					<h4
						class="card-title"
						v-html="p.title"></h4>
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

	.dark-mode section {
		background-color: #132449;
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
	img {
		height: 120px;
		width: 120px;
		object-fit: cover;
	}
	h4 {
		padding-left: 16px;
	}
	.card {
		display: flex;
		transition: $default-transition;
		// flex-direction: column;
	}

	.card:hover {
		transform: translateY(-10%);
	}

	.card-title {
		padding-top: 16px;
	}

	.cards.news {
		grid-template-columns: repeat(3, 1fr);
	}
</style>
