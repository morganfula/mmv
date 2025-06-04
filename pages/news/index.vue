<template>
	<div>
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
	import NewListItem from '~/components/NewListItem.vue';
	import i18n from '~/plugins/i18n';
	import { components } from '~/slices';

	definePageMeta(transition);

	const route = useRoute();
	const prismic = usePrismic();

	const { data: page } = useAsyncData('[news]', () =>
		prismic.client.getSingle('news', {
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

	const { data: news } = await useAsyncData('new', () =>
		prismic.client.getAllByType('new', route.params.uid, {
			fetchLinks: [],
		})
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
	ul {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(25vw, 1fr));
		gap: 24px;
	}
</style>
