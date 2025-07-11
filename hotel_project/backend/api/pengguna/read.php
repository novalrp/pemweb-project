<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../../config/db.php');

$result = $conn->query("SELECT id, username, email, role FROM pengguna");

$data = [];
while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

echo json_encode($data);

$conn->close();
