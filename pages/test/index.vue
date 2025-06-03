<template>
	<div>
		<section class="section">
			<!-- On met data-lenis-prevent pour que Lenis n’interfère pas ici -->
			<div
				class="sticky"
				data-lenis-prevent>
				<h2>Section 1 (Sticky fonctionne)</h2>
				<p>Quelque contenu…</p>
			</div>
		</section>
		<section class="section">
			<div
				class="sticky"
				data-lenis-prevent>
				<h2>Section 2</h2>
				<p>Quelque contenu…</p>
			</div>
		</section>
		<section class="section">
			<div
				class="sticky"
				data-lenis-prevent>
				<h2>Section 3</h2>
				<p>Quelque contenu…</p>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	// Pas de script nécessaire
</script>

<style scoped lang="scss">
	/* On s’assure que le body & le root laissent défiler */
	html,
	body {
		height: auto; /* ou 100% sans overflow */
		margin: 0;
		padding: 0;
		/* ne surtout pas mettre overflow: hidden ici */
	}

	.wrapper {
		/* Wrapper qui prend la hauteur du contenu */
		position: relative;
	}

	.section {
		height: 100vh;
		border-bottom: 1px solid #ddd;
	}

	.sticky {
		@include test;
		position: sticky;
		top: 0;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.03);
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 2rem;
	}
</style>
