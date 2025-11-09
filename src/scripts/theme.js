export function initTheme() {
	const theme = localStorage.getItem('theme') || 'light';
	document.body.setAttribute('data-theme', theme);
	updateThemeIcon(theme);
}

export function toggleTheme() {
	const currentTheme = document.body.getAttribute('data-theme');
	const newTheme = currentTheme === 'light' ? 'dark' : 'light';

	document.body.setAttribute('data-theme', newTheme);
	localStorage.setItem('theme', newTheme);
	updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
	const sunIcon = document.querySelector('.sun-icon');
	const moonIcon = document.querySelector('.moon-icon');

	if (sunIcon && moonIcon) {
		if (theme === 'light') {
			sunIcon.style.display = 'none';
			moonIcon.style.display = 'block';
		} else {
			sunIcon.style.display = 'block';
			moonIcon.style.display = 'none';
		}
	}
}
