<script setup lang="ts">
	import type { Content } from '@prismicio/client';
	import { ref, onMounted, onUnmounted } from 'vue';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	const route = useRoute();
	const prismic = usePrismic();

	const { data: page } = useAsyncData('[clients]', () =>
		prismic.client.getSingle('clients')
	);

	// The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
	defineProps(
		getSliceComponentProps<Content.ClientsBlockSlice>([
			'slice',
			'index',
			'slices',
			'context',
		])
	);

	const sectionRef = ref<HTMLElement | null>(null);
	const titleRef = ref<HTMLElement | null>(null);
	const marqueeRef = ref<HTMLElement | null>(null);
	const marqueeContent = ref<HTMLElement[]>([]);

	let marqueeAnimation: gsap.core.Tween | null = null;
	let scrollTriggerInstance: ScrollTrigger | null = null;
	let requestId: number | null = null;

	// Animation state
	const state = {
		baseSpeed: 0.6, // Much slower base speed
		currentSpeed: 0, // Start from stopped
		targetSpeed: 0, // Start with no target speed
		hoveredCardsCount: 0,
		isDragging: false,
		dragStartX: 0,
		dragCurrentX: 0,
		dragOffset: 0,
		lastDragTime: 0,
		dragVelocity: 0,
	};

	const lerp = (start: number, end: number, factor: number) => {
		return start + (end - start) * factor;
	};

	const initMarquee = () => {
		if (!marqueeRef.value || !marqueeContent.value.length) return;

		// Calculate the width needed for seamless loop
		const marqueeWidth = marqueeContent.value[0].offsetWidth;

		// Set up infinite marquee animation with consistent base speed
		marqueeAnimation = gsap.to(marqueeContent.value, {
			x: -marqueeWidth,
			duration: 20, // Base duration for consistent speed
			ease: 'none',
			repeat: -1,
			paused: false,
		});

		// Initialize scroll-based speed control
		initScrollSpeedControl();
	};

	const updateTargetSpeed = () => {
		if (state.isDragging || state.hoveredCardsCount > 0) {
			// Stop completely when dragging or when any card is hovered
			state.targetSpeed = 0;
		} else {
			// Maintain constant base speed
			state.targetSpeed = state.baseSpeed;
		}
	};

	const initScrollSpeedControl = () => {
		if (!sectionRef.value) return;

		// Start the animation loop (no scroll trigger needed for constant speed)
		animateMarquee();
	};

	const animateMarquee = () => {
		// Handle dragging
		if (state.isDragging && marqueeAnimation) {
			// Apply drag offset directly to the animation progress
			const progress = marqueeAnimation.progress();
			const newProgress = progress + state.dragOffset * 0.001;
			marqueeAnimation.progress(newProgress);
			state.dragOffset = 0; // Reset offset after applying
		} else {
			// Normal speed-based animation when not dragging
			const lerpFactor = state.currentSpeed < 0.05 ? 0.06 : 0.12;
			state.currentSpeed = lerp(
				state.currentSpeed,
				state.targetSpeed,
				lerpFactor
			);

			// Apply speed to the animation
			if (marqueeAnimation) {
				marqueeAnimation.timeScale(state.currentSpeed);
			}
		}

		requestId = requestAnimationFrame(animateMarquee);
	};

	const handleCardMouseEnter = () => {
		state.hoveredCardsCount++;
		state.targetSpeed = 0; // Immediately stop
	};

	const handleCardMouseLeave = () => {
		state.hoveredCardsCount = Math.max(0, state.hoveredCardsCount - 1);
		if (state.hoveredCardsCount === 0 && !state.isDragging) {
			// Resume with base speed when no cards are hovered and not dragging
			state.targetSpeed = state.baseSpeed;
		}
	};

	// Drag handlers
	const handleDragStart = (clientX: number) => {
		state.isDragging = true;
		state.dragStartX = clientX;
		state.dragCurrentX = clientX;
		state.lastDragTime = Date.now();
		state.dragVelocity = 0;
		updateTargetSpeed();

		// Add cursor style
		if (marqueeRef.value) {
			marqueeRef.value.style.cursor = 'grabbing';
		}
	};

	const handleDragMove = (clientX: number) => {
		if (!state.isDragging) return;

		const now = Date.now();
		const deltaTime = now - state.lastDragTime;
		const deltaX = clientX - state.dragCurrentX;

		// Calculate velocity for momentum
		if (deltaTime > 0) {
			state.dragVelocity = deltaX / deltaTime;
		}

		// Update drag offset
		state.dragOffset = deltaX;
		state.dragCurrentX = clientX;
		state.lastDragTime = now;
	};

	const handleDragEnd = () => {
		if (!state.isDragging) return;

		state.isDragging = false;

		// Reset cursor
		if (marqueeRef.value) {
			marqueeRef.value.style.cursor = 'grab';
		}

		// Resume animation if no cards are hovered
		if (state.hoveredCardsCount === 0) {
			state.targetSpeed = state.baseSpeed;
		}
	};

	// Mouse events
	const handleMouseDown = (e: MouseEvent) => {
		e.preventDefault();
		handleDragStart(e.clientX);
	};

	const handleMouseMove = (e: MouseEvent) => {
		handleDragMove(e.clientX);
	};

	const handleMouseUp = () => {
		handleDragEnd();
	};

	// Touch events
	const handleTouchStart = (e: TouchEvent) => {
		e.preventDefault();
		handleDragStart(e.touches[0].clientX);
	};

	const handleTouchMove = (e: TouchEvent) => {
		e.preventDefault();
		handleDragMove(e.touches[0].clientX);
	};

	const handleTouchEnd = () => {
		handleDragEnd();
	};

	onMounted(() => {
		if (!process.client) return;

		// Register plugins
		gsap.registerPlugin(ScrollTrigger);

		// Initial entrance animations
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.value,
				start: 'top 80%',
				toggleActions: 'play none none none',
			},
		});

		// Title animation
		tl.from(titleRef.value, {
			y: 50,
			opacity: 0,
			duration: 1.6,
			ease: 'power4.out',
		});

		// Marquee entrance
		tl.from(
			marqueeRef.value,
			{
				y: 30,
				opacity: 0,
				duration: 1.2,
				ease: 'power4.out',
			},
			'-=0.8'
		);

		// Initialize marquee after entrance animation completes
		tl.call(() => {
			// Reset speed to 0 and then initialize
			state.currentSpeed = 0;
			state.targetSpeed = 0;
			setTimeout(() => {
				initMarquee();
				// Add drag event listeners
				if (marqueeRef.value) {
					// Mouse events
					marqueeRef.value.addEventListener('mousedown', handleMouseDown);
					document.addEventListener('mousemove', handleMouseMove);
					document.addEventListener('mouseup', handleMouseUp);

					// Touch events
					marqueeRef.value.addEventListener('touchstart', handleTouchStart, {
						passive: false,
					});
					document.addEventListener('touchmove', handleTouchMove, {
						passive: false,
					});
					document.addEventListener('touchend', handleTouchEnd);

					// Set initial cursor
					marqueeRef.value.style.cursor = 'grab';
				}

				// Start the gentle acceleration after marquee is set up
				setTimeout(() => {
					state.targetSpeed = state.baseSpeed;
				}, 200);
			}, 100);
		});
	});

	onUnmounted(() => {
		// Cleanup
		if (marqueeAnimation) {
			marqueeAnimation.kill();
		}
		if (scrollTriggerInstance) {
			scrollTriggerInstance.kill();
		}
		if (requestId) {
			cancelAnimationFrame(requestId);
		}

		// Remove event listeners
		if (marqueeRef.value) {
			marqueeRef.value.removeEventListener('mousedown', handleMouseDown);
			marqueeRef.value.removeEventListener('touchstart', handleTouchStart);
		}
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
		document.removeEventListener('touchmove', handleTouchMove);
		document.removeEventListener('touchend', handleTouchEnd);

		ScrollTrigger.refresh();
	});
