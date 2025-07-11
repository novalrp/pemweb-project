<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type');

include_once('../../../config/db.php');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
  http_response_code(400);
  echo json_encode(["message" => "ID diperlukan untuk menghapus pengguna."]);
  exit;
}

$stmt = $conn->prepare("DELETE FROM pengguna WHERE id=?");
$stmt->bind_param("i", $data['id']);

if ($stmt->execute()) {
  echo json_encode(["message" => "Pengguna berhasil dihapus."]);
} else {
  http_response_code(500);
  echo json_encode(["message" => "Gagal menghapus pengguna.", "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
