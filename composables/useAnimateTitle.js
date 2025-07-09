import gsap from 'gsap';
import 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Simple animation de révélation de l’élément `el`.
 */
export function animateTitleChars(el) {
	return gsap.from(el, {
		y: 140,
		// opacity: 0,
		delay: 0.6,
		duration: 1.3,
		ease: 'power4.out',
	});
}
