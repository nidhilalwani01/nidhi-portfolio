const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const yearEl = document.querySelector('#year');

if (yearEl) {
	yearEl.textContent = new Date().getFullYear();
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
