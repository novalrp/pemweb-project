<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Jika request OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Lanjutkan dengan hapus data...
include_once('../../../config/db.php');

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['message' => 'ID tidak ditemukan']);
    exit;
}

$id = $_GET['id'];
$stmt = $conn->prepare("DELETE FROM kamar WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Kamar berhasil dihapus']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Gagal menghapus kamar']);
}

$stmt->close();
$conn->close();
?>
