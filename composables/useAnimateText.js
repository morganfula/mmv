export function useAnimateText(el) {
	const element = typeof el === 'string' ? document.querySelector(el) : el;

	const tl = gsap.timeline();

	if (element) {
		tl.from(element, {
			// opacity: 0,
			y: 130,
			duration: 0.6,
			delay: 1,
			ease: 'power4.out',
		});
	}

	return tl;
}
