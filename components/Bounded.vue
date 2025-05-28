<script setup>
	const { as } = defineProps({
		as: { type: [String, Object, Function], default: 'div' },
	});
</script>

<template>
	<Component
		:is="as"
		class="container">
		<slot />
	</Component>
</template>

<style scoped lang="scss">
	.container {
		margin: 0 auto;
		width: 100%;
		padding-left: $default-gap;
		padding-right: $default-gap;
	}
</style>
