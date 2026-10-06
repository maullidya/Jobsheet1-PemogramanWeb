// Fungsi generik: ambil JSON lalu render ke tabel
async function muatDaftar(urlJson, kolom) {
  const tbody = document.querySelector(".table-responsive table tbody");
  const loading = document.getElementById("loading-indicator");
  if (!tbody || !loading) return;

  loading.style.display = "block";
  tbody.innerHTML = "";

  try {
    // delay simulasi 3 detik (latihan no. 3)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const res = await fetch(urlJson);
    if (!res.ok) {
      throw new Error("Gagal mengambil data (status " + res.status + ")");
    }
    const data = await res.json();

    data.forEach(function (item) {
      const tr = document.createElement("tr");

      kolom.forEach(function (k) {
        const td = document.createElement("td");
        td.textContent = item[k];
        tr.appendChild(td);
      });

      const tdAksi = document.createElement("td");
      tdAksi.innerHTML =
        '<button type="button">Edit</button> ' +
        '<button type="button" class="btn-hapus">Hapus</button>';
      tr.appendChild(tdAksi);

      tbody.appendChild(tr);
    });
  } catch (err) {
    tbody.innerHTML = "";
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = kolom.length + 1;
    td.textContent = "Gagal memuat data: " + err.message;
    tr.appendChild(td);
    tbody.appendChild(tr);
  } finally {
    loading.style.display = "none";
  }
}
