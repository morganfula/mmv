<template>
	<div>
		<NuxtLayout
			name="custom"
			:page-name="$route.name">
			<Bounded as="section">
				<div class="title">
					{{ page?.data.title }}
				</div>
			</Bounded>

			<Bounded
				as="section"
				class="article-wrapper">
				<div class="infos p1--black">
					<span> by {{ page?.data.team.data.name }} </span>

					<span>
						{{ page?.data.category }}
					</span>
					<span>
						{{ formatDate(page?.data.date) }}
					</span>
				</div>
				<div class="articles">
					<SliceZone
						wrapper="main"
						:slices="page?.data.slices ?? []"
						:components="components" />
				</div>
			</Bounded>
		</NuxtLayout>
	</div>
</template>

<script setup>
	import i18n from '~/plugins/i18n';
	import { components } from '~/slices';
	import { useFormatDate } from '~/composables/useFormatDate';

	definePageMeta(transition);

	const { asImageSrc } = usePrismic();
	const { formatDate } = useFormatDate();

	const prismic = usePrismic();
	const route = useRoute();

	const { data: page } = await useAsyncData(route.params.uid, () =>
		prismic.client.getByUID('new', route.params.uid, {
			fetchLinks: [
				'new.title',
				'new.subtitle',
				'new.category',
				'new.image',
				'new.date',
				'team.name',
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
		padding-bottom: calc($default-gap * 4);
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
		text-transform: none;

		@include media('<phone') {
			padding-top: 30vw;
			font-size: 9vw;
		}
	}
	.article-wrapper {
		display: flex;

		@include media('<phone') {
			flex-direction: column;
		}
	}

	.infos {
		display: flex;
		flex-direction: column;
		width: 30%;
		height: 100svh;
		position: sticky;
		top: 0;
		text-transform: uppercase;
		gap: 12px;

		@include media('<phone') {
			height: 100%;
			width: 100%;
			margin: $default-gap * 2 0;
		}
	}

	.articles {
		@include test;
		// flex-grow: 1;
		width: 60%;

		@include media('<phone') {
			width: 100%;
		}
	}
</style>
