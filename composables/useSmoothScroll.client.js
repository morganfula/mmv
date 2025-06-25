import Lenis from 'lenis';

export const useSmoothScroll = () => {
	general.scrollLenis = new Lenis({
		duration: 1.2,
		// orientation: 'vertical',
		// gestureOrientation: 'vertical',
		smoothWheel: true,
		// easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	});

	general.scrollLenis.on('scroll', ScrollTrigger.update);

	gsap.ticker.add(time => {
		general.scrollLenis.raf(time * 1000);
	});

	gsap.ticker.lagSmoothing(0);
	general.scrollLenis.scrollTo(0);
};
