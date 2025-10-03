<template>
	<header class="header">
		<NuxtLink
			to="/"
			class="logo-wrap">
			<Logo />
		</NuxtLink>

		<div
			class="menu-wrap"
			@click="handleMenu">
			<div class="menu">
				<MenuButton />
			</div>
		</div>
	</header>
</template>

<script setup>
	import { onMounted, onBeforeUnmount, nextTick } from 'vue';
	import { general } from '@/store';
	import { toggleMenu } from '~/composables/toggleMenu';

	const settings = useSettings();

	async function handleMenu() {
		general.isNavOpen = !general.isNavOpen;
		await nextTick(); // s’assure que .burger est dans le DOM
		toggleMenu(general.isNavOpen);
	}

	watch(
		() => general.isNavOpen,
		val => {
			toggleMenu(val);
		}
	);
</script>

<style lang="scss" scoped>
	.header {
		padding: calc($default-gap/6) $default-gap;
		position: fixed;
		z-index: $z-header;
		width: 100%;

		// background: rgba($color-white, 0.4);
		display: flex;
		align-items: flex-start;
		justify-content: space-between;

		mix-blend-mode: difference;
		color: $color-white;
		background: transparent;
		// background: $color-black;
		// backdrop-filter: blur(10px);
		// filter: invert(50%);

		@include media('<phone') {
			align-items: center;
		}
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

		@include media('<phone') {
			display: none;
		}
	}
</style>
