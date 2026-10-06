function initNavToggle() {
  const btn = document.getElementById("nav-toggle-btn");
  const nav = document.querySelector("header nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", function () {
    nav.classList.toggle("nav-open");
  });
}

function initTableFilter() {
  const input = document.getElementById("search-input");
  const table = document.querySelector(".table-responsive table");
  if (!input || !table) return;

  input.addEventListener("keyup", function () {
    const keyword = input.value.toLowerCase();
    table.querySelectorAll("tbody tr").forEach(function (row) {
      const teks = row.querySelector("td")?.textContent.toLowerCase() ?? "";
      row.style.display = teks.includes(keyword) ? "" : "none";
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initNavToggle();
  initTableFilter();
});