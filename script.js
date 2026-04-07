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
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	});
});
