const config = window.WORKSHOP_SITE_CONFIG;

if (!config || !config.title || !Array.isArray(config.pages) || config.pages.length === 0) {
  throw new Error("assets/site.config.js must define a title and at least one page.");
}

const agenda = config.pages;
const nav = document.querySelector("#agenda-nav");
const progressBar = document.querySelector("#progress-bar");
const previousButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const content = document.querySelector("#doc-content");
const sourceLink = document.querySelector("#source-link");
const pageLabel = document.querySelector("#page-label");
const pageTitle = document.querySelector("#page-title");
const pageSummary = document.querySelector("#page-summary");
const pageCompletion = document.querySelector("#page-completion");
const pageCompletionText = document.querySelector("#page-completion-text");

let currentIndex = 0;
let loadSequence = 0;
let routedHash = "";
let tocScrollHandler = null;
let lightboxReturnFocus = null;

function applySiteConfig() {
  document.title = config.title;
  document.querySelector('meta[name="description"]').content = config.description || "";

  const brand = config.brand || {};
  const brandLink = document.querySelector("#brand");
  brandLink.href = `#${agenda[0].path}`;
  brandLink.setAttribute("aria-label", `${brand.name || config.title} ホーム`);
  document.querySelector("#brand-name").textContent = brand.name || config.title;

  const identity = config.identity || {};
  const hasIdentity = Boolean(identity.code || identity.sequence);
  const compactCode = [identity.code, identity.sequence].filter(Boolean).join(" / ");
  const brandCode = document.querySelector("#brand-code");
  const hero = document.querySelector(".hero");
  const heroSignature = document.querySelector("#hero-signature");

  brandCode.hidden = !hasIdentity;
  brandCode.textContent = compactCode;
  hero.classList.toggle("without-identity", !hasIdentity);
  heroSignature.hidden = !hasIdentity;
  document.querySelector("#hero-signature-label").textContent = identity.label || "Workshop";
  document.querySelector("#hero-signature-code").textContent = identity.code || "";
  document.querySelector("#hero-signature-sequence").textContent = identity.sequence || "";
  document.querySelector("#hero-signature-edition").textContent = identity.edition || "";
  heroSignature.setAttribute(
    "aria-label",
    [identity.label, compactCode, identity.edition].filter(Boolean).join(", ")
  );

  const navigation = config.navigation || {};
  document.querySelector("#nav-eyebrow").textContent = navigation.eyebrow || "Workshop";
  document.querySelector("#nav-title").textContent = navigation.title || config.title;
  document.querySelector("#nav-description").textContent =
    navigation.description || config.description || "";
  document.querySelector("#side-card-label").textContent =
    navigation.sideCardLabel || "Workshop";
  document.querySelector("#side-card-value").textContent =
    navigation.sideCardValue || config.title;

  document.querySelector("#topbar-actions").innerHTML = (config.links || [])
    .map(
      (link) =>
        `<a href="${escapeAttribute(link.href)}">${escapeHtml(link.label)}</a>`
    )
    .join("");

  document.querySelector("#timeline").innerHTML = [
    config.totalTime
      ? `<span class="tl-total"><small>Total</small><b>${escapeHtml(config.totalTime)}</b></span>`
      : "",
    ...agenda.map(
      (item) =>
        `<span class="tl-item"><small>${escapeHtml(item.label)}</small><b>${escapeHtml(item.time)}</b></span>`
    ),
  ].join("");
}

function buildNavigation() {
  nav.innerHTML = agenda
    .map(
      (item, index) => `
        <li>
          <a href="#${escapeAttribute(item.path)}" data-index="${index}" data-label="${escapeAttribute(item.label)}">
            <span class="nav-title">${escapeHtml(item.title)}</span>
            <span class="nav-meta">${escapeHtml(item.time)} / ${escapeHtml(item.path)}</span>
          </a>
        </li>`
    )
    .join("");
}

