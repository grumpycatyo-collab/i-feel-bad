import { animate } from 'motion';

export function initTextRotation(sentences) {
	let currentIndex = 0;
	const textDisplay = document.getElementById('text-display');

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

			// Change text
			textDisplay.textContent = sentences[currentIndex];
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

	// Display first sentence immediately with entrance animation
	if (textDisplay) {
		textDisplay.textContent = sentences[currentIndex];
		currentIndex = (currentIndex + 1) % sentences.length;

		// Initial entrance animation
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
	}

	// Change text every 2 seconds
	setInterval(updateText, 2000);
}