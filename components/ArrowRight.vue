<script setup lang="ts">
	const props = defineProps({
		color: { type: String, default: 'currentColor' },
		/** Optional height, e.g. '24px', '1.5em'.  If omitted we fall back to 1 em. */
		size: { type: String, default: '1em' },
	});
</script>

<template>
	<svg
		class="icon"
		:style="{ height: props.size }"
		viewBox="0 0 9 8"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		:stroke="props.color"
		stroke-linecap="round"
		stroke-linejoin="round">
		<path d="M5 1L8 4M8 4L5 7M8 4L0 4" />
	</svg>
</template>

<style scoped lang="scss">
	.icon {
		width: auto; // keep aspect ratio
		display: block; // avoid inline-SVG whitespace
	}
</style>
