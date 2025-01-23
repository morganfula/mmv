<template>
	<div>
		<NuxtLayout
			name="custom"
			:page-name="$route.name">
			<section>
				<h1>
					MMV - Route: {{ $route.params.uid }} | Page: {{ page?.data.title }}
				</h1>
				<h1>{{ page?.data.title }}</h1>

				{{ page.id }}
			</section>
		</NuxtLayout>
	</div>
</template>

<script setup>
	import i18n from '~/plugins/i18n';
	import { components } from '~/slices';

	const prismic = usePrismic();
	const route = useRoute();

	const { data: page } = await useAsyncData(route.params.uid, () =>
		prismic.client.getByUID('project', route.params.uid, {
			fetchLinks: ['project.uid', 'new.title'],
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

<style lang="scss" scoped></style>
