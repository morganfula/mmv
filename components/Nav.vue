<script setup>
	import gsap from 'gsap';
	const colorMode = useColorMode();
	const settings = useSettings();

	const isDark = computed({
		get: () => colorMode.preference === 'dark',
		set: v => (colorMode.preference = v ? 'dark' : 'light'),
	});

	watch(
		() => general.isNavOpen,
		val => {
			if (val) {
				scrollY -= 5000;

				setTimeout(() => {
					scrollY += 5000;
				}, 250);
			}
		}
	);

	const links = [
		{ href: '/', text: 'home' },
		{ href: '/news', text: 'News' },
		{ href: '/portfolio', text: 'Portfolio' },
		{ href: '/projects', text: 'Projects' },
		{ href: '/contact', text: 'contact' },
		{ href: '/about', text: 'about' },
	];

	// REFS
	const navbar = ref();
	const navLink = ref([]);
	const isDragging = ref(false);
</script>
<template>
	<nav class="nav__wrap">
		<ul
			class="nav"
			ref="navbar"
			:class="{ 'is-dragging': isDragging }">
			<li
				v-for="link in settings.data.navigation"
				class="nav__item"
				ref="navLink">
				<div class="nav__link">
					<PrismicLink :field="link.url" />
				</div>
			</li>
		</ul>

		<label
			class="theme-toggle"
			aria-label="Toggle dark mode">
			<input
				type="checkbox"
				class="theme-toggle__checkbox"
				v-model="isDark"
				role="switch"
				:aria-checked="isDark" />
			<span class="theme-toggle__slider" />
		</label>
	</nav>
</template>

<style lang="scss" scoped>
	.nav__wrap {
		background: $color-black;
		position: fixed;
		inset: 0;
		z-index: 4;
		opacity: 0;
		visibility: hidden;
		pointer-events: none;

		@include media('<phone') {
			min-height: 100svh;
		}
	}

	.nav {
		height: 100svh;
		padding-top: calc($default-gap * 2);
		padding-left: $default-gap;
		overflow: hidden;
		list-style-type: none;

		display: flex;
		flex-direction: column;

		@include media('<phone') {
			padding-top: calc($default-gap * 9);
			align-items: center;
			height: 100%;
		}
	}

	.nav.is-dragging {
		cursor: grab;
	}

	.nav__link {
		color: $color-white;
		text-decoration: none;
		cursor: pointer;
		font-size: 5vw;
		line-height: 1.1;
		text-transform: capitalize;
		display: inline-flex;

		@include media('<phone') {
			font-size: 14vw;
		}
	}

	.nav__item {
		padding: 16px 0;
		text-align: center;
		// position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
	}

	.theme-toggle {
		position: absolute;
		z-index: 1000;
		bottom: $default-gap;
		left: $default-gap;
	}

	.theme-toggle {
		position: absolute;
		bottom: $default-gap;
		left: $default-gap;
		width: 3.25rem; // 52px
		height: 1.75rem; // 28px
		display: inline-block;

		.theme-toggle__checkbox {
			opacity: 0;
			width: 0;
			height: 0;
		}

		.theme-toggle__slider {
			position: absolute;
			inset: 0;
			cursor: pointer;
			border-radius: 999px;
			background: $color-white;
			transition: background 0.25s ease;

			&::before {
				content: '';
				position: absolute;
				height: 1.25rem; // 20px
				width: 1.25rem;
				left: 0.25rem; // 4px
				top: 0.25rem;
				border-radius: 999px;
				background: $color-black;
				transition:
					transform 0.25s ease,
					background 0.25s ease;
			}
		}

		// checked state
		.theme-toggle__checkbox:checked + .theme-toggle__slider {
			background: $color-dark;

			&::before {
				transform: translateX(1.5rem); // move knob to the right
				background: $color-white;
			}
		}
	}
</style>
