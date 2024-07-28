const body = document.body;
const scrollContainer = document.querySelector('main');

// Scroll position
let sx = 0;
let sy = 0;

// Container position
let dx = sx;
let dy = sy;

body.style.height = scrollContainer.clientHeight + 'px';

scrollContainer.style.position = 'fixed';
scrollContainer.style.top = 0;
scrollContainer.style.left = 0;

const scrollUpdate = () => {
	sx = window.screenX;
	sy = window.scrollY;
};

window.addEventListener('scroll', scrollUpdate);

const renderScroll = () => {
	// Scroll speed
	dx = lerp(dx, sx, 0.07);
	dy = lerp(dy, sy, 0.07);

	dx = Math.floor(dx * 100) / 100;
	dy = Math.floor(dy * 100) / 100;

	scrollContainer.style.transform = `translate(-${dx}px, -${dy}px)`;

	window.requestAnimationFrame(renderScroll);
};

const lerp = (a, b, n) => {
	return (1 - n) * a + n * b;
};

window.requestAnimationFrame(renderScroll);
