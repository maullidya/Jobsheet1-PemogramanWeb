<?php
session_start();

$nama       = trim($_POST['nama'] ?? '');
$no_anggota = trim($_POST['no_anggota'] ?? '');
$alamat     = trim($_POST['alamat'] ?? '');
$no_hp      = trim($_POST['no_hp'] ?? '');

$errors = [];

if ($nama === '') {
    $errors[] = "Nama wajib diisi.";
}
if ($no_anggota === '') {
    $errors[] = "No. Anggota wajib diisi.";
} elseif (!preg_match('/^[A-Za-z0-9-]+$/', $no_anggota)) {
    $errors[] = "No. Anggota hanya boleh berisi huruf, angka, dan tanda hubung.";
} else {
    foreach ($_SESSION['anggota'] ?? [] as $a) {
        if (strcasecmp($a['no_anggota'], $no_anggota) === 0) {
            $errors[] = "No. Anggota sudah terdaftar.";
            break;
        }
    }
}
if ($no_hp !== '' && !preg_match('/^[0-9+\-]{8,15}$/', $no_hp)) {
    $errors[] = "No. HP harus 8-15 karakter (angka, + atau -).";
}

if (!empty($errors)) {
    $_SESSION['flash'] = ['type' => 'error', 'pesan' => implode(' ', $errors)];
    header('Location: tambah.php');
    exit;
}

if (!isset($_SESSION['anggota'])) {
    $_SESSION['anggota'] = [];
}

$_SESSION['anggota'][] = [
    'no_anggota' => $no_anggota,
    'nama'       => $nama,
    'alamat'     => $alamat,
    'no_hp'      => $no_hp,
];

$_SESSION['flash'] = ['type' => 'success', 'pesan' => 'Anggota berhasil ditambahkan.'];
header('Location: list.php');
exit;