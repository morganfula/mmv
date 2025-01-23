<template>
	<div id="viewport">
		<slot />
	</div>
</template>

<script setup>
	// const settings = useSettings();

	// onMounted(() => {
	// 	useSmoothScroll();
	// });

	// useSeoMeta({
	// 	title: computed(() => settings?.value.data.site_title),
	// 	ogTitle: computed(() => settings?.value.data.site_title),
	// 	description: computed(() => settings?.value.data.meta_description),
	// 	keywords: computed(() => settings?.value.data.keywords),
	// 	// ogImage: asImageSrc(page.value?.data.meta_image),
	// });
</script>

<style lang="scss" scoped></style>
