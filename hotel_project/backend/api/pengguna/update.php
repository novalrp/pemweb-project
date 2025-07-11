<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type');

include_once('../../../config/db.php');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !isset($data['username']) || !isset($data['email']) || !isset($data['role'])) {
  http_response_code(400);
  echo json_encode(["message" => "Data tidak lengkap."]);
  exit;
}

if (!empty($data['password'])) {
  $password = password_hash($data['password'], PASSWORD_DEFAULT);
  $stmt = $conn->prepare("UPDATE pengguna SET username=?, email=?, password=?, role=? WHERE id=?");
  $stmt->bind_param("ssssi", $data['username'], $data['email'], $password, $data['role'], $data['id']);
} else {
  $stmt = $conn->prepare("UPDATE pengguna SET username=?, email=?, role=? WHERE id=?");
  $stmt->bind_param("sssi", $data['username'], $data['email'], $data['role'], $data['id']);
}

if ($stmt->execute()) {
  echo json_encode(["message" => "Pengguna berhasil diperbarui."]);
} else {
  http_response_code(500);
  echo json_encode(["message" => "Gagal memperbarui pengguna.", "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
