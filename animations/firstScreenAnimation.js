export function firstScreenAnimation({ parent }) {
	const parentEl = document.querySelector(parent);
	const header = parentEl.querySelector('.header');
	const title = parentEl.querySelector('.default-title');
	const video = parentEl.querySelector('.video');

	const tl = gsap.timeline();

	tl.from(title, {
		yPercent: 100,
		opacity: 0,
		ease: 'power3.inOut',
		clearProps: 'all',
	});

	tl.from(header, {
		yPercent: -150,
		ease: 'power3.inOut',
		clearProps: 'all',
	});
}
