// Soft glowing cursor effect
const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow) {
	let mouseX = 0;
	let mouseY = 0;
	let glowX = 0;
	let glowY = 0;

	document.addEventListener('mousemove', (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	// Smooth trailing animation loop
	const animateCursor = () => {
		// Lerp (linear interpolation) for smooth following
		glowX += (mouseX - glowX) * 0.15;
		glowY += (mouseY - glowY) * 0.15;

		// Position the glow centered on cursor coordinates
		cursorGlow.style.transform = `translate3d(${glowX - 20}px, ${glowY - 20}px, 0)`;

		requestAnimationFrame(animateCursor);
	};

	animateCursor();

	// Hide glow when leaving window
	document.addEventListener('mouseleave', () => {
		cursorGlow.style.opacity = '0';
	});

	document.addEventListener('mouseenter', () => {
		cursorGlow.style.opacity = '1';
	});
}

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const yearEl = document.querySelector('#year');

if (yearEl) {
	yearEl.textContent = new Date().getFullYear();
}

const revealTargets = document.querySelectorAll(
	'.section:not(.hero), .section:not(.hero) > .container, .project-card-link, .skill-category, .experience-role-card, .cert-item, .contact-shell, .about-layout, .experience-layout'
);

if (revealTargets.length) {
	revealTargets.forEach((element, index) => {
		element.classList.add('reveal-item');
		element.style.setProperty('--reveal-delay', `${Math.min(index * 55, 275)}ms`);
	});

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion || !('IntersectionObserver' in window)) {
		revealTargets.forEach((element) => {
			element.classList.add('is-visible');
		});
	} else {
		const revealObserver = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}

					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				});
			},
			{
				threshold: 0.12,
				rootMargin: '0px 0px -10% 0px'
			}
		);

		revealTargets.forEach((element) => revealObserver.observe(element));
	}
}

if (navToggle && siteNav) {
	navToggle.addEventListener('click', () => {
		const isOpen = siteNav.getAttribute('data-open') === 'true';
		siteNav.setAttribute('data-open', String(!isOpen));
		navToggle.setAttribute('aria-expanded', String(!isOpen));
	});

	document.addEventListener('click', (event) => {
		const isOpen = siteNav.getAttribute('data-open') === 'true';
		if (!isOpen) {
			return;
		}

		const target = event.target;
		if (!(target instanceof Node)) {
			return;
		}

		if (!siteNav.contains(target) && !navToggle.contains(target)) {
			siteNav.setAttribute('data-open', 'false');
			navToggle.setAttribute('aria-expanded', 'false');
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.key !== 'Escape') {
			return;
		}

		siteNav.setAttribute('data-open', 'false');
		navToggle.setAttribute('aria-expanded', 'false');
		navToggle.focus();
	});

	navLinks.forEach((link) => {
		link.addEventListener('click', () => {
			siteNav.setAttribute('data-open', 'false');
			navToggle.setAttribute('aria-expanded', 'false');
		});
	});
}

const projectTrack = document.querySelector('.project-track');
const projectGrid = document.querySelector('.project-grid');
const projectPrevButton = document.querySelector('.carousel-arrow[data-direction="prev"]');
const projectNextButton = document.querySelector('.carousel-arrow[data-direction="next"]');
const aboutSection = document.querySelector('#about');
const aboutAnimation = document.querySelector('.about-animation-dotlottie');
let aboutAnimationVisible = false;
let aboutAnimationHasPlayed = false;

const startAboutAnimation = () => {
	if (!aboutAnimation || aboutAnimationHasPlayed || !aboutAnimationVisible) {
		return;
	}

	aboutAnimationHasPlayed = true;
	aboutAnimation.dataset.played = 'true';
	aboutAnimation.setAttribute('autoplay', '');

	if (typeof aboutAnimation.play === 'function') {
		aboutAnimation.play();
	}
};

if (aboutAnimation) {
	aboutAnimation.removeAttribute('autoplay');
	aboutAnimation.pause?.();
	aboutAnimation.addEventListener('load', startAboutAnimation);
}

if (aboutSection && aboutAnimation) {
	if ('IntersectionObserver' in window) {
		const aboutObserver = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}

					aboutAnimationVisible = true;
					startAboutAnimation();
					observer.disconnect();
				});
			},
			{
				threshold: 0.45
			}
		);

		aboutObserver.observe(aboutSection);
	} else {
		aboutAnimationVisible = true;
		startAboutAnimation();
	}
}

