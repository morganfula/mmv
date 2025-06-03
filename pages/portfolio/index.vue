<template>
	<div class="portfolio">
		<NuxtLayout
			name="custom"
			:page-name="$route.name">
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

	const prismic = usePrismic();
	const { data: page } = useAsyncData('[services]', () =>
		prismic.client.getSingle('services')
	);

	useSeoMeta({
		// title: page.value?.data.meta_title ?? undefined,
		// ogTitle: page.value?.data.meta_title ?? undefined,
		// description: page.value?.data.meta_description ?? undefined,
		// keywords: page.value?.data.meta_keywords ?? undefined,
		// ogImage: asImageSrc(page.value?.data.meta_image),
	});
</script>

<style lang="scss" scoped></style>
