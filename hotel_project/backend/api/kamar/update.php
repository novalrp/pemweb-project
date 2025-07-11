<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once('../../../config/db.php');

if (
    !isset($_POST['id']) ||
    !isset($_POST['nama_kamar']) ||
    !isset($_POST['tipe_kamar']) ||
    !isset($_POST['harga_per_malam']) ||
    !isset($_POST['deskripsi']) ||
    !isset($_POST['fasilitas'])
) {
    http_response_code(400);
    echo json_encode(['message' => 'Data tidak lengkap']);
    exit;
}

$id = $_POST['id'];
$nama_kamar = $_POST['nama_kamar'];
$tipe_kamar = $_POST['tipe_kamar'];
$harga = $_POST['harga_per_malam'];
$deskripsi = $_POST['deskripsi'];
$fasilitas = $_POST['fasilitas'];

// Siapkan update query
if (isset($_FILES['foto']) && $_FILES['foto']['error'] === 0) {
    // Upload gambar baru
    $targetDir = "../../../uploads/";
    $filename = uniqid() . "_" . basename($_FILES["foto"]["name"]);
    $targetFile = $targetDir . $filename;

    if (!move_uploaded_file($_FILES["foto"]["tmp_name"], $targetFile)) {
        http_response_code(500);
        echo json_encode(["message" => "Gagal upload gambar"]);
        exit;
    }

    // Update semua termasuk foto
    $stmt = $conn->prepare("UPDATE kamar SET nama_kamar=?, tipe_kamar=?, harga_per_malam=?, deskripsi=?, fasilitas=?, foto=? WHERE id=?");
    $stmt->bind_param("ssisssi", $nama_kamar, $tipe_kamar, $harga, $deskripsi, $fasilitas, $filename, $id);
} else {
    // Update tanpa foto
    $stmt = $conn->prepare("UPDATE kamar SET nama_kamar=?, tipe_kamar=?, harga_per_malam=?, deskripsi=?, fasilitas=? WHERE id=?");
    $stmt->bind_param("ssissi", $nama_kamar, $tipe_kamar, $harga, $deskripsi, $fasilitas, $id);
}

if ($stmt->execute()) {
    echo json_encode(['message' => 'Kamar berhasil diperbarui']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Gagal memperbarui kamar', 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
