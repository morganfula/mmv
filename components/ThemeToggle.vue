<script setup lang="ts">
	import { useTheme } from '@/composables/useTheme';
	const { theme, toggle } = useTheme();
</script>

<template>
	<button
		class="button"
		@click="toggle">
		{{ theme === 'light' ? '🌙' : '☀️ ' }}
	</button>
</template>

<style lang="scss" scoped>
	.button {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000000100;
		border: none;
		background: none;
		font-size: 30px;
	}
</style>
