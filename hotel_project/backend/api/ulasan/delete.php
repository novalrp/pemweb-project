<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once('../../../config/db.php');
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode(["message" => "ID diperlukan."]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM ulasan WHERE id=?");
$stmt->bind_param("i", $data['id']);

if ($stmt->execute()) {
    echo json_encode(["message" => "Ulasan berhasil dihapus."]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Gagal menghapus ulasan.", "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
