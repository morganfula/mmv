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

	const { data: page } = useAsyncData('[projects]', () =>
		prismic.client.getSingle('projects')
	);

	const { data: projects } = await useAsyncData('project', () =>
		prismic.client.getAllByType('project', route.params.uid, {
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
