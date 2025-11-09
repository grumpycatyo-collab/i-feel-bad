import { animate } from 'motion';
import { isFirstVisit } from './visitor';
import { showWelcome } from './welcome';

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

		// Change text every 4 seconds
		setInterval(updateText, 4000);
	}

	// Check if first visit and show welcome or start normal rotation
	if (firstVisit) {
		showWelcome(textDisplay, startNormalRotation);
	} else {
		startNormalRotation();
	}
}