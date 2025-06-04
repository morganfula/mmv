<template>
	<div>
		<NuxtLayout
			name="custom"
			:page-name="$route.name">
			<section class="image-wrap">
				<PrismicImage
					class="image"
					:field="page?.data.image" />
				<h1 class="h1 title">{{ page?.data.title }}</h1>
			</section>

			<SliceZone
				wrapper="main"
				:slices="page?.data.slices ?? []"
				:components="components"
				:context="page?.data.category" />
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
		prismic.client.getByUID('project', route.params.uid, {
			fetchLinks: ['project.uid', 'project.category', 'new.title'],
		})
	);

	useSeoMeta({
		title: page.value?.data.title ?? undefined,
		ogTitle: page.value?.data.title ?? undefined,
		ogImage: asImageSrc(page.value?.data.image),
	});
</script>

<style lang="scss" scoped>
	.image-wrap {
		position: relative;
		overflow: hidden;
		height: 100svh;
		min-height: 100svh;
		width: 100%;
	}

	.image {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	.title {
		position: absolute;
		left: $default-gap;
		top: 60%;
		color: $color-white;
		text-transform: uppercase;
		max-width: 70%;

		@include media('<phone') {
			font-size: 8vw;
			top: 70%;
		}
	}
</style>
