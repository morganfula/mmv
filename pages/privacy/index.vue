<template>
	<div>
		<NuxtLayout
			name="custom"
			:page-name="$route.name">
			<Bounded as="section">
				<h1 class="big-title">
					{{ page?.data.title }}
				</h1>

				<div class="p1">
					<PrismicRichText :field="page.data.description" />
				</div>
			</Bounded>
		</NuxtLayout>
	</div>
</template>

<script setup>
	import i18n from '~/plugins/i18n';
	import { components } from '~/slices';

	definePageMeta(transition);

	const prismic = usePrismic();
	const { data: page } = useAsyncData('[privacy]', () =>
		prismic.client.getSingle('privacy')
	);

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
		padding: calc($default-gap * 2) 0;
		background-color: $color-white;
		max-width: 60%;
		font-size: 1.4vw;
	}
</style>