function getRouteFromHash() {
  const raw = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  const separator = raw.indexOf("#");
  const path = separator >= 0 ? raw.slice(0, separator) : raw;
  const headingId = separator >= 0 ? raw.slice(separator + 1) : "";
  const index = agenda.findIndex((item) => item.path === path || item.id === path);
  return { index: index >= 0 ? index : 0, headingId };
}

function setHashForIndex(index) {
  const boundedIndex = Math.max(0, Math.min(index, agenda.length - 1));
  const nextHash = `#${agenda[boundedIndex].path}`;
  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash;
    return;
  }
  showPage(boundedIndex);
}

async function showPage(index, headingId = "") {
  currentIndex = Math.max(0, Math.min(index, agenda.length - 1));
  const item = agenda[currentIndex];

  document.title = `${item.label} ${item.title} | ${config.title}`;
  pageLabel.textContent = `${item.label} / ${item.time}`;
  pageTitle.textContent = item.title;
  pageSummary.textContent = item.summary;
  pageCompletion.hidden = !item.completion;
  pageCompletionText.textContent = item.completion || "";
  sourceLink.href = item.path;
  sourceLink.textContent = `${item.label} の Markdown を開く`;

  document.querySelectorAll(".steps a").forEach((link, linkIndex) => {
    const active = linkIndex === currentIndex;
    link.classList.toggle("active", active);
    link.classList.toggle("done", linkIndex < currentIndex);
    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  progressBar.style.width = `${((currentIndex + 1) / agenda.length) * 100}%`;
  previousButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === agenda.length - 1;
  nextButton.textContent = currentIndex === agenda.length - 1 ? "完了" : "次へ →";

  await loadMarkdown(item, headingId);
}

async function loadMarkdown(item, headingId) {
  const sequence = ++loadSequence;

  if (tocScrollHandler) {
    window.removeEventListener("scroll", tocScrollHandler);
    tocScrollHandler = null;
  }

  content.setAttribute("aria-busy", "true");
  content.innerHTML = `
    <div class="loading-card">
      <b>${escapeHtml(item.label)} を読み込んでいます...</b>
      <span>${escapeHtml(item.path)}</span>
    </div>`;

  try {
    const response = await fetch(item.path, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const markdown = await response.text();
    if (sequence !== loadSequence) {
      return;
    }

    content.innerHTML = `
      <div class="doc-meta">
        <b>${escapeHtml(item.label)} / ${escapeHtml(item.time)}</b>
        <span>${escapeHtml(item.path)}</span>
      </div>
      <div class="markdown-body">${renderMarkdown(markdown, item.path)}</div>`;

    addTableOfContents();
    addFigureEnhancements();
    addCopyButtons();

    if (headingId) {
      window.requestAnimationFrame(() => scrollToHeading(headingId));
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  } catch (error) {
    if (sequence !== loadSequence) {
      return;
    }

    console.error(`Failed to load ${item.path}`, error);
    content.innerHTML = `
      <div class="empty-state">
        <p class="eyebrow">${escapeHtml(item.label)} / ${escapeHtml(item.time)}</p>
        <h2>${escapeHtml(item.title)}</h2>
        <p><code>${escapeHtml(item.path)}</code> を読み込めませんでした。</p>
        <p><code>${escapeHtml(error.message)}</code></p>
        <p><a href="${escapeAttribute(item.path)}">Markdown を直接開いて確認する</a></p>
      </div>`;
  } finally {
    if (sequence === loadSequence) {
      content.setAttribute("aria-busy", "false");
    }
  }
}

function renderMarkdown(markdown, currentPath) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  const headingIds = new Map();
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^```([\w+-]+)?(?:\s+(.+?))?\s*$/);
    if (fence) {
      const language = fence[1] || "text";
      const filename = fence[2] || "";
      const code = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      index += index < lines.length ? 1 : 0;
      html.push(renderCodeBlock(language, filename, code.join("\n")));
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].replace(/\s+#+$/, "");
      const baseId = slugify(stripInlineMarkdown(text)) || "section";
      const duplicateIndex = headingIds.get(baseId) || 0;
      const headingId = duplicateIndex ? `${baseId}-${duplicateIndex}` : baseId;
      headingIds.set(baseId, duplicateIndex + 1);
      html.push(
        `<h${level} id="${headingId}">${inlineMarkdown(text, currentPath)}</h${level}>`
      );
      index += 1;
      continue;
    }

    if (/^\s*(---+|\*\*\*+|___+)\s*$/.test(line)) {
      html.push("<hr>");
      index += 1;
      continue;
    }

    const image = parseImageLine(line);
    if (image) {
      const source = rewriteHref(image.source, currentPath);
      const caption = image.title || image.alt;
      html.push(`
        <figure>
          <img src="${escapeAttribute(source)}" alt="${escapeAttribute(image.alt)}" loading="lazy" decoding="async">
          ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""}
        </figure>`);
      index += 1;
      continue;
    }

    if (isTableStart(lines, index)) {
      const tableLines = [];
      while (index < lines.length && /^\s*\|.*\|\s*$/.test(lines[index])) {
        tableLines.push(lines[index]);
        index += 1;
      }
      html.push(renderTable(tableLines, currentPath));
      continue;
    }

    if (matchListItem(line)) {
      const list = renderList(lines, index, currentPath);
      html.push(list.html);
      index = list.nextIndex;
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quote = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^\s*>\s?/, ""));
        index += 1;
      }
      html.push(
        `<blockquote>${quote
          .map((item) => (item ? `<p>${inlineMarkdown(item, currentPath)}</p>` : ""))
          .join("")}</blockquote>`
      );
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^```/.test(lines[index]) &&
      !/^(#{1,6})\s+/.test(lines[index]) &&
      !/^\s*(---+|\*\*\*+|___+)\s*$/.test(lines[index]) &&
      !matchListItem(lines[index]) &&
      !/^\s*>\s?/.test(lines[index]) &&
      !parseImageLine(lines[index]) &&
      !isTableStart(lines, index)
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    html.push(`<p>${inlineMarkdown(paragraph.join(" "), currentPath)}</p>`);
  }

  return html.join("\n");
}

function renderCodeBlock(language, filename, code) {
  return `
    <div class="code-block">
      <div class="code-block-header">
        <span class="code-language">${escapeHtml(getLanguageLabel(language))}</span>
        ${filename ? `<span class="code-filename">${escapeHtml(filename)}</span>` : ""}
        <span class="code-block-tools"></span>
      </div>
      <pre><code class="language-${escapeAttribute(language)}">${escapeHtml(code)}</code></pre>
    </div>`;
}

function matchListItem(line) {
  const match = line.match(/^(\s*)([-*+]|\d+\.)\s+(.+)$/);
  if (!match) {
    return null;
  }
  return {
    indent: match[1].replace(/\t/g, "    ").length,
    ordered: /\d+\./.test(match[2]),
    text: match[3],
  };
}

function renderList(lines, startIndex, currentPath) {
  const first = matchListItem(lines[startIndex]);
  const baseIndent = first.indent;
  const ordered = first.ordered;
  const tag = ordered ? "ol" : "ul";
  const items = [];
  let index = startIndex;

  while (index < lines.length) {
    const item = matchListItem(lines[index]);
    if (!item || item.indent < baseIndent || (item.indent === baseIndent && item.ordered !== ordered)) {
      break;
    }

    if (item.indent > baseIndent) {
      if (!items.length) {
        break;
      }
      const nested = renderList(lines, index, currentPath);
      items[items.length - 1].nested.push(nested.html);
      index = nested.nextIndex;
      continue;
    }

    const task = item.text.match(/^\[([ xX])\]\s+(.+)$/);
    items.push({
      task: Boolean(task),
      checked: task ? task[1].toLowerCase() === "x" : false,
      text: task ? task[2] : item.text,
      nested: [],
    });
    index += 1;

    while (index < lines.length) {
      const nestedItem = matchListItem(lines[index]);
      if (!nestedItem || nestedItem.indent <= baseIndent) {
        break;
      }
      const nested = renderList(lines, index, currentPath);
      items[items.length - 1].nested.push(nested.html);
      index = nested.nextIndex;
    }
  }

  return {
    html: `<${tag}>${items
      .map(
        (item) =>
          `<li${item.task ? ' class="task-list-item"' : ""}>${
            item.task
              ? `<input type="checkbox" disabled${item.checked ? " checked" : ""} aria-hidden="true">`
              : ""
          }${inlineMarkdown(item.text, currentPath)}${item.nested.join("")}</li>`
      )
      .join("")}</${tag}>`,
    nextIndex: index,
  };
}

function parseImageLine(line) {
  const match = line.match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]*)")?\)\s*$/);
  if (!match) {
    return null;
  }
  return { alt: match[1], source: match[2], title: match[3] || "" };
}

