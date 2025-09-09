function toggleFlip(card) {
  card.classList.toggle("clicked");
}

function demoFlip() {
  const cards = document.querySelectorAll(".flip-card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("clicked");
      setTimeout(() => {
        card.classList.remove("clicked");
      }, 2000);
    }, index * 500);
  });
}

setTimeout(demoFlip, 1000);

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    const focusedCard = document.activeElement.closest(".flip-card");
    if (focusedCard) {
      toggleFlip(focusedCard);
      e.preventDefault();
    }
  }
});

document.querySelectorAll(".flip-card").forEach((card) => {
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute("area-label", "Flip card to reveal more information");
});
