<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include_once('../../../config/db.php');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username']) || !isset($data['email']) || !isset($data['password']) || !isset($data['role'])) {
  http_response_code(400);
  echo json_encode(["message" => "Data tidak lengkap."]);
  exit;
}

$password = password_hash($data['password'], PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO pengguna (username, email, password, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $data['username'], $data['email'], $password, $data['role']);

if ($stmt->execute()) {
  http_response_code(201);
  echo json_encode(["message" => "Pengguna berhasil ditambahkan."]);
} else {
  http_response_code(500);
  echo json_encode(["message" => "Gagal menambahkan pengguna.", "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
