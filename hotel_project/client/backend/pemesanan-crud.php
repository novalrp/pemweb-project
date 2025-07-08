<?php
header('Content-Type: application/json');
include './config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    $result = $conn->query("SELECT * FROM pemesanan ORDER BY id DESC");
    $data = [];
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
    echo json_encode($data);
    break;

  case 'POST':
    $nama = $_POST['nama_tamu'];
    $check_in = $_POST['check_in'];
    $check_out = $_POST['check_out'];
    $jumlah = $_POST['jumlah_tamu'];
    $kamar_id = $_POST['kamar_id'];
    $total = $_POST['total_harga'];

    $stmt = $conn->prepare("INSERT INTO pemesanan (nama_tamu, check_in, check_out, jumlah_tamu, kamar_id, total_harga) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssiii", $nama, $check_in, $check_out, $jumlah, $kamar_id, $total);
    $stmt->execute();

    echo json_encode(["message" => "Pemesanan berhasil ditambahkan"]);
    break;

  case 'PUT':
    parse_str(file_get_contents("php://input"), $_PUT);
    $id = $_PUT['id'];
    $nama = $_PUT['nama_tamu'];
    $check_in = $_PUT['check_in'];
    $check_out = $_PUT['check_out'];
    $jumlah = $_PUT['jumlah_tamu'];
    $kamar_id = $_PUT['kamar_id'];
    $total = $_PUT['total_harga'];
    $status = $_PUT['status_pembayaran'];

    $stmt = $conn->prepare("UPDATE pemesanan SET nama_tamu=?, check_in=?, check_out=?, jumlah_tamu=?, kamar_id=?, total_harga=?, status_pembayaran=? WHERE id=?");
    $stmt->bind_param("sssiiisi", $nama, $check_in, $check_out, $jumlah, $kamar_id, $total, $status, $id);
    $stmt->execute();

    echo json_encode(["message" => "Pemesanan berhasil diupdate"]);
    break;

  case 'DELETE':
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = $_DELETE['id'];

    $stmt = $conn->prepare("DELETE FROM pemesanan WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo json_encode(["message" => "Pemesanan berhasil dihapus"]);
    break;

  default:
    echo json_encode(["error" => "Metode tidak dikenali"]);
}
?>