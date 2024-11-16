let aura = document.querySelector(".aura");
let cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  cursor.style.left = x + "px";
  cursor.style.top = y + "px";

  aura.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%)`;
});

document.addEventListener("mousedown", () => {
  cursor.classList.add("cursorinnerhover");
});

document.addEventListener("mouseup", () => {
  cursor.classList.remove("cursorinnerhover");
});

document.addEventListener("mouseover", (e) => {
  cursor.classList.remove("hidden");
  aura.classList.remove("hidden");

  if (e.target.classList.contains("active-button")) {
    cursor.classList.add("active");
    aura.classList.add("active");
  }
});

document.addEventListener("mouseout", (e) => {
  cursor.classList.add("hidden");
  aura.classList.add("hidden");

  if (e.target.classList.contains("active-button")) {
    cursor.classList.remove("active");
    aura.classList.remove("active");
  }
});
