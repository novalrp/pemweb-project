<?php
// Izinkan CORS & atur header agar bisa menerima request dari luar
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Koneksi ke database
include_once('../../../config/db.php');

// Ambil input JSON dari body request
$data = json_decode(file_get_contents("php://input"), true);

// Validasi data (pastikan semua field wajib ada)
if (
  !isset($data['nama_pemesan']) ||
  !isset($data['id_kamar']) ||
  !isset($data['tanggal_checkin']) ||
  !isset($data['tanggal_checkout']) ||
  !isset($data['jumlah_tamu']) ||
  !isset($data['total_harga'])
) {
  http_response_code(400); // Bad Request
  echo json_encode(["message" => "Data tidak lengkap."]);
  exit;
}

// Siapkan query SQL
$query = "INSERT INTO pemesanan 
  (nama_pemesan, id_kamar, tanggal_checkin, tanggal_checkout, jumlah_tamu, total_harga) 
  VALUES (?, ?, ?, ?, ?, ?)";

// Gunakan prepared statement untuk keamanan
$stmt = $conn->prepare($query);

// Bind parameter ke statement
$stmt->bind_param(
  "sissii", // s = string, i = integer
  $data['nama_pemesan'],
  $data['id_kamar'],
  $data['tanggal_checkin'],
  $data['tanggal_checkout'],
  $data['jumlah_tamu'],
  $data['total_harga']
);

// Eksekusi query dan respon ke client
if ($stmt->execute()) {
  http_response_code(201); // Created
  echo json_encode(["message" => "Pemesanan berhasil ditambahkan."]);
} else {
  http_response_code(500); // Server Error
  echo json_encode(["message" => "Gagal menambahkan pemesanan.", "error" => $stmt->error]);
}

// Tutup koneksi
$stmt->close();
$conn->close();
?>