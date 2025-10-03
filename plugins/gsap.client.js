// export default defineNuxtPlugin(async () => {
// 	if (process.client) {
// 		gsap.registerPlugin(ScrollTrigger);
// 	}
// });

// plugins/gsap.client.js
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default defineNuxtPlugin(() => {
	if (process.client) {
		gsap.registerPlugin(ScrollTrigger);
		// Optionnel: exposer gsap si tu veux l’injecter ailleurs via useNuxtApp()
		return {
			provide: { gsap, ScrollTrigger },
		};
	}
});
