<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once('../../../config/db.php');

$result = $conn->query("SELECT * FROM ulasan ORDER BY id DESC");

$ulasan = [];

while ($row = $result->fetch_assoc()) {
    $ulasan[] = $row;
}

echo json_encode($ulasan);

$conn->close();
?>
