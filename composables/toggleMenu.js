import gsap from 'gsap';

let tl = null;

function buildTimeline() {
	const burger = document.querySelector('.burger');
	const line1 = document.querySelector('.burger__line1');
	const line2 = document.querySelector('.burger__line2');
	const navWrap = document.querySelector('.nav__wrap');
	const navItemsSel = '.nav__item';

	if (!burger || !line1 || !line2 || !navWrap) return null;

	// ÉTATS INITIAUX (fermé)
	gsap.set([line1, line2], {
		yPercent: -50,
		rotation: 0,
		force3D: true,
		transformOrigin: '50% 50%',
	});
	// Décalage vertical pour avoir deux barres parallèles
	gsap.set(line1, { y: -8 });
	gsap.set(line2, { y: 8 });

	gsap.set(navWrap, {
		autoAlpha: 0,
		pointerEvents: 'none',
		clipPath: 'polygon(0% 0%,100% 0%,100% 0%,0% 0%)',
	});
	gsap.set(burger, { clearProps: 'pointerEvents,scaleY' }); // ne fige pas le bouton

	const timeline = gsap.timeline({
		paused: true,
		defaults: { duration: 0.28, ease: 'power2.inOut' },
		onReverseComplete: () => {
			// Remet l’état fermé propre
			gsap.set([line1, line2], { clearProps: 'transform' });
			gsap.set([line1, line2], {
				yPercent: -50,
				rotation: 0,
				force3D: true,
				transformOrigin: '50% 50%',
			});
			gsap.set(line1, { y: -8 });
			gsap.set(line2, { y: 8 });
			gsap.set(navWrap, {
				autoAlpha: 0,
				pointerEvents: 'none',
				clipPath: 'polygon(0% 0%,100% 0%,100% 0%,0% 0%)',
			});
		},
	});

	// Burger → croix
	timeline
		.to(line1, { y: 0, rotation: 45 }, 0)
		.to(line2, { y: 0, rotation: -45 }, 0);

	// Nav visible + items
	timeline
		.set(navWrap, { autoAlpha: 1, pointerEvents: 'auto' }, 0)
		.to(navWrap, { clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)' }, 0)
		.fromTo(
			navItemsSel,
			{ opacity: 0 },
			{ opacity: 1, duration: 0.2, stagger: 0.03 },
			0.05
		);

	return timeline;
}

export async function toggleMenu(isOpen) {
	if (typeof window === 'undefined') return;

	// (Re)crée la timeline si absente (ou remount/HMR)
	if (!tl) {
		tl = buildTimeline();
		if (!tl) {
			// DOM pas prêt → attend un tick et réessaye
			await Promise.resolve();
			tl = buildTimeline();
			if (!tl) return;
		}
	}

	// JAMAIS bloquer le bouton si l’anim ne part pas
	// (donc pas de pointerEvents: 'none' global)

	if (isOpen) {
		tl.play();
	} else {
		tl.reverse();
	}
}
