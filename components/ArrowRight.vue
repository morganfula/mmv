<template>
	<svg
		viewBox="0 0 60 48"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M57.1213 25.1213C58.2929 23.9497 58.2929 22.0503 57.1213 20.8787L38.0294 1.7868C36.8579 0.615224 34.9584 0.615224 33.7868 1.7868C32.6152 2.95837 32.6152 4.85786 33.7868 6.02944L50.7574 23L33.7868 39.9706C32.6152 41.1421 32.6152 43.0416 33.7868 44.2132C34.9584 45.3848 36.8579 45.3848 38.0294 44.2132L57.1213 25.1213ZM0 23L0 26L55 26V23V20L0 20L0 23Z" />
	</svg>
</template>

<script setup>
	const props = defineProps({
		color: {
			type: String,
			default: '#000000',
		},
		width: {
			type: [String, Number],
			default: 60,
		},
		height: {
			type: [String, Number],
			default: 48,
		},
	});
</script>

<style lang="scss" scoped>
	svg {
		height: 100%;
		width: auto;
		fill: $color-black;
	}

	.dark-mode svg {
		fill: $color-white;
	}
</style>
