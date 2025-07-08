<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type');

include_once('../../../config/db.php');

// Ambil input JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validasi
if (!isset($data['id'])) {
  http_response_code(400);
  echo json_encode(["message" => "ID pemesanan diperlukan."]);
  exit;
}

$id = $data['id'];

// Siapkan dan jalankan query DELETE
$stmt = $conn->prepare("DELETE FROM pemesanan WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
  http_response_code(200);
  echo json_encode(["message" => "Pemesanan berhasil dihapus."]);
} else {
  http_response_code(500);
  echo json_encode(["message" => "Gagal menghapus pemesanan."]);
}

$stmt->close();
$conn->close();
?>