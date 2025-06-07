// smaller balls

document.addEventListener('scroll', () => {
const scrollY = window.scrollY;
const balls = document.querySelectorAll('.ball');

balls.forEach((ball, index) => {
const movement = (index % 2 === 0 ? 1 : -1) * (scrollY * 0.1);
ball.style.transform = `translateX(${movement}px)`;
});
});

// main blob

document.addEventListener("scroll", () => {
const scrollY = window.scrollY;
const foregroundBalls = document.querySelectorAll(".ball.front");
const backgroundBalls = document.querySelectorAll(".ball.back");

foregroundBalls.forEach(ball => {
ball.style.transform = `translateY(${scrollY * 0.2}px)`;
});

backgroundBalls.forEach(ball => {
ball.style.transform = `translateY(${scrollY * 0.05}px)`;
});
});

// end of section