function getLanguageLabel(language) {
  const labels = {
    bash: "Bash",
    css: "CSS",
    html: "HTML",
    javascript: "JavaScript",
    js: "JavaScript",
    json: "JSON",
    markdown: "Markdown",
    md: "Markdown",
    mermaid: "Mermaid",
    plaintext: "Text",
    powershell: "PowerShell",
    shell: "Shell",
    text: "Text",
    typescript: "TypeScript",
    ts: "TypeScript",
  };
  return labels[language.toLowerCase()] || language;
}

function renderTable(lines, currentPath) {
  const rows = lines
    .filter((_line, index) => index !== 1)
    .map(splitTableRow);
  if (!rows.length) {
    return "";
  }

  const [head, ...body] = rows;
  return `
    <table>
      <thead><tr>${head.map((cell) => `<th>${inlineMarkdown(cell, currentPath)}</th>`).join("")}</tr></thead>
      <tbody>${body
        .map(
          (row) =>
            `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell, currentPath)}</td>`).join("")}</tr>`
        )
        .join("")}</tbody>
    </table>`;
}

function splitTableRow(line) {
  const value = line.trim().replace(/^\||\|$/g, "");
  const cells = [];
  let cell = "";
  let inCode = false;
  let escaped = false;

  for (const character of value) {
    if (escaped) {
      cell += character;
      escaped = false;
    } else if (character === "\\") {
      cell += character;
      escaped = true;
    } else if (character === "`") {
      cell += character;
      inCode = !inCode;
    } else if (character === "|" && !inCode) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += character;
    }
  }
  cells.push(cell.trim());
  return cells;
}

