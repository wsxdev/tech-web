const sidebar = document.querySelector("#sidebar");
const menuToggle = document.querySelector("#menu-toggle");
const sidebarBackdrop = document.querySelector("#sidebar-backdrop");
const mobileLayout = window.matchMedia("(max-width: 1024px)");

function setSidebarOpen(isOpen) {
    sidebar.classList.toggle("is-open", isOpen);
    sidebar.inert = mobileLayout.matches && !isOpen;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    sidebarBackdrop.hidden = !isOpen;
}

menuToggle.addEventListener("click", () => {
    setSidebarOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

sidebarBackdrop.addEventListener("click", () => setSidebarOpen(false));

sidebar.addEventListener("click", (event) => {
    if (event.target.closest("a") && mobileLayout.matches) {
        setSidebarOpen(false);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setSidebarOpen(false);
        menuToggle.focus();
    }
});

mobileLayout.addEventListener("change", () => setSidebarOpen(false));

setSidebarOpen(false);