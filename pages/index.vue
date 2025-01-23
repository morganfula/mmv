<template>
	<div>
		<NuxtLayout
			name="custom"
			:page-name="$route.name">
			<section>
				<h1>MMV - Route: {{ $route.name }} | Page: {{ page?.data.title }}</h1>
				<h1>{{ page?.data.title }}</h1>
				<!-- <br />
				<h2>STORE: {{ general }}</h2>
				<br />
				<p>{{ page?.data }}</p> -->

				<PrismicRichText :field="page?.data.description" />
			</section>
		</NuxtLayout>
	</div>
</template>

<script setup>
	import i18n from '~/plugins/i18n';
	import { components } from '~/slices';

	const prismic = usePrismic();
	const { data: page } = useAsyncData('[home]', () =>
		prismic.client.getSingle('home')
	);

	useSeoMeta({
		title: page.value?.data.meta_title,
		// title: page.value?.data.meta_title ?? undefined,
		// ogTitle: page.value?.data.meta_title ?? undefined,
		// description: page.value?.data.meta_description ?? undefined,
		// keywords: page.value?.data.meta_keywords ?? undefined,
		// ogImage: asImageSrc(page.value?.data.meta_image),
	});
</script>

<style lang="scss" scoped></style>
