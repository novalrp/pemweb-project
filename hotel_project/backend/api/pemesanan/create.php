<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include_once('../../../config/db.php');

$data = json_decode(file_get_contents("php://input"), true);

if (
  !isset($data['nama_pemesan']) ||
  !isset($data['id_kamar']) ||
  !isset($data['tanggal_checkin']) ||
  !isset($data['tanggal_checkout']) ||
  !isset($data['jumlah_tamu']) ||
  !isset($data['total_harga'])
) {
  http_response_code(400);
  echo json_encode(["message" => "Data tidak lengkap."]);
  exit;
}

$stmt = $conn->prepare("INSERT INTO pemesanan (nama_pemesan, id_kamar, tanggal_checkin, tanggal_checkout, jumlah_tamu, total_harga) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sissii", $data['nama_pemesan'], $data['id_kamar'], $data['tanggal_checkin'], $data['tanggal_checkout'], $data['jumlah_tamu'], $data['total_harga']);

if ($stmt->execute()) {
  http_response_code(201);
  echo json_encode(["message" => "Pemesanan berhasil ditambahkan."]);
} else {
  http_response_code(500);
  echo json_encode(["message" => "Gagal menambahkan pemesanan.", "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