</script>

<template>
	<Bounded as="div">
		<section
			ref="sectionRef"
			:data-slice-type="slice.slice_type"
			:data-slice-variation="slice.variation">
			<h2
				class="big-title"
				ref="titleRef">
				{{ page?.data.title }}
			</h2>

			<div
				class="marquee"
				ref="marqueeRef">
				<!-- First pass -->
				<div
					class="cards marquee__content"
					:ref="el => (marqueeContent[0] = el as HTMLElement)">
					<PrismicLink
						v-for="(item, i) in page?.data.items"
						:key="i"
						class="card"
						:field="item.url"
						@mouseenter="handleCardMouseEnter"
						@mouseleave="handleCardMouseLeave">
						<div class="logo-wrap">
							<PrismicImage
								class="logo"
								:field="item.logo" />
						</div>
						<!-- <div class="name p1--black">{{ item.name }}</div> -->
						<div class="description-wrap">
							<div class="description">
								<PrismicRichText :field="item.description" />
							</div>
						</div>
					</PrismicLink>
				</div>

				<!-- Duplicate for infinite loop -->
				<div
					class="cards marquee__content"
					:ref="el => (marqueeContent[1] = el as HTMLElement)"
					aria-hidden="true">
					<PrismicLink
						v-for="(item, i) in page?.data.items"
						:key="`second-${i}`"
						class="card"
						:field="item.url"
						@mouseenter="handleCardMouseEnter"
						@mouseleave="handleCardMouseLeave">
						<div class="logo-wrap">
							<PrismicImage
								class="logo"
								:field="item.logo" />
						</div>
						<!-- <div class="name p1--black">{{ item.name }}</div> -->
						<div class="description-wrap">
							<div class="description">
								<PrismicRichText :field="item.description" />
							</div>
						</div>
					</PrismicLink>
				</div>
			</div>
		</section>
	</Bounded>
