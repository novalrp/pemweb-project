<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once('../../../config/db.php');

if (
  !isset($_POST['nama_kamar'], $_POST['tipe_kamar'], $_POST['harga_per_malam'], $_POST['deskripsi'], $_POST['fasilitas']) ||
  !isset($_FILES['foto'])
) {
  http_response_code(400);
  echo json_encode(["message" => "Data tidak lengkap."]);
  exit;
}

$targetDir = "../../../uploads/";
if (!file_exists($targetDir)) {
  mkdir($targetDir, 0777, true);
}

$filename = uniqid() . "_" . basename($_FILES["foto"]["name"]);
$targetFile = $targetDir . $filename;

if (!move_uploaded_file($_FILES["foto"]["tmp_name"], $targetFile)) {
  http_response_code(500);
  echo json_encode(["message" => "Gagal mengupload gambar."]);
  exit;
}

$stmt = $conn->prepare("INSERT INTO kamar (nama_kamar, tipe_kamar, harga_per_malam, deskripsi, fasilitas, foto) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
  "ssisss",
  $_POST['nama_kamar'],
  $_POST['tipe_kamar'],
  $_POST['harga_per_malam'],
  $_POST['deskripsi'],
  $_POST['fasilitas'],
  $filename
);

if ($stmt->execute()) {
  http_response_code(201);
  echo json_encode(["message" => "Kamar berhasil ditambahkan."]);
} else {
  http_response_code(500);
  echo json_encode(["message" => "Gagal menambahkan kamar.", "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
