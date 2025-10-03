<script setup>
	const props = defineProps({
		url: { type: String, required: true },
		label: { type: String, default: 'Partager sur LinkedIn' },
	});

	const shareHref = computed(
		() =>
			`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(props.url)}`
	);
</script>

<template>
	<a
		:href="shareHref"
		target="_blank"
		rel="noopener"
		class="share-ln"
		:aria-label="label"
		:title="label">
		<!-- Icône LinkedIn en SVG, suit la couleur du texte -->
		<svg
			class="icon"
			viewBox="0 0 24 24"
			aria-hidden="true"
			focusable="false">
			<path
				fill="currentColor"
				d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.37V9h3.41v1.56h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.34 2.41 4.34 5.55v6.19zM5.34 7.44a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
		</svg>
	</a>
</template>

<style scoped>
	.share-ln {
		display: inline-flex;
		align-items: center;
		text-decoration: none;
		color: inherit; /* hérite de la couleur du texte */
		line-height: 1;
	}
	.icon {
		width: 1em; /* taille relative au texte environnant */
		height: 1em;
	}
	.share-ln:hover {
		opacity: 0.8;
	}
</style>
