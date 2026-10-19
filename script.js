const umbrellaTerms = [
  { label: "Brilliant", colour: "yellow" },
  { label: "Experience", colour: "pink" },
  { label: "Community", colour: "blue" },
  { label: "Success", colour: "yellow" },
  { label: "Boston", colour: "pink" },
];
const umbrellaTerm = document.querySelector("#umbrella-term");
const transitionDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180;
let umbrellaIndex = 0;

window.setInterval(() => {
  umbrellaTerm.classList.add("is-changing");
  window.setTimeout(() => {
    umbrellaIndex = (umbrellaIndex + 1) % umbrellaTerms.length;
    umbrellaTerm.textContent = umbrellaTerms[umbrellaIndex].label;
    umbrellaTerm.dataset.colour = umbrellaTerms[umbrellaIndex].colour;
    umbrellaTerm.classList.remove("is-changing");
  }, transitionDelay);
}, 3200);

const leaderboardPanel = document.querySelector(".leaderboard-panel");
const fullscreenButton = document.querySelector(".leaderboard-panel__fullscreen");

fullscreenButton?.addEventListener("click", async () => {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await leaderboardPanel?.requestFullscreen();
    }
  } catch {
    // Browsers may block fullscreen when the embedding context disallows it.
  }
});

document.querySelectorAll("[data-video-reveal]").forEach((reveal) => {
  const button = reveal.querySelector(".video-reveal__button");
  const card = reveal.querySelector(".video-card");
  const video = reveal.querySelector("video");
  let isOpen = false;

  const setVisible = (visible, persistent = false) => {
    if (persistent) isOpen = visible;
    const active = persistent ? isOpen : visible || isOpen;
    reveal.classList.toggle("is-open", active);
    button.setAttribute("aria-expanded", String(active));
    card.inert = !active;
    video.tabIndex = active ? 0 : -1;
  };

  button.addEventListener("click", () => setVisible(!isOpen, true));

  if (window.matchMedia("(hover: hover)").matches) {
    reveal.addEventListener("pointerenter", () => setVisible(true));
    reveal.addEventListener("pointerleave", () => {
      if (!isOpen) setVisible(false);
    });
  }

  reveal.addEventListener("focusin", () => setVisible(true));
  reveal.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (!reveal.contains(document.activeElement) && !isOpen) setVisible(false);
    }, 0);
  });
});

const workshopFilterButtons = [...document.querySelectorAll("[data-workshop-filter]")];
const workshopCards = [...document.querySelectorAll(".workshop-card[data-department]")];
const workshopFilterStatus = document.querySelector("#workshop-filter-status");

workshopFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.workshopFilter;
    let visibleCount = 0;

    workshopFilterButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    workshopCards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.department === filter;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    const label = button.textContent.trim().toLowerCase();
    workshopFilterStatus.textContent = visibleCount
      ? `Showing ${visibleCount} ${visibleCount === 1 ? "workshop" : "workshops"} in ${label}.`
      : `No ${label} workshops are available yet.`;
  });
});
