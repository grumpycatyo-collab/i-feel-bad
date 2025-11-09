import { animate } from 'motion';

// Source - https://stackoverflow.com/questions/49304457/check-if-it-is-user-is-visiting-first-time-with-javascript
// Posted by Peter B
// Retrieved 2025-11-09, License - CC BY-SA 3.0

function setCookie(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) {
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1) {
		c_value = null;
	} else {
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1) {
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start, c_end));
	}
	return c_value;
}

export function isFirstVisit() {
	var visited = getCookie("visited");
	if (visited === "yes") {
		return false; // Not first visit
	} else {
		setCookie("visited", "yes", 365); // Expire in 1 year
		return true; // First visit
	}
}

export function initTextRotation(sentences) {
	let currentIndex = 0;
	const textDisplay = document.getElementById('text-display');
	const firstVisit = isFirstVisit();

	async function updateText() {
		if (textDisplay) {
			// Animate fade out
			await animate(
				textDisplay,
				{
					opacity: 0
				},
				{
					duration: 0.5,
					easing: 'ease-in-out'
				}
			).finished;

			// Change text with HTML (supports <em> tags from markdown)
			textDisplay.innerHTML = sentences[currentIndex];
			currentIndex = (currentIndex + 1) % sentences.length;

			// Animate fade in
			await animate(
				textDisplay,
				{
					opacity: 1
				},
				{
					duration: 0.5,
					easing: 'ease-in-out'
				}
			).finished;
		}
	}

	async function showWelcome() {
		if (!textDisplay) return;

		// Random greeting
		const greetings = ['buddy', 'pal', 'friend'];
		const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

		// Show first welcome message
		textDisplay.innerHTML = `<em>Hello ${randomGreeting}!</em>`;
		await animate(
			textDisplay,
			{
				opacity: [0, 1]
			},
			{
				duration: 0.5,
				easing: 'ease-in-out'
			}
		).finished;

		// Wait 2 seconds
		await new Promise(resolve => setTimeout(resolve, 2000));

		// Fade out first message
		await animate(
			textDisplay,
			{
				opacity: 0
			},
			{
				duration: 0.5,
				easing: 'ease-in-out'
			}
		).finished;

		// Show second welcome message
		textDisplay.innerHTML = '<em>Been tough, huh?</em>';
		await animate(
			textDisplay,
			{
				opacity: 1
			},
			{
				duration: 0.5,
				easing: 'ease-in-out'
			}
		).finished;

		// Wait 5 seconds (longer pause)
		await new Promise(resolve => setTimeout(resolve, 5000));

		// Fade out second message
		await animate(
			textDisplay,
			{
				opacity: 0
			},
			{
				duration: 0.5,
				easing: 'ease-in-out'
			}
		).finished;

		// Start normal rotation
		startNormalRotation();
	}

	function startNormalRotation() {
		if (!textDisplay) return;

		// Display first sentence
		textDisplay.innerHTML = sentences[currentIndex];
		currentIndex = (currentIndex + 1) % sentences.length;

		// Fade in first sentence
		animate(
			textDisplay,
			{
				opacity: [0, 1]
			},
			{
				duration: 0.5,
				easing: 'ease-in-out'
			}
		);

		// Change text every 2 seconds
		setInterval(updateText, 4000);
	}

	// Check if first visit and show welcome or start normal rotation
	if (firstVisit) {
		showWelcome();
	} else {
		startNormalRotation();
	}
}