<script setup lang="ts">
	import { ref, onMounted } from 'vue';
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
			},
			'<'
		);
	});
</script>

<template>
	<section
		class="section"
		ref="sectionRef"
		:data-slice-type="slice.slice_type"
		:data-slice-variation="slice.variation">
		<Bounded as="div">
			<div
				class="titles"
				ref="titleRef">
				<h3 class="h1 big-title">{{ slice.primary.title }}</h3>
				<h4 class="p1--black subtitle">{{ slice.primary.subtitle }}</h4>
			</div>

			<div
				class="cards"
				ref="cardsRef">
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
		padding: calc($default-gap / 2) 0;
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

		margin-bottom: calc($default-gap);
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
		padding-bottom: calc($default-gap);

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
