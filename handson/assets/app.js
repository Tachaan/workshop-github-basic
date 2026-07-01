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

// コードブロックにコピーボタンを付与する
const copyIcon =
  '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>';
const checkIcon =
  '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>';

document.querySelectorAll("main pre").forEach((pre) => {
  const code = pre.querySelector("code");
  if (!code) {
    return;
  }

  pre.classList.add("has-copy");

  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy-btn";
  button.innerHTML = copyIcon;
  button.title = "コピー";
  button.setAttribute("aria-label", "コードをコピー");

  let resetId;
  button.addEventListener("click", async () => {
    const text = code.innerText;
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
    }

    button.innerHTML = checkIcon;
    button.title = "コピーしました";
    button.classList.add("copied");
    window.clearTimeout(resetId);
    resetId = window.setTimeout(() => {
      button.innerHTML = copyIcon;
      button.title = "コピー";
      button.classList.remove("copied");
    }, 1500);
  });

  pre.appendChild(button);
});
