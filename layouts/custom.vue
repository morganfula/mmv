<template>
	<div :class="`page ${props.pageName}`">
		<Header />
		<Nav />

		<div class="page-wrap">
			<slot />
		</div>

		<select v-model="$colorMode.preference">
			<option value="system">System</option>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
			<option value="sepia">Sepia</option>
		</select>

		<Footer />
	</div>
</template>

<script setup>
	const colorMode = useColorMode();

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
