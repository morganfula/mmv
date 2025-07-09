export default defineNuxtPlugin(() => {
	const router = useRouter();

	router.afterEach(() => {
		if (general.isNavOpen) {
			general.isNavOpen = false;
			toggleMenu(false);
		}
	});
});
