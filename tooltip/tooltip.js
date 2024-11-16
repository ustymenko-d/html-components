const passElement = document.querySelector(".pass__label");
let tooltipIsOpen = false;

passElement.querySelector("input").addEventListener("focus", (e) => {
  if (tooltipIsOpen === false) {
    tooltipIsOpen = true;
    showTooltip(passElement);
  }
});

passElement.querySelector("input").addEventListener("blur", (e) => {
  if (tooltipIsOpen === true) {
    tooltipIsOpen = false;
    hideTooltip(passElement);
  }
});

passElement.addEventListener("mouseenter", (e) => {
  if (tooltipIsOpen === false) {
    tooltipIsOpen = true;
    showTooltip(passElement);
  }
});

passElement.addEventListener("mouseleave", (e) => {
  if (
    tooltipIsOpen === true &&
    document.activeElement !== passElement.querySelector("input")
  ) {
    tooltipIsOpen = false;
    hideTooltip(passElement);
  }
});

function showTooltip(target) {
  const toltipToOpenID =
    "#" + target.querySelector("input").getAttribute("aria-describedby");
  const tooltipToOpen = target.closest(".pass").querySelector(toltipToOpenID);

  tooltipToOpen.setAttribute("aria-hidden", "false");
  tooltipToOpen.classList.remove("pass__tooltip_hidden");
}

function hideTooltip(target) {
  const toltipToCloseID =
    "#" + target.querySelector("input").getAttribute("aria-describedby");
  const tooltipToClose = target.closest(".pass").querySelector(toltipToCloseID);

  tooltipToClose.classList.add("pass__tooltip_hidden");
  tooltipToClose.setAttribute("aria-hidden", "true");
}
