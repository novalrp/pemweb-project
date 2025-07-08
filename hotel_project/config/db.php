<?php
$host = "localhost";
$username = "root";
$password = ""; // default laragon/xampp
$dbname = "hotel_db";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Koneksi gagal: " . $conn->connect_error);
}
?>