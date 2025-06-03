import { reactive } from 'vue';

export const general = reactive({
	isPreloaderVisible: true,
	scrollLenis: null,
	isTransitionStart: true,
	isTransitionFinish: true,
	isNavOpen: false,

	headerTheme: 'light',
});
