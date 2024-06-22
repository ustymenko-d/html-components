const modalButton = document.querySelector("#modal-btn");
const modalWindow = document.querySelector("#modal");
const modalCloseButton = modalWindow.querySelector(".close-btn");

// Backdrop close
const handleBackdropClick = (e) => {
  const modalRect = modalWindow.getBoundingClientRect();

  if (
    e.clientX < modalRect.left ||
    e.clientX > modalRect.right ||
    e.clientY < modalRect.top ||
    e.clientY > modalRect.bottom
  ) {
    modalWindow.classList.add("hide");
    modalWindow.addEventListener("animationend", onAnimationEnd);
  }
};

modalWindow.addEventListener("click", handleBackdropClick);
// ==============

// Animation
const onAnimationEnd = () => {
  modalWindow.classList.remove("hide");
  modalWindow.close();
  modalWindow.removeEventListener("animationend", onAnimationEnd);
};
// =========

modalButton.addEventListener("click", () => modalWindow.showModal());
modalCloseButton.addEventListener("click", () => {
  modalWindow.classList.add("hide");
  modalWindow.addEventListener("animationend", onAnimationEnd);
});

const popUpButton = document.querySelector("#pop-up-btn");
const popUpWindow = document.querySelector("#pop-up");
const popUpCloseButton = popUpWindow.querySelector(".close-btn");

popUpButton.addEventListener("click", () => popUpWindow.show());
popUpCloseButton.addEventListener("click", () => popUpWindow.close());
