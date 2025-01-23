<template>
	<div :class="`page ${props.pageName}`">
		<Header />

		<div class="page-wrap">
			<slot />
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		title: String,
		pageName: String,
	});
</script>

<style lang="scss" scoped></style>
