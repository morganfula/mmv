import gsap from 'gsap';

let tl;

export function toggleMenu(isOpen) {
	// Initialize timeline only once
	if (!tl) {
		const clearStyles = () => {
			gsap.set('.burger', {
				clearProps: 'all',
			});
		};

		tl = gsap.timeline({
			paused: true,
			onComplete: () => clearStyles(),
			onReverseComplete: () => clearStyles(),
		});

		// Burger animation
		tl.to(['.burger__line1', '.burger__line2'], {
			rotate: i => (i ? -20 : 20),
			yPercent: -50,
			y: 0,
			duration: 0.2,
		});

		// Show navigation
		tl.set('.nav__wrap', {
			autoAlpha: 1,
			pointerEvents: 'auto',
		});

		// Animate nav items
		tl.fromTo(
			'.nav__item',
			{
				opacity: 0,
			},
			{
				opacity: 1,
				stagger: 0.1,
				duration: 0.3,
			}
		);

		// Animate nav background
		tl.fromTo(
			'.nav__wrap',
			{
				clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
			},
			{
				clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
				duration: 0.4,
			},
			'<'
		);
	}

	// Set burger initial state
	if (isOpen) {
		gsap.set('.burger', {
			pointerEvents: 'none',
			scaleY: 0.8,
		});
		tl.play();
	} else {
		tl.reverse();
	}
}
