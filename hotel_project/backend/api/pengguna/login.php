<?php
// Header umum untuk semua request
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Content-Type: application/json");

// Jika preflight (OPTIONS), langsung respons OK dan hentikan
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


include_once('../../../config/db.php');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email']) || !isset($data['password'])) {
  http_response_code(400);
  echo json_encode(["message" => "Email atau password belum diisi."]);
  exit;
}

$stmt = $conn->prepare("SELECT id, username, email, password, role FROM pengguna WHERE email = ?");
$stmt->bind_param("s", $data['email']);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
  if (password_verify($data['password'], $user['password'])) {
    unset($user['password']); // jangan kirim password ke frontend
    echo json_encode([
      "message" => "Login berhasil",
      "user" => $user
    ]);
  } else {
    http_response_code(401);
    echo json_encode(["message" => "Password salah"]);
  }
} else {
  http_response_code(404);
  echo json_encode(["message" => "Email tidak ditemukan"]);
}

$stmt->close();
$conn->close();