if (projectTrack && projectGrid && projectPrevButton && projectNextButton) {
	const getScrollAmount = () => {
		const firstCard = projectGrid.querySelector('.project-card');
		if (!firstCard) {
			return Math.max(projectTrack.clientWidth * 0.85, 280);
		}

		const gapValue = window.getComputedStyle(projectGrid).gap;
		const gap = Number.parseFloat(gapValue) || 0;
		return firstCard.getBoundingClientRect().width + gap;
	};

	const updateCarouselArrows = () => {
		const maxScrollLeft = projectTrack.scrollWidth - projectTrack.clientWidth;
		projectPrevButton.disabled = projectTrack.scrollLeft <= 2;
		projectNextButton.disabled = projectTrack.scrollLeft >= maxScrollLeft - 2;
	};

	projectPrevButton.addEventListener('click', () => {
		projectTrack.scrollBy({
			left: -getScrollAmount(),
			behavior: 'smooth'
		});
	});

	projectNextButton.addEventListener('click', () => {
		projectTrack.scrollBy({
			left: getScrollAmount(),
			behavior: 'smooth'
		});
	});

	projectTrack.addEventListener('scroll', updateCarouselArrows, { passive: true });
	window.addEventListener('resize', updateCarouselArrows);
	updateCarouselArrows();

	// Click + Drag + Momentum scrolling
	let isDown = false;
	let startX = 0;
	let startScrollLeft = 0;
	let velocity = 0;
	let lastX = 0;
	let lastTime = 0;
	let momentumAnimationId = null;

	const startDrag = (e) => {
		isDown = true;
		startX = e.clientX || e.touches?.[0]?.clientX || 0;
		startScrollLeft = projectTrack.scrollLeft;
		lastX = startX;
		lastTime = Date.now();
		velocity = 0;

		// Cancel momentum animation if dragging while animating
		if (momentumAnimationId) {
			cancelAnimationFrame(momentumAnimationId);
			momentumAnimationId = null;
		}

		projectTrack.style.scrollBehavior = 'auto';
		projectTrack.style.cursor = 'grabbing';
	};

	const drag = (e) => {
		if (!isDown) return;

		const x = e.clientX || e.touches?.[0]?.clientX || 0;
		const walk = x - startX;
		const currentTime = Date.now();
		const timeDelta = currentTime - lastTime;

		if (timeDelta > 0) {
			velocity = (x - lastX) / timeDelta;
		}

		lastX = x;
		lastTime = currentTime;
		projectTrack.scrollLeft = startScrollLeft - walk;
	};

	const endDrag = () => {
		if (!isDown) return;

		isDown = false;
		projectTrack.style.cursor = 'grab';

		// Apply momentum scrolling
		if (Math.abs(velocity) > 0.1) {
			let currentVelocity = velocity;

			const applyMomentum = () => {
				if (Math.abs(currentVelocity) > 0.01) {
					projectTrack.scrollLeft -= currentVelocity * 16;
					currentVelocity *= 0.95; // Decelerate
					momentumAnimationId = requestAnimationFrame(applyMomentum);
				} else {
					projectTrack.style.scrollBehavior = 'smooth';
					momentumAnimationId = null;
				}
			};

			applyMomentum();
		} else {
			projectTrack.style.scrollBehavior = 'smooth';
		}
	};

	projectTrack.addEventListener('mousedown', startDrag);
	projectTrack.addEventListener('mousemove', drag);
	projectTrack.addEventListener('mouseup', endDrag);
	projectTrack.addEventListener('mouseleave', endDrag);

	// Touch support for mobile
	projectTrack.addEventListener('touchstart', startDrag);
	projectTrack.addEventListener('touchmove', drag);
	projectTrack.addEventListener('touchend', endDrag);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', (event) => {
		const targetId = anchor.getAttribute('href');
		if (!targetId || targetId.length < 2) {
			return;
		}

		const target = document.querySelector(targetId);
		if (!target) {
			return;
		}

		event.preventDefault();

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		target.scrollIntoView({
			behavior: prefersReducedMotion ? 'auto' : 'smooth',
			block: 'start'
		});

		// Move focus for better keyboard/screen reader navigation on in-page links.
		if (!target.hasAttribute('tabindex')) {
			target.setAttribute('tabindex', '-1');
		}
		target.focus({ preventScroll: true });
	});
});
