// export default defineNuxtPlugin(() => {
// 	const router = useRouter();

// 	router.afterEach(() => {
// 		if (general.isNavOpen) {
// 			general.isNavOpen = false;
// 			toggleMenu(false);
// 		}
// 	});
// });

// plugins/close-nav.client.js
import { general } from '@/store';
import { toggleMenu } from '~/composables/toggleMenu'; // <<< important

export default defineNuxtPlugin(() => {
	const router = useRouter();

	router.afterEach(() => {
		if (general.isNavOpen) {
			general.isNavOpen = false;
			toggleMenu(false); // referme l’anim du burger proprement
		}
	});
});
