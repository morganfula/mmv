<template>
	<Bounded as="section">
		<div class="link-1">
			<div class="title">
				{{ footer.data.links_1_title }}
			</div>
			<div
				v-for="(item, i) in footer.data.links_1"
				:key="i">
				<PrismicLink
					class="footer-link"
					:field="item.link" />
			</div>
		</div>
		<div class="link-2">
			<div class="title">
				{{ footer.data.links_2_title }}
			</div>
			<div
				v-for="(item, i) in footer.data.links_2"
				:key="i">
				<PrismicLink
					class="footer-link"
					:field="item.link" />
			</div>
		</div>

		<nuxt-link
			to="/"
			class="logo-wrapper">
			<PrismicImage :field="footer.data.logo" />
		</nuxt-link>

		<div class="newsletter">
			<div class="news-title">
				{{ footer.data.newsletter_title }}
			</div>
			<div class="news-message">
				{{ footer.data.newsletter_message }}
			</div>
			<div class="news-policy">
				{{ footer.data.newsletter_policy }}
			</div>
		</div>

		<div class="button-top">
			{{ footer.data.button_message }}
		</div>
		<div class="copyrights">
			{{ footer.data.copyrights }} © MMV {{ new Date().getFullYear() }}
		</div>
	</Bounded>
</template>

<script setup>
	const footer = useFooter();
</script>

<style lang="scss" scoped>
	section {
		padding: $default-gap 0;
		color: $color-white;
		background: #353535;

		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: 1fr 0.7fr;
	}

	.title {
		margin-bottom: 24px;
		font-variation-settings: 'wght' 500;
	}

	.link-1 {
		grid-area: 1 / 1 / 2 / 2;
	}
	.link-2 {
		grid-area: 1 / 3 / 2 / 4;
	}
	.newsletter {
		grid-area: 1 / 7 / 2 / 13;
	}

	.news-title {
		font-size: 2.4vw;
		line-height: 1;
		padding-bottom: $default-gap;
	}

	.news-message {
		font-size: 3vw;
	}

	.news-policy {
		padding-top: $default-gap;
		opacity: 0.5;
	}
	.logo-wrapper {
		grid-area: 2 / 1 / 3 / 4;
	}
	.button-top {
		grid-area: 2 / 6 / 3 / 8;
		align-self: end;
		cursor: pointer;
		font-variation-settings: 'wght' 500;
	}
	.copyrights {
		grid-area: 2 / 11 / 3 / 13;
		align-self: end;
		font-variation-settings: 'wght' 500;
	}
</style>
