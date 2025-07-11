<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../../config/db.php');

$result = $conn->query("SELECT * FROM kamar");

$kamar = [];
while ($row = $result->fetch_assoc()) {
  $kamar[] = $row;
}

echo json_encode($kamar);
?>
