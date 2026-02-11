export async function loadLayout(activePage) {

  if (!document.querySelector("link[rel='icon']")) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/x-icon";
    link.href = "/favicon.ico";
    document.head.appendChild(link);
  }

  const res = await fetch("./pages/pages.json");
  const APP_VERSION = "v0.5.0";


  const pages = await res.json();   // ← pages bestaat PAS hier

  // Debug (optioneel, maar veilig)
  console.log("PAGES.JSON:", pages);

  const navHtml = pages.map(item => {
    // Group 
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
          <a href="${p.path}" data-page="${p.id}">
            ${p.title}
          </a>
        `).join("")}
      </div>
    </div>
  `;
}


    // Normal link
    if (item.path) {
      return `<a href="${item.path}" data-page="${item.id}">${item.title}</a>`;
    }

    return "";
  }).join("");

  const pageContent = document.body.innerHTML;

document.body.innerHTML = `
  <div id="layout">
    <header>
      <h1>Rack Power Calculator</h1>
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


// Active page highlight
document.querySelectorAll("nav a").forEach(a => {
  if (a.dataset.page === activePage) {
    a.classList.add("active");
  }
});

// Collapse / expand groups + remember state
document.querySelectorAll(".nav-group").forEach(group => {
  const header = group.querySelector(".nav-group-header");
  const title  = header.textContent.trim();
  const key    = `sidebar.group.${title}`;

  // Restore state
  const saved = sessionStorage.getItem(key);
  if (saved === "closed") {
    group.classList.remove("open");
  } else {
    group.classList.add("open");
  }

  // Toggle + save state
  header.onclick = () => {
    group.classList.toggle("open");

    sessionStorage.setItem(
      key,
      group.classList.contains("open") ? "open" : "closed"
    );
  };
});

}


