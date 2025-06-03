<template>
	<header class="header">
		<NuxtLink
			to="/"
			class="logo-wrap">
			<Logo />
		</NuxtLink>

		<div class="menu-wrap">
			<div class="menu">Menu</div>

			<NuxtLink
				class="cta"
				:to="settings?.data.cta.url">
				{{ settings?.data.cta.text }}
			</NuxtLink>
		</div>
	</header>
</template>

<script setup>
	import { onMounted, onBeforeUnmount } from 'vue';
	const settings = useSettings();
</script>

<style lang="scss" scoped>
	.header {
		margin-top: calc($default-gap/2);
		padding: 0 $default-gap;
		position: fixed;
		z-index: $z-header;
		width: 100%;

		display: flex;
		align-items: flex-start;
		justify-content: space-between;

		mix-blend-mode: difference;
		color: $color-white;
		background: transparent;

		// filter: invert(50%);
	}

	.logo-wrap {
	}

	.menu-wrap {
		font-size: 1.38vw;
		font-variation-settings: 'wght' 480;
		// text-transform: uppercase;
		display: flex;
		align-items: center;
		gap: 24px;
		color: inherit;
		line-height: 1;
	}

	.menu {
		display: flex;
		gap: 24px;

		list-style: none;
		padding: 0;
	}

	.menu__item {
		padding: 0;
	}

	.cta {
		line-height: 1.1;
	}
</style>
