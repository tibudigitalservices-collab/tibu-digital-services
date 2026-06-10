const header = document.getElementById("siteHeader");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a");

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeMenu() {
  if (!menuButton || !navLinks) return;
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  const icon = menuButton.querySelector(".material-symbols-rounded");
  if (icon) icon.textContent = "menu";
}

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    const icon = menuButton.querySelector(".material-symbols-rounded");
    if (icon) icon.textContent = isOpen ? "close" : "menu";
  });

  navAnchors.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (!active) return;
      navAnchors.forEach((link) => link.classList.remove("active-link"));
      active.classList.add("active-link");
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
);

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
