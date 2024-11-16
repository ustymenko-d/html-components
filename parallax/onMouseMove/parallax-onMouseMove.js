const parallax = document.querySelector(".parallax");
const paralaxLayers = document.querySelectorAll(".parallax__layer");

// Animation speed
const speed = 0.05;

let positionX = 0,
  positionY = 0;
let coordXprocent = 0,
  coordYprocent = 0;

const handleParallax = () => {
  const distX = coordXprocent - positionX;
  const distY = coordYprocent - positionY;

  positionX = positionX + distX * speed;
  positionY = positionY + distY * speed;

  paralaxLayers.forEach((layer) => {
    let coef = layer.dataset.parallaxCoef;

    if (layer.dataset.parallaxInverted) {
      coef *= -1;
    }

    layer.style.cssText = `transform: translate(${positionX / coef}%,${
      positionY / coef
    }%);`;
  });

  requestAnimationFrame(handleParallax);
};

handleParallax();

parallax.addEventListener("mousemove", (e) => {
  const parallaxWidth = parallax.offsetWidth;
  const parallaxHeight = parallax.offsetHeight;

  const coordX = e.pageX - parallaxWidth / 2;
  const coordY = e.pageY - parallaxHeight / 2;

  coordXprocent = (coordX / parallaxWidth) * 100;
  coordYprocent = (coordY / parallaxHeight) * 100;
});
