window.addEventListener("load", windowLoad);

function windowLoad() {
  function digitsCountersInit(digitsCountersItems) {
    let digitsCounters = digitsCountersItems
      ? digitsCountersItems
      : document.querySelectorAll("[data-digits-counter]");

    if (digitsCounters) {
      digitsCounters.forEach((oneCounter) => digitsCountersAnimate(oneCounter));
    }
  }

  function digitsCountersAnimate(oneCounter) {
    let startTimestamp = null;
    const duration = parseInt(oneCounter.dataset.digitsCounter)
      ? parseInt(oneCounter.dataset.digitsCounter)
      : 1000;
    const targetValue = parseInt(oneCounter.innerHTML);
    const startPosition = 0;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      oneCounter.innerHTML = Math.floor(
        progress * (startPosition + targetValue)
      );
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // start on scroll

  let options = {
    threshold: 0.3,
  };
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;
        const digitsCountersItems = targetElement.querySelectorAll(
          "[data-digits-counter]"
        );
        if (digitsCountersItems.length) {
          digitsCountersInit(digitsCountersItems);
        }

        observer.unobserve(targetElement);
      }
    });
  }, options);

  let sections = document.querySelectorAll(".section");
  if (sections.length) {
    sections.forEach((section) => observer.observe(section));
  }
}
