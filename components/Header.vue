<template>
	<header class="header">
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
	</header>
</template>

<script setup>
	const settings = useSettings();
</script>

<style lang="scss" scoped>
	.header {
		position: sticky;
		width: 100vw;
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
