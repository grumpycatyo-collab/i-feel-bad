document.addEventListener('DOMContentLoaded', function() {
    const messages = [
        "You are enough.",
        "Take a deep breath. You've got this.",
        "Good job for today.",
        "Had a rough day? I know you did great, man.",
        "You're exactly where you need to be right now.",
        "Every small step counts. Be proud of yours.",
        "Your presence matters more than you know.",
        "It's okay to rest; you deserve it.",
        "You are stronger than you think.",
        "This moment is yours. Embrace it.",
        "Be gentle with yourself today.",
        "Your journey is uniquely beautiful.",
        "Peace begins with you.",
        "Slow down. Notice the little joys.",
        "Your effort is seen, even when progress feels slow."
    ];

    const messageElement = document.getElementById('message');
    const messageContainer = document.getElementById('messageContainer');
    const timerElement = document.getElementById('timer');
    
    let currentMessageIndex = Math.floor(Math.random() * messages.length);
    let intervalId;
    let timerInterval;
    let startTime = Date.now();
    let minutesCount = 0;
    
    // Initialize first message
    messageElement.textContent = messages[currentMessageIndex];
    
    // Function to change message with fade effect
    function changeMessage() {
        messageElement.classList.add('fade');
        
        setTimeout(() => {
            currentMessageIndex = (currentMessageIndex + 1) % messages.length;
            messageElement.textContent = messages[currentMessageIndex];
            messageElement.classList.remove('fade');
        }, 500);
    }
    
    // Start message rotation (every 2 minutes)
    function startMessageRotation() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(changeMessage, 120000);
    }
    
    // Update timer
    function updateTimer() {
        const elapsedMinutes = Math.floor((Date.now() - startTime) / 60000);
        
        if (elapsedMinutes !== minutesCount) {
            minutesCount = elapsedMinutes;
            const minuteText = minutesCount === 1 ? 'minute' : 'minutes';
            timerElement.textContent = `you've been here for ${minutesCount} ${minuteText}`;
        }
    }
    
    // Click to change message
    messageContainer.addEventListener('click', function() {
        changeMessage();
        // Reset the interval after manual change
        startMessageRotation();
    });
    
    // Handle visibility changes (tab switching)
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            startTime = Date.now() - (minutesCount * 60000);
            startMessageRotation();
            timerInterval = setInterval(updateTimer, 1000);
        } else {
            clearInterval(intervalId);
            clearInterval(timerInterval);
        }
    });
    
    // Initialize timers
    startMessageRotation();
    timerInterval = setInterval(updateTimer, 1000);
    
    // Shuffle array function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Shuffle messages for more random experience
    shuffleArray(messages);
});