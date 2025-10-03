<script setup></script>
<template>
	<div class="burger">
		<div class="burger__line1"></div>
		<div class="burger__line2"></div>
		<!-- <div class="burger__line3"></div> -->
	</div>
</template>
<style lang="scss" scoped>
	.burger {
		// position: fixed;
		// right: 32px;
		// top: 32px;
		height: 80px;
		width: 80px;
		z-index: 10000000000;
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
	.burger__line2,
	.burger__line3 {
		position: absolute;
		left: 50%;
		top: 50%;
		height: 2px;
		width: 100%;
		background: $color-white;
	}

	.burger__line1 {
		transform: translate(-50%, -7px);
	}
	.burger__line2 {
		transform: translate(-50%, 7px);
	}
	.burger__line3 {
		transform: translate(-50%, 0);
	}
</style>