</template>

<style lang="scss" scoped>
	section {
		background-color: $color-white;
	}

	.dark-mode section {
		background-color: $color-dark;
		color: $color-white;
	}

	.big-title {
		padding: $default-gap 0;
	}

	.marquee {
		position: relative;
		display: flex;
		overflow: hidden;
		user-select: none;
		cursor: grab;
		mask-image: linear-gradient(
			to right,
			hsl(0 0% 0% / 0),
			hsl(0 0% 0% / 1) 10%,
			hsl(0 0% 0% / 1) 90%,
			hsl(0 0% 0% / 0)
		);
		will-change: transform;

		&:active {
			cursor: grabbing;
		}
	}

	.cards {
		display: flex;
		gap: $default-gap;
		flex-shrink: 0;
		min-width: 100%;
		margin-bottom: 48px;
		will-change: transform;

		@include media('<phone') {
			padding-top: $default-gap;
		}
	}

	.marquee__content {
		display: flex;
		gap: $default-gap;
		flex-shrink: 0;
		min-width: 100%;
		will-change: transform;
	}

	.card {
		height: 400px;
		width: 280px;
		display: flex;
		flex-direction: column;

		@include media('<phone') {
			height: 100%;
			width: 180px;
		}
	}

	.logo-wrap {
		margin-bottom: calc($default-gap / 2);
	}

	.logo {
		width: auto;
		max-width: 120px;
		height: 105px;
		object-fit: contain;

		@include media('<phone') {
			height: 120px;
		}
	}

	.dark-mode .logo {
		filter: invert(100%);
	}

	.name {
		margin-bottom: calc($default-gap / 2);

		@include media('<phone') {
			display: none;
		}
	}

	.description-wrap {
		position: relative;
		overflow: hidden;
		flex-grow: 1;

		@include media('<phone') {
			display: none;
		}
	}

	.description {
		transform: translateY(100%);
		font-size: 1vw;
		line-height: 1.1;
		color: $color-grey;
		transition: transform 0.3s ease;
		opacity: 0;
		transition: $default-transition;
	}

	.card:hover .description {
		transform: translateY(0);
		opacity: 1;
	}

	/* Performance optimizations */
	.marquee,
	.marquee__content,
	.cards {
		backface-visibility: hidden;
		perspective: 1000px;
	}
</style>
