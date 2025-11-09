export function initTextRotation(sentences) {
	let currentIndex = 0;
	const textDisplay = document.getElementById('text-display');

	function updateText() {
		if (textDisplay) {
			// Fade out
			textDisplay.style.opacity = '0';

			// Wait for fade out to complete, then change text
			setTimeout(() => {
				textDisplay.textContent = sentences[currentIndex];
				currentIndex = (currentIndex + 1) % sentences.length;

				// Fade in
				textDisplay.style.opacity = '1';
			}, 1000); // Match the CSS transition duration
		}
	}

	// Display first sentence immediately
	if (textDisplay) {
		textDisplay.textContent = sentences[currentIndex];
		currentIndex = (currentIndex + 1) % sentences.length;
	}

	// Change text every 2 seconds
	setInterval(updateText, 2000);
}