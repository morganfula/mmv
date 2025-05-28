<template>
	<header class="header">
		<Bounded as="section">
			<NuxtLink
				to="/"
				class="logo"
				>Montreux Media Ventures</NuxtLink
			>

			<ul class="menu">
				<li
					class="menu__item"
					v-for="(item, i) in settings?.data.navigation"
					:key="i">
					<NuxtLink :to="item.url.url">{{ item.url.text }}</NuxtLink>
				</li>
			</ul>

			<NuxtLink :to="settings?.data.cta.url">{{
				settings?.data.cta.text
			}}</NuxtLink>
		</Bounded>
	</header>
</template>

<script setup>
	const settings = useSettings();
</script>

<style lang="scss" scoped>
	.header {
		position: fixed;
		width: 100vw;
		display: flex;
		z-index: 2;

		justify-content: space-between;
		align-items: center;
	}

	.container {
		color: $color-white;
		mix-blend-mode: difference;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		font-size: 1.4rem;
	}
	.menu {
		display: flex;
		gap: 24px;
		font-size: 2rem;
		list-style: none;
		padding: 0;
	}

	.menu__item {
		padding: 0;
	}
</style>
