<script setup>
	watch(
		() => general.isNavOpen,
		val => {
			toggleMenu(val);
		}
	);
</script>
<template>
	<div
		class="burger"
		@click="general.isNavOpen = !general.isNavOpen">
		<div class="burger__line1"></div>
		<div class="burger__line2"></div>
	</div>
</template>
<style lang="scss" scoped>
	.burger {
		// position: fixed;
		// right: 32px;
		// top: 32px;
		height: 50px;
		width: 80px;
		z-index: 6;
		cursor: pointer;
		transition: transform 0.2s ease-in;
		will-change: transform;

		@include media('<phone') {
			width: 50px;
		}
	}

	.burger:hover {
		transform: scaleY(0.8);
	}

	.burger__line1,
	.burger__line2 {
		position: absolute;
		left: 50%;
		top: 50%;
		height: 1px;
		width: 100%;
		background: $color-white;
	}

	.burger__line1 {
		transform: translate(-50%, -5px);
	}
	.burger__line2 {
		transform: translate(-50%, 5px);
	}
</style>
