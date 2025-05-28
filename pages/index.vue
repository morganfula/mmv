<template>
	<div>
		<NuxtLayout
			name="custom"
			:page-name="$route.name">
			<section class="">
				<h1 class="title h1">
					{{ page?.data.title }}
				</h1>

				<VimeoBackground :video-url="page?.data.video.url" />

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

<style lang="scss" scoped>
	section {
		position: relative;
		min-height: 100svh;
	}

	.title {
		position: absolute;
		z-index: 2;
		color: $color-white;
		bottom: $default-gap;
		left: $default-gap;
	}
</style>
