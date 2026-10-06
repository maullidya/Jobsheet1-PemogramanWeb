const isbn = form.querySelector("[name='isbn']");
    if (isbn) {
      const nilai = isbn.value.trim();
      if (nilai !== "" && !/^[0-9-]+$/.test(nilai)) {
        tampilkanError(isbn, "ISBN hanya boleh berisi angka dan tanda hubung (-).");
        valid = false;
      } else {
        hapusError(isbn);
      }
    }
function initTableFilter() {
  const input = document.getElementById("search-input");
  const table = document.querySelector(".table-responsive table");
  if (!input || !table) return;

  input.addEventListener("keyup", function () {
    const keyword = input.value.toLowerCase();
    const rows = table.querySelectorAll("tbody tr");

    rows.forEach(function (row) {
      const teks = row.querySelector("td")?.textContent.toLowerCase() ?? "";
      row.style.display = teks.includes(keyword) ? "" : "none";
    });
  });
}
