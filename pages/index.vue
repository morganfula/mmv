<template>
	<div>
		<NuxtLayout
			name="custom"
			page-name="index">
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
	const { data: page } = useAsyncData('[home]', () =>
		prismic.client.getSingle('home', {
			fetchLinks: [
				'project.title',
				'project.subtitle',
				'project.category',
				'project.image',
				'new.title',
				'new.subtitle',
				'new.category',
				'new.image',
				'new.date',
			],
		})
	);

	useSeoMeta({
		title: page.value?.data.meta_title ?? undefined,
		ogTitle: page.value?.data.meta_title ?? undefined,
		description: page.value?.data.meta_description ?? undefined,
		ogImage: asImageSrc(page.value?.data.meta_image),
	});
</script>

<style lang="scss" scoped>
	p {
		@include test;

		z-index: 10;
		color: black;
	}
	.title {
		font-size: 3.2vw;
		position: absolute;
		z-index: 1;
		color: #ffffff;
		bottom: $default-gap;
		left: $default-gap;
	}
</style>
