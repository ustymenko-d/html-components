const body = document.querySelector("body");
const openDialogButtons = document.querySelectorAll(
  "[data-assignment=open-dialog]"
);
const lockPadding = document.querySelectorAll(".lock-padding"); // For position:fixed elements

const timeoutToUnlock = 400; // transition from CSS
let unlock = true;
let rootButton;

if (openDialogButtons.length) {
  const closeDialogButtons = document.querySelectorAll(
    "[data-assignment=close-dialog]"
  );

  if (closeDialogButtons.length) {
    body.addEventListener("click", (e) => {
      if (e.target.dataset.assignment === "close-dialog") {
        modalClose(e.target.closest('[role="dialog"]'));
        e.preventDefault();
      } else if (e.target.classList.contains("close-backdrop")) {
        // If need close backdrop
        let parentWrap = e.target.closest(".dialogs");
        modalClose(parentWrap.querySelector(".modal_open"));
      }
    });
  }

  body.addEventListener("click", (e) => {
    if (e.target.dataset.assignment === "open-dialog") {
      const targetID = e.target.dataset.target;
      const modalToOpen = document.querySelector(`${targetID}`);

      if (e.target.dataset.rootModal) {
        rootButton = e.target;
      }

      modalOpen(modalToOpen);
      e.preventDefault();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      const openModal = document.querySelector(".modal_open");
      modalClose(openModal);
    }
  });
}

function modalOpen(targetToOpen) {
  if (targetToOpen && unlock) {
    const currentOpenModal = document.querySelector(".modal_open");

    currentOpenModal ? modalClose(currentOpenModal, false) : bodyLock();

    const targetWrapper = targetToOpen.closest(".dialogs");

    targetWrapper.removeAttribute("hidden");
    targetWrapper.classList.add("dialogs_open");
    targetToOpen.removeAttribute("hidden");
    targetToOpen.classList.add("modal_open");

    focusLock(targetToOpen);
  }
}

function modalClose(targetToClose, doUnlock = true) {
  if (unlock) {
    targetToClose.classList.remove("modal_open");
    targetToClose.setAttribute("hidden", "");

    const targetWrapper = targetToClose.closest(".dialogs");
    targetToClose.closest(".dialogs").classList.remove("dialogs_open");
    targetToClose.closest(".dialogs").setAttribute("hidden", "");

    if (doUnlock) {
      bodyUnlock();

      rootButton.focus();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - body.offsetWidth;

  if (lockPadding.length && lockPaddingValue > 0) {
    lockPadding.forEach((el) => {
      el.style.left = parseFloat(window.getComputedStyle(el).left) + "px";
    });
  }

  body.style.paddingRight = lockPaddingValue + "px";
  body.classList.add("scroll-lock");

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeoutToUnlock);
}

function bodyUnlock() {
  setTimeout(() => {
    if (lockPadding.length) {
      lockPadding.forEach((el) => {
        el.removeAttribute("style");
      });
    }
    body.removeAttribute("style");
    body.classList.remove("scroll-lock");
  }, timeoutToUnlock);

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeoutToUnlock);
}

// Modal focus lock

function focusLock(target) {
  const focusableElements = target.querySelectorAll(
    "a[href]:not([disabled]), button:not([disabled])"
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];
  const KEYCODE_TAB = 9;

  firstFocusableElement.focus();

  target.addEventListener("keydown", (e) => {
    if (
      document.body.classList.contains("scroll-lock") &&
      (e.key === "Tab" || e.keyCode === KEYCODE_TAB)
    ) {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}
