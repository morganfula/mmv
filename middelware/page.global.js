// middleware/lenis.ts
export default defineNuxtRouteMiddleware((to, from) => {
	// Stopper Lenis avant de quitter la page
	from.meta.pageTransition.onLeave = (_el, done) => {
		general.scrollLenis.stop();
		done();
	};

	// Relancer Lenis **seulement** une fois que la page est FULLY loaded
	to.meta.pageTransition.onEnter = (_el, done) => {
		const restartLenis = () => {
			general.scrollLenis.start();
			done();
		};

		if (document.readyState === 'complete') {
			// Déjà chargé
			restartLenis();
		} else {
			// Attendre l’événement load
			window.addEventListener('load', restartLenis, { once: true });
		}
	};
});
