<template>
	<div>
		<section class="section">
			<!-- On met  pour que Lenis n’interfère pas ici (facultatif) -->
			<div class="sticky">
				<h2>Section 1 (Sticky doit coller)</h2>
				<p>Quelque contenu…</p>
			</div>
		</section>
		<section class="section">
			<div class="sticky">
				<h2>Section 2</h2>
				<p>Quelque contenu…</p>
			</div>
		</section>
		<section class="section">
			<div class="sticky">
				<h2>Section 3</h2>
				<p>Quelque contenu…</p>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	// Aucun script spécifique ici
</script>

<style scoped lang="scss">
	.section {
		height: 100vh;
		border-bottom: 1px solid #ddd;
		overflow: visible;
		/* Pas d’overflow caché, ni de height forcé à 100% ici */
	}

	.sticky {
		@include test; // votre mixin (bordure rouge)
		position: sticky;
		top: 0;
		height: 500px;
		background-color: rgba(0, 0, 0, 0.03);
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 2rem;
	}
</style>
