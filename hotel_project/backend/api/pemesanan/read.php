<?php
header('Access-Control-Allow-Origin: *'); // Izinkan akses dari mana saja
header('Content-Type: application/json');

include_once('../../../config/db.php');

// Query: Ambil semua data dari tabel pemesanan
$query = "SELECT * FROM pemesanan ORDER BY id DESC";
$result = $conn->query($query);

$pemesanan = [];

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $pemesanan[] = $row;
  }

  http_response_code(200);
  echo json_encode([
    "success" => true,
    "data" => $pemesanan
  ]);
} else {
  http_response_code(200);
  echo json_encode([
    "success" => true,
    "data" => [],
    "message" => "Belum ada data pemesanan."
  ]);
}

$conn->close();
?>