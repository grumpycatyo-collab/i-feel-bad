export function initTextRotation(sentences) {
	let currentIndex = 0;
	const textDisplay = document.getElementById('text-display');

	function updateText() {
		if (textDisplay) {
			textDisplay.textContent = sentences[currentIndex];
			currentIndex = (currentIndex + 1) % sentences.length;
		}
	}

	// Display first sentence immediately
	updateText();

	// Change text every 3 seconds
	setInterval(updateText, 3000);
}