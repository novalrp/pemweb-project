<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once('../../../config/db.php');
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['nama'], $data['rating'], $data['komentar'])) {
    http_response_code(400);
    echo json_encode(["message" => "Data tidak lengkap."]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO ulasan (nama, rating, komentar) VALUES (?, ?, ?)");
$stmt->bind_param("sis", $data['nama'], $data['rating'], $data['komentar']);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode(["message" => "Ulasan berhasil ditambahkan."]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Gagal menambahkan ulasan.", "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
