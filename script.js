
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let particles = [];
let animationRunning = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createConfetti() {

    const colors = [
        "#d47d92",
        "#e7bd68",
        "#fff0d6",
        "#b65e79",
        "#f2c6d0",
        "#ffffff"
    ];

    for (let i = 0; i < 180; i++) {

        particles.push({
            x: Math.random() * canvas.width,
            y: -Math.random() * canvas.height,
            size: Math.random() * 8 + 3,
            speedY: Math.random() * 4 + 2,
            speedX: Math.random() * 4 - 2,
            rotation: Math.random() * 360,
            color: colors[
                Math.floor(Math.random() * colors.length)
            ]
        });

    }
}

function drawConfetti() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {

        ctx.save();

        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);

        ctx.fillStyle = particle.color;

        ctx.fillRect(
            -particle.size / 2,
            -particle.size / 2,
            particle.size,
            particle.size
        );

        ctx.restore();

        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.rotation += 0.05;

    });

    particles = particles.filter(
        particle => particle.y < canvas.height + 20
    );

    if (particles.length > 0) {
        requestAnimationFrame(drawConfetti);
    } else {
        animationRunning = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

}

function celebrate() {

    if (animationRunning) return;

    particles = [];
    createConfetti();

    animationRunning = true;
    drawConfetti();

}

// Small celebration when the page loads
window.addEventListener("load", () => {
    setTimeout(celebrate, 700);
});
