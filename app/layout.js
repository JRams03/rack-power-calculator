export async function loadLayout(activePage) {

  /* =========================================
     BASE PATH (GitHub Pages safe)
  ========================================== */

  const BASE_PATH = window.location.hostname.includes("github.io")
    ? "/rack-power-calculator"
    : "";

  /* =========================================
     Reset fade state
  ========================================== */

  document.body.classList.remove("page-loaded");

  /* =========================================
     Favicon
  ========================================== */

  if (!document.querySelector("link[rel='icon']")) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/x-icon";
    link.href = BASE_PATH + "/favicon.ico";
    document.head.appendChild(link);
  }

  /* =========================================
     Load Navigation JSON
  ========================================== */

  const res = await fetch(BASE_PATH + "/pages/pages.json");
  const pages = await res.json();

  const APP_VERSION = "v0.5.0";

  /* =========================================
     Build Navigation
  ========================================== */

  const navHtml = pages.map(item => {

    if (item.group && Array.isArray(item.items)) {
      return `
        <div class="nav-divider"></div>
        <div class="nav-group open">
          <button class="nav-group-header">
            ${item.group}
            <span class="chevron">▾</span>
          </button>
          <div class="nav-group-items">
            ${item.items.map(p => `
              <a href="${BASE_PATH}/${p.path}" data-page="${p.id}">
                ${p.title}
              </a>
            `).join("")}
          </div>
        </div>
      `;
    }

    if (item.path) {
      return `
        <a href="${BASE_PATH}/${item.path}" data-page="${item.id}">
          ${item.title}
        </a>
      `;
    }

    return "";

  }).join("");

  /* =========================================
     Capture Original Page Content
  ========================================== */

  const pageContent = document.body.innerHTML;

  /* =========================================
     Determine Active Page Title
  ========================================== */

  let activeTitle = "Rack Power Calculator";

  pages.forEach(item => {

    if (item.path && item.id === activePage) {
      activeTitle = item.title;
    }

    if (item.group && Array.isArray(item.items)) {
      item.items.forEach(p => {
        if (p.id === activePage) {
          activeTitle = p.title;
        }
      });
    }

  });

  /* =========================================
     Inject Layout
  ========================================== */

  document.body.innerHTML = `
    <div id="layout">

      <header>
        <h1>${activeTitle}</h1>
      </header>

      <aside>
        <nav>${navHtml}</nav>

        <div class="sidebar-version">
          <div class="version-title">Rack Power Calculator</div>
          <div class="version-badge">${APP_VERSION}</div>
        </div>
      </aside>

      <main id="content">
        ${pageContent}
      </main>

    </div>
  `;

  /* =========================================
     Highlight Active Page
  ========================================== */

  document.querySelectorAll("nav a").forEach(a => {
    if (a.dataset.page === activePage) {
      a.classList.add("active");
    }
  });

  /* =========================================
     Collapse / Expand Groups
  ========================================== */

  document.querySelectorAll(".nav-group").forEach(group => {

    const header = group.querySelector(".nav-group-header");
    const title  = header.textContent.trim();
    const key    = `sidebar.group.${title}`;

    const saved = sessionStorage.getItem(key);

    if (saved === "closed") {
      group.classList.remove("open");
    } else {
      group.classList.add("open");
    }

    header.onclick = () => {
      group.classList.toggle("open");

      sessionStorage.setItem(
        key,
        group.classList.contains("open") ? "open" : "closed"
      );
    };

  });

  /* =========================================
     Fade In
  ========================================== */

  requestAnimationFrame(() => {
    document.body.classList.add("page-loaded");
  });
}