function isTableStart(lines, index) {
  return (
    index + 1 < lines.length &&
    /^\s*\|.*\|\s*$/.test(lines[index]) &&
    /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1])
  );
}

function inlineMarkdown(text, currentPath) {
  const tokens = [];
  let value = text.replace(/`([^`]+)`/g, (_match, code) =>
    token(tokens, `<code>${escapeHtml(code)}</code>`)
  );
  value = value.replace(/<((?:https?:\/\/|mailto:)[^>]+)>/g, (_match, href) =>
    token(tokens, `<a href="${escapeAttribute(href)}">${escapeHtml(href)}</a>`)
  );
  value = value.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, hrefValue) => {
    const href = hrefValue.trim().replace(/\s+"[^"]*"$/, "");
    return token(
      tokens,
      `<a href="${escapeAttribute(rewriteHref(href, currentPath))}">${escapeHtml(label)}</a>`
    );
  });

  value = escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/~~([^~]+)~~/g, "<del>$1</del>");

  tokens.forEach((html, index) => {
    value = value.replace(`%%TOKEN${index}%%`, html);
  });
  return value;
}

function stripInlineMarkdown(value) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~`]/g, "");
}

function token(tokens, html) {
  const id = tokens.length;
  tokens.push(html);
  return `%%TOKEN${id}%%`;
}

