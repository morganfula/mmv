<template>
	<div>
		<NuxtLayout
			name="custom"
			:page-name="$route.name">
			<Bounded as="section">
				<div class="title">
					{{ page?.data.title }}
				</div>
				<div class="text">
					<div class="description p1--black">
						<PrismicRichText :field="page?.data.description" />
					</div>
				</div>
			</Bounded>

			<SliceZone
				wrapper="main"
				:slices="page?.data.slices ?? []"
				:components="components" />
		</NuxtLayout>
	</div>
</template>

<script setup>
	import i18n from '~/plugins/i18n';
	import { components } from '~/slices';

	definePageMeta(transition);

	const { asImageSrc } = usePrismic();

	const prismic = usePrismic();
	const route = useRoute();

	const { data: page } = await useAsyncData(route.params.uid, () =>
		prismic.client.getByUID('portfolioitem', route.params.uid, {
			fetchLinks: [
				'portfolioitem.title',
				'portfolioitem.description',
				'portfolioitem.image',
			],
		})
	);

	useSeoMeta({
		title: page.value?.data.title ?? undefined,
		ogTitle: page.value?.data.title ?? undefined,

		ogImage: asImageSrc(page.value?.data.image),
	});
</script>

<style lang="scss" scoped>
	section {
		background-color: $color-white;
		padding-bottom: $default-gap;
	}

	.dark-mode section {
		background-color: $color-dark;
		color: $color-white;
	}

	.title {
		padding-top: calc($default-gap * 4);
		padding-bottom: $default-gap;
		font-variation-settings: 'wght' 440;
		text-transform: uppercase;
		line-height: 1;

		font-size: 5vw;

		@include media('<phone') {
			padding-top: 30vw;
			font-size: 9vw;
		}
	}

	.text {
		@include default-grid;
		padding-bottom: $default-gap;
	}

	.description {
		grid-column: 6/12;
	}
</style>
