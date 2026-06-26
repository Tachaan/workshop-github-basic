const steps = Array.from(document.querySelectorAll(".step"));
const navItems = Array.from(document.querySelectorAll(".steps li"));
const progressBar = document.querySelector(".progress > div");
const previousButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const timer = document.querySelector(".timer");
const startedAt = Date.now();
let current = 0;

function showStep(index) {
  current = Math.max(0, Math.min(index, steps.length - 1));

  steps.forEach((step, stepIndex) => {
    const isActive = stepIndex === current;
    step.classList.toggle("active", isActive);
    step.setAttribute("aria-hidden", String(!isActive));
  });

  navItems.forEach((item, itemIndex) => {
    const isActive = itemIndex === current;
    item.classList.toggle("active", isActive);
    item.classList.toggle("done", itemIndex < current);
    if (isActive) {
      item.setAttribute("aria-current", "step");
    } else {
      item.removeAttribute("aria-current");
    }
  });

  progressBar.style.width = `${((current + 1) / steps.length) * 100}%`;
  previousButton.disabled = current === 0;
  nextButton.disabled = current === steps.length - 1;
  nextButton.textContent = current === steps.length - 1 ? "完了" : "次へ →";
  previousButton.setAttribute("aria-label", "前のステップへ移動");
  nextButton.setAttribute("aria-label", current === steps.length - 1 ? "ワークショップを完了する" : "次のステップへ移動");
}

function updateTimer() {
  const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
  const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
  const seconds = String(elapsedSeconds % 60).padStart(2, "0");
  timer.textContent = `⏱ 経過 ${minutes}:${seconds}`;
}

navItems.forEach((item, index) => {
  item.setAttribute("role", "button");
  item.setAttribute("tabindex", "0");
  item.addEventListener("click", () => showStep(index));
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showStep(index);
    }
  });
});

previousButton.addEventListener("click", () => showStep(current - 1));
nextButton.addEventListener("click", () => showStep(current + 1));

document.addEventListener("keydown", (event) => {
  const target = event.target;
  if (
    target instanceof HTMLElement &&
    (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable)
  ) {
    return;
  }

  if (event.key === "ArrowLeft") {
    showStep(current - 1);
  }

  if (event.key === "ArrowRight") {
    showStep(current + 1);
  }
});

showStep(0);
updateTimer();
setInterval(updateTimer, 1000);
