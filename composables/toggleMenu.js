import gsap from 'gsap';

let tl = null;
let targets = null;

function buildTimeline() {
	const burger = document.querySelector('.burger');
	const line1 = document.querySelector('.burger__line1');
	const line2 = document.querySelector('.burger__line2');
	const navWrap = document.querySelector('.nav__wrap');

	if (!burger || !line1 || !line2 || !navWrap) return null;

	// mémoriser les cibles pour vérification ultérieure
	targets = { burger, line1, line2, navWrap };

	// État initial (fermé)
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

	const timeline = gsap.timeline({
		paused: true,
		defaults: { duration: 0.28, ease: 'power2.inOut' },
		onReverseComplete: () => {
			// Retour à l’état fermé propre
			if (!targets) return;
			gsap.set([targets.line1, targets.line2], { clearProps: 'transform' });
			gsap.set([targets.line1, targets.line2], {
				yPercent: -50,
				rotation: 0,
				force3D: true,
				transformOrigin: '50% 50%',
			});
			gsap.set(targets.line1, { y: -8 });
			gsap.set(targets.line2, { y: 8 });
			gsap.set(targets.navWrap, {
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

	// Ouverture du panneau
	timeline
		.set(navWrap, { autoAlpha: 1, pointerEvents: 'auto' }, 0)
		.to(navWrap, { clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)' }, 0)
		// si tu as des items: .nav__item → fade in/stagger
		.fromTo(
			'.nav__item',
			{ opacity: 0 },
			{ opacity: 1, duration: 0.2, stagger: 0.03 },
			0.05
		);

	return timeline;
}

// Vérifie si les cibles existent encore dans le DOM (sinon rebuild)
function timelineIsStale() {
	if (!tl || !targets) return true;
	const { burger, line1, line2, navWrap } = targets;
	const inDoc = el => el && el.ownerDocument && el.ownerDocument.contains(el);
	return !(inDoc(burger) && inDoc(line1) && inDoc(line2) && inDoc(navWrap));
}

export async function toggleMenu(isOpen) {
	if (typeof window === 'undefined') return;

	// (Re)construction si besoin (premier appel / cibles détachées / remount)
	if (!tl || timelineIsStale()) {
		tl && tl.kill();
		tl = null;
		targets = null;

		// attendre un tick si le DOM n’est pas encore prêt
		await Promise.resolve();
		tl = buildTimeline();
		if (!tl) return;
	}

	if (isOpen) {
		tl.play();
	} else {
		tl.reverse();
	}
}

// Permet de “vider” la timeline (appelé au changement de page)
export function resetMenuAnimation() {
	try {
		tl && tl.kill();
	} catch {}
	tl = null;
	targets = null;
}
