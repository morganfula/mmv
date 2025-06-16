<template>
	<div :class="`page ${props.pageName}`">
		<Header />
		<Nav />

		<div class="page-wrap">
			<slot />
		</div>

		<Footer />
	</div>
</template>

<script setup>
	const props = defineProps({ title: String, pageName: String });

	watch(
		() => general.isPreloaderVisible,
		() => {
			firstScreenAnimation({
				parent: `.${props.pageName}`,
			});
		}
	);
</script>

<style lang="scss" scoped>
	._container {
		width: 100%;
		padding-left: 60px;
		padding-right: 60px;
	}
	.page-wrap {
		position: relative;
	}
</style>
