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
						{{ page?.data.date }}
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

	console.log(page);

	useSeoMeta({
		// title: page.value?.data.meta_title ?? undefined,
		// ogTitle: page.value?.data.meta_title ?? undefined,
		// description: page.value?.data.meta_description ?? undefined,
		// keywords: page.value?.data.meta_keywords ?? undefined,
		// ogImage: asImageSrc(page.value?.data.meta_image),
	});
</script>

<style lang="scss" scoped>
	section {
		background-color: $color-white;
	}
	// .container {
	// 	@include test;
	// 	width: 100%;
	// 	display: grid;
	// 	grid-template-columns: repeat(12, 1fr);
	// }

	.title {
		padding-top: calc($default-gap * 4);
		padding-bottom: $default-gap;
		font-variation-settings: 'wght' 440;
		text-transform: uppercase;
		line-height: 1;

		font-size: 5vw;
		text-transform: none;
	}
	.article-wrapper {
		display: flex;
	}

	.infos {
		// @include test;
		display: flex;
		flex-direction: column;
		width: 30%;
		height: 100svh;
		position: sticky;
		top: 0;
		text-transform: uppercase;
		gap: 12px;
	}

	.articles {
		// flex-grow: 1;
		width: 60%;
	}
</style>
