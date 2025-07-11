<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once('../../../config/db.php');
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'], $data['nama'], $data['rating'], $data['komentar'])) {
    http_response_code(400);
    echo json_encode(["message" => "Data tidak lengkap."]);
    exit;
}

$stmt = $conn->prepare("UPDATE ulasan SET nama=?, rating=?, komentar=? WHERE id=?");
$stmt->bind_param("sisi", $data['nama'], $data['rating'], $data['komentar'], $data['id']);

if ($stmt->execute()) {
    echo json_encode(["message" => "Ulasan berhasil diupdate."]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Gagal update ulasan.", "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