function rewriteHref(href, currentPath) {
  if (/^(https?:|mailto:|\/)/i.test(href)) {
    return href;
  }
  if (href.startsWith("#")) {
    return `#${currentPath}${href}`;
  }

  const separator = href.indexOf("#");
  const path = separator >= 0 ? href.slice(0, separator) : href;
  const headingId = separator >= 0 ? href.slice(separator + 1) : "";
  const base = currentPath.split("/").slice(0, -1).join("/");
  const resolved = normalizePath(`${base}/${path}`);
  const suffix = headingId ? `#${headingId}` : "";

  if (resolved.endsWith(".md")) {
    return `#${resolved}${suffix}`;
  }
  return `${resolved}${suffix}`;
}

function normalizePath(path) {
  const parts = [];
  path.split("/").forEach((part) => {
    if (!part || part === ".") {
      return;
    }
    if (part === "..") {
      parts.pop();
      return;
    }
    parts.push(part);
  });
  return parts.join("/");
}

function addTableOfContents() {
  const markdownBody = content.querySelector(".markdown-body");
  const headings = markdownBody ? [...markdownBody.querySelectorAll("h2")] : [];
  if (headings.length < 2) {
    return;
  }

  const tableOfContents = document.createElement("nav");
  tableOfContents.className = "page-toc";
  tableOfContents.setAttribute("aria-label", "このページの目次");
  tableOfContents.innerHTML = `
    <p class="page-toc-title">On this page</p>
    <ol>
      ${headings
        .map(
          (heading) =>
            `<li><a href="#${escapeAttribute(heading.id)}" data-heading-id="${escapeAttribute(heading.id)}">${escapeHtml(heading.textContent)}</a></li>`
        )
        .join("")}
    </ol>`;

  tableOfContents.querySelectorAll("[data-heading-id]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const heading = document.getElementById(link.dataset.headingId);
      if (!heading) {
        return;
      }
      const nextHash = `#${agenda[currentIndex].path}#${heading.id}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, "", nextHash);
        routedHash = nextHash;
      }
      setActiveTocLink(tableOfContents, heading.id);
      heading.setAttribute("tabindex", "-1");
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
      heading.focus({ preventScroll: true });
    });
  });

  markdownBody.before(tableOfContents);
  setActiveTocLink(tableOfContents, headings[0].id);

  const updateActiveHeading = () => {
    const atPageEnd =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    let activeHeading = atPageEnd ? headings.at(-1) : headings[0];
    if (!atPageEnd) {
      headings.forEach((heading) => {
        if (heading.getBoundingClientRect().top <= 120) {
          activeHeading = heading;
        }
      });
    }
    setActiveTocLink(tableOfContents, activeHeading.id);
  };

  let scrollFrame = null;
  tocScrollHandler = () => {
    if (scrollFrame) {
      return;
    }
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = null;
      updateActiveHeading();
    });
  };
  window.addEventListener("scroll", tocScrollHandler, { passive: true });
  updateActiveHeading();
}

function setActiveTocLink(tableOfContents, headingId) {
  tableOfContents.querySelectorAll("[data-heading-id]").forEach((link) => {
    const active = link.dataset.headingId === headingId;
    link.classList.toggle("active", active);
    if (active) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function scrollToHeading(headingId) {
  const decodedHeadingId = decodeURIComponent(headingId);
  const heading =
    document.getElementById(decodedHeadingId) ||
    [...document.querySelectorAll(".markdown-body [id]")].find(
      (candidate) => normalizeAnchor(candidate.id) === normalizeAnchor(decodedHeadingId)
    );
  if (!heading) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  heading.scrollIntoView({ behavior: "smooth", block: "start" });
}

function normalizeAnchor(value) {
  return value
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[^\p{Letter}\p{Number}]/gu, "");
}

function addFigureEnhancements() {
  document.querySelectorAll(".markdown-body figure").forEach((figure, index) => {
    const image = figure.querySelector("img");
    if (!image) {
      return;
    }

    let caption = figure.querySelector("figcaption");
    if (!caption) {
      caption = document.createElement("figcaption");
      caption.textContent = image.alt;
      figure.appendChild(caption);
    }

    const captionText = caption.textContent.trim();
    const label = document.createElement("span");
    const description = document.createElement("span");
    label.className = "figure-label";
    label.textContent = `Figure ${String(index + 1).padStart(2, "0")}`;
    description.className = "figure-caption-text";
    description.textContent = captionText;
    caption.replaceChildren(label, description);

    image.classList.add("zoomable-figure");
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `${captionText || image.alt}を拡大表示`);

    const open = () => openFigureLightbox(image, captionText);
    image.addEventListener("click", open);
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
}

function openFigureLightbox(sourceImage, caption) {
  const lightbox = getFigureLightbox();
  const image = lightbox.querySelector("img");
  const description = lightbox.querySelector(".figure-lightbox-caption");

  lightboxReturnFocus = sourceImage;
  image.src = sourceImage.currentSrc || sourceImage.src;
  image.alt = sourceImage.alt;
  description.textContent = caption;
  lightbox.setAttribute("aria-label", caption ? `図版の拡大表示: ${caption}` : "図版の拡大表示");
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  document.querySelector(".topbar").inert = true;
  document.querySelector(".layout").inert = true;
  lightbox.querySelector(".figure-lightbox-close").focus();
}

function closeFigureLightbox() {
  const lightbox = document.querySelector("#figure-lightbox");
  if (!lightbox || lightbox.hidden) {
    return;
  }

  lightbox.hidden = true;
  document.body.classList.remove("lightbox-open");
  document.querySelector(".topbar").inert = false;
  document.querySelector(".layout").inert = false;
  lightboxReturnFocus?.focus();
  lightboxReturnFocus = null;
}

function getFigureLightbox() {
  let lightbox = document.querySelector("#figure-lightbox");
  if (lightbox) {
    return lightbox;
  }

  lightbox = document.createElement("div");
  lightbox.id = "figure-lightbox";
  lightbox.className = "figure-lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "図版の拡大表示");
  lightbox.innerHTML = `
    <button class="figure-lightbox-close" type="button">閉じる</button>
    <figure>
      <img alt="">
      <figcaption class="figure-lightbox-caption"></figcaption>
    </figure>`;

  const closeButton = lightbox.querySelector(".figure-lightbox-close");
  closeButton.addEventListener("click", closeFigureLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeFigureLightbox();
    }
  });
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeFigureLightbox();
    }
    if (event.key === "Tab") {
      event.preventDefault();
      closeButton.focus();
    }
  });
  document.body.appendChild(lightbox);
  return lightbox;
}

function addCopyButtons() {
  const copyIcon =
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>';
  const checkIcon =
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>';

  document.querySelectorAll("#doc-content pre").forEach((pre) => {
    const code = pre.querySelector("code");
    const codeBlock = pre.closest(".code-block");
    const buttonHost = codeBlock?.querySelector(".code-block-tools") || pre;
    if (!code || buttonHost.querySelector(".copy-btn")) {
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-btn";
    button.innerHTML = copyIcon;
    button.title = "コピー";
    button.setAttribute("aria-label", "コードをコピー");

    let resetId;
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.innerText);
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
    buttonHost.appendChild(button);
  });
}

function slugify(value) {
  return escapeAttribute(
    value
      .toLowerCase()
      .trim()
      .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
      .replace(/^-+|-+$/g, "")
  );
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

applySiteConfig();
buildNavigation();
previousButton.addEventListener("click", () => setHashForIndex(currentIndex - 1));
nextButton.addEventListener("click", () => setHashForIndex(currentIndex + 1));

function handleRouteChange() {
  if (window.location.hash === routedHash) {
    return;
  }
  routedHash = window.location.hash;
  const route = getRouteFromHash();
  showPage(route.index, route.headingId);
}

window.addEventListener("hashchange", handleRouteChange);
window.addEventListener("popstate", handleRouteChange);

if (!window.location.hash) {
  setHashForIndex(0);
} else {
  handleRouteChange();
}
