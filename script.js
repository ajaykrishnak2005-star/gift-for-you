document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const proposalPage = document.getElementById('proposal-page');
    const happyPage = document.getElementById('happy-page');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const errorPopup = document.getElementById('error-popup');
    const closePopupBtn = document.getElementById('close-popup');
    const bgMusic = document.getElementById('bg-music');
    const typingTextElement = document.getElementById('typing-text');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const heartsContainer = document.querySelector('.hearts-container');

    // --- Background Hearts Generation ---
    function createHearts() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️'; // Or use SVG
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 7 + 's'; // 7-10s
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';

        heartsContainer.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    setInterval(createHearts, 500); // Add a new heart every 500ms


    // --- "No" Button Interaction ---

    // --- "No" Button Interaction ---
    // (Button no longer moves, just shows popup)

    noBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default if it was a form
        errorPopup.classList.remove('hidden');
    });

    closePopupBtn.addEventListener('click', () => {
        errorPopup.classList.add('hidden');
        // Retrieve button to original place or move it again slightly
        noBtn.style.position = 'static'; // Reset to flow
        // Or keep it moving: moveButton();
    });


    // --- "Yes" Button Interaction ---
    yesBtn.addEventListener('click', () => {
        // Transition
        proposalPage.classList.add('hidden');
        happyPage.classList.remove('hidden');

        // Play Music
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Audio play failed (user interaction needed usually):", e));

        // Start Animations
        startConfetti();
        typeWriter();
        startTimer();
    });

    // --- Typing Effect ---
    const message = "";
    let i = 0;
    function typeWriter() {
        if (i < message.length) {
            typingTextElement.innerHTML += message.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        }
    }

    // --- Love Timer ---
    function startTimer() {
        // Set a start date (Example: Jan 1, 2023) - You can change this
        const startDate = new Date("2023-01-01T00:00:00").getTime();

        setInterval(() => {
            const now = new Date().getTime();
            const distance = now - startDate;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("timer").innerHTML =
                `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }

    // --- Confetti Logic (Simple Canvas Implementation) ---
    function startConfetti() {
        if (!confettiCanvas) return;
        const ctx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;

        const pieces = [];
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ff4d6d', '#ff8fa3'];

        function createPiece() {
            return {
                x: Math.random() * confettiCanvas.width,
                y: -10,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 10 + 5,
                speedY: Math.random() * 3 + 2,
                speedX: Math.random() * 2 - 1,
                rotation: Math.random() * 360
            };
        }

        // Initialize some pieces
        for (let j = 0; j < 150; j++) { // Increased particle count
            pieces.push(createPiece());
        }

        function draw() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

            pieces.forEach((p, index) => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();

                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += 5;

                // Reset piece if it falls off screen
                if (p.y > confettiCanvas.height) {
                    pieces[index] = createPiece();
                }
            });

            requestAnimationFrame(draw);
        }

        draw();
    }

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    });

    // Close Popup Logic - Move Button Away
    closePopupBtn.addEventListener('click', () => {
        errorPopup.classList.add('hidden');
    });

});
