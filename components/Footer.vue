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

		<div class="link-3">
			<div class="title">
				{{ footer.data.links_3_title }}
			</div>
			<div
				v-for="(item, i) in footer.data.links_3"
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

		<!-- <div class="newsletter">
			<div class="news-title">
				{{ footer.data.newsletter_title }}
			</div>

			<input
				class="news-message"
				:type="footer.data.newsletter_message"
				:placeholder="footer.data.newsletter_message" />
			<div class="news-policy">
				{{ footer.data.newsletter_policy }}
			</div>
		</div> -->

		<div
			class="button-top"
			role="button"
			tabindex="0"
			@click="scrollToTop"
			@keyup.enter="scrollToTop">
			{{ footer.data.button_message }}
		</div>
		<div class="copyrights">
			{{ footer.data.copyrights }} © MMV {{ new Date().getFullYear() }}
		</div>
	</Bounded>
</template>

<script setup>
	const footer = useFooter();

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
</script>

<style lang="scss" scoped>
	section {
		padding: $default-gap 0;
		color: $color-white;
		background: #353535;

		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: 1fr 0.7fr;

		@include media('<phone') {
			padding: calc($default-gap * 2) 0;
			grid-template-columns: repeat(6, 1fr);
			grid-template-rows: repeat(6, min-content);
			gap: 24px 0;
		}
	}

	.title {
		margin-bottom: 24px;
		font-variation-settings: 'wght' 500;
	}

	.link-1 {
		grid-area: 1 / 1 / 2 / 2;

		@include media('<phone') {
			grid-area: 4 / 1 / 5 / 4;
		}
	}
	.link-2 {
		grid-area: 1 / 2 / 2 / 4;

		@include media('<phone') {
			grid-area: 4 / 3 / 5 / 7;
		}
	}

	.link-3 {
		grid-area: 1 / 3 / 2 / 4;

		@include media('<phone') {
			display: none;
		}
	}
	.newsletter {
		grid-area: 1 / 7 / 2 / 13;

		@include media('<phone') {
			grid-area: 2 / 1 / 4 / 7;
		}
	}

	.news-title {
		font-size: 2.4vw;
		line-height: 1;
		padding-bottom: $default-gap;

		@include media('<phone') {
			font-size: 5vw;
		}
	}

	.news-message {
		font-size: 3vw;
		background: none;
		border: none;
		position: relative;
		width: 100%;
		color: $color-white;

		@include media('<phone') {
			font-size: 5vw;
			padding: 16px 0;
		}
	}

	.news-message::after {
		position: absolute;
		content: '';
		height: 1px;
		width: 100%;
		background: $color-white;
	}

	.news-policy {
		padding-top: $default-gap;
		opacity: 0.5;
	}
	.logo-wrapper {
		grid-area: 2 / 1 / 3 / 4;
		height: 200px;
		width: 100%;

		@include media('<phone') {
			grid-area: 1 / 1 / 2 / 4;
			height: 120px;
			width: 100%;
			object-fit: cover;
			margin-bottom: calc($default-gap * 2);
		}
	}
	.button-top {
		text-align: center;
		grid-area: 2 / 6 / 3 / 8;
		align-self: end;
		cursor: pointer;
		font-variation-settings: 'wght' 500;

		@include media('<phone') {
			grid-area: 5 / 1 / 6 / 7;
			justify-self: center;
		}
	}
	.copyrights {
		grid-area: 2 / 11 / 3 / 13;
		align-self: end;
		font-variation-settings: 'wght' 500;

		@include media('<phone') {
			grid-area: 6 / 1 / 7 / 7;
			justify-self: center;
		}
	}
</style>
