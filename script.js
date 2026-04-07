// Dark mode toggle
const themeToggle = document.querySelector('#themeToggle');
const htmlElement = document.documentElement;
const THEME_KEY = 'theme-preference';

// Load theme preference from localStorage or system preference
const loadTheme = () => {
	const saved = localStorage.getItem(THEME_KEY);
	if (saved) {
		return saved;
	}
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme
const applyTheme = (theme) => {
	if (theme === 'dark') {
		htmlElement.classList.add('dark-mode');
		themeToggle.setAttribute('aria-pressed', 'true');
	} else {
		htmlElement.classList.remove('dark-mode');
		themeToggle.setAttribute('aria-pressed', 'false');
	}
	localStorage.setItem(THEME_KEY, theme);
};

// Initialize theme on page load
const currentTheme = loadTheme();
applyTheme(currentTheme);

// Toggle theme on button click
if (themeToggle) {
	themeToggle.addEventListener('click', () => {
		const isDark = htmlElement.classList.contains('dark-mode');
		applyTheme(isDark ? 'light' : 'dark');
	});
}

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
