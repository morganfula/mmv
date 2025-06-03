export function firstScreenAnimation({ parent }) {
	const parentEl = document.querySelector(parent);
	const header = parentEl.querySelector('.header');
	const title = parentEl.querySelector('.default-title');
	const video = parentEl.querySelector('.video');

	console.log(video);

	const tl = gsap.timeline();

	tl.from(video, {
		scale: 1.4,
		clearProps: 'all',
		transformOrigin: 'center center',
		ease: 'power3.inOut',
		duration: 1.3,
	});

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
