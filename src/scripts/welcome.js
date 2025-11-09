import { animate } from 'motion';

export async function showWelcome(textDisplay, onComplete) {
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

	// Call completion callback
	if (onComplete) {
		onComplete();
	}
}
