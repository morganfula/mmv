import Lenis from 'Lenis';

export const useSmoothScroll = () => {
	general.scrollLenis = new Lenis({
		duration: 1.7,
		orientation: 'vertical',
		gestureOrientation: 'vertical',
		smoothWheel: true,
	});

	general.scrollLenis.on('scroll', ScrollTrigger.update);

	gsap.ticker.add(time => {
		general.scrollLenis.raf(time * 1000);
	});

	gsap.ticker.lagSmoothing(0);
	general.scrollLenis.stop();
	general.scrollLenis.scrollTo(0, { immediate: true });
};
