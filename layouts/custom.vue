<template>
	<div :class="`page ${props.pageName}`">
		<Header />

		<div class="page-wrap">
			<slot />
		</div>

		<Footer />
	</div>
</template>

<script setup>
	const props = defineProps({ title: String, pageName: String });
</script>

<style lang="scss" scoped>
	._container {
		width: 100%;
		padding-left: 60px;
		padding-right: 60px;
	}
</style>
