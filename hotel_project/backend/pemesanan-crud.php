<?php
include_once('../config/db.php');

// CREATE
if (isset($_POST['create'])) {
  $nama = $_POST['nama_pemesan'];
  $id_kamar = $_POST['id_kamar'];
  $checkin = $_POST['tanggal_checkin'];
  $checkout = $_POST['tanggal_checkout'];
  $tamu = $_POST['jumlah_tamu'];

  // Ambil harga per malam dari tabel kamar
  $stmt = $conn->prepare("SELECT harga_per_malam FROM kamar WHERE id=?");
  $stmt->bind_param("i", $id_kamar);
  $stmt->execute();
  $stmt->bind_result($harga_per_malam);
  $stmt->fetch();
  $stmt->close();

  // Hitung jumlah malam
  $start = new DateTime($checkin);
  $end = new DateTime($checkout);
  $malam = $start->diff($end)->days;

  // Hitung total harga
  $total = $malam * $harga_per_malam;

  // Simpan pemesanan
  $stmt = $conn->prepare("INSERT INTO pemesanan (nama_pemesan, id_kamar, tanggal_checkin, tanggal_checkout, jumlah_tamu, total_harga) VALUES (?, ?, ?, ?, ?, ?)");
  $stmt->bind_param("sissii", $nama, $id_kamar, $checkin, $checkout, $tamu, $total);
  $stmt->execute();
  $stmt->close();
}

// DELETE
if (isset($_GET['delete'])) {
  $id = $_GET['delete'];
  $stmt = $conn->prepare("DELETE FROM pemesanan WHERE id=?");
  $stmt->bind_param("i", $id);
  $stmt->execute();
  $stmt->close();
}

// UPDATE
if (isset($_POST['update'])) {
  $id = $_POST['id'];
  $nama = $_POST['nama_pemesan'];
  $id_kamar = $_POST['id_kamar'];
  $checkin = $_POST['tanggal_checkin'];
  $checkout = $_POST['tanggal_checkout'];
  $tamu = $_POST['jumlah_tamu'];

  // Ambil harga per malam
  $stmt = $conn->prepare("SELECT harga_per_malam FROM kamar WHERE id=?");
  $stmt->bind_param("i", $id_kamar);
  $stmt->execute();
  $stmt->bind_result($harga_per_malam);
  $stmt->fetch();
  $stmt->close();

  $malam = (new DateTime($checkin))->diff(new DateTime($checkout))->days;
  $total = $malam * $harga_per_malam;

  $stmt = $conn->prepare("UPDATE pemesanan SET nama_pemesan=?, id_kamar=?, tanggal_checkin=?, tanggal_checkout=?, jumlah_tamu=?, total_harga=? WHERE id=?");
  $stmt->bind_param("sissiii", $nama, $id_kamar, $checkin, $checkout, $tamu, $total, $id);
  $stmt->execute();
  $stmt->close();
}

// READ
$result = $conn->query("SELECT * FROM pemesanan");
?>

<!DOCTYPE html>
<html>
<head>
  <title>CRUD Pemesanan</title>
  <style>
    input, textarea { margin: 5px; padding: 4px; }
    table { border-collapse: collapse; width: 100%; margin-top: 20px; }
    th, td { border: 1px solid gray; padding: 8px; text-align: left; }
  </style>
</head>
<body>
<h2>Tambah Pemesanan</h2>
<form method="POST">
  <input name="nama_pemesan" placeholder="Nama Pemesan" required>
  <input name="id_kamar" type="number" placeholder="ID Kamar" required>
  <input name="tanggal_checkin" type="date" required>
  <input name="tanggal_checkout" type="date" required>
  <input name="jumlah_tamu" type="number" required>
  <button name="create">Tambah</button>
</form>

<h2>Daftar Pemesanan</h2>
<table>
  <tr>
    <th>ID</th>
    <th>Nama</th>
    <th>ID Kamar</th>
    <th>Check-in</th>
    <th>Check-out</th>
    <th>Tamu</th>
    <th>Total Harga</th>
    <th>Aksi</th>
  </tr>
  <?php while($r = $result->fetch_assoc()) { ?>
  <tr>
    <form method="POST">
      <td><?= $r['id'] ?><input type="hidden" name="id" value="<?= $r['id'] ?>"></td>
      <td><input name="nama_pemesan" value="<?= $r['nama_pemesan'] ?>"></td>
      <td><input name="id_kamar" value="<?= $r['id_kamar'] ?>"></td>
      <td><input type="date" name="tanggal_checkin" value="<?= $r['tanggal_checkin'] ?>"></td>
      <td><input type="date" name="tanggal_checkout" value="<?= $r['tanggal_checkout'] ?>"></td>
      <td><input name="jumlah_tamu" value="<?= $r['jumlah_tamu'] ?>"></td>
      <td>Rp <?= number_format($r['total_harga'], 0, ',', '.') ?></td>
      <td><button name="update">Ubah</button> <a href="?delete=<?= $r['id'] ?>">Hapus</a></td>
    </form>
  </tr>
  <?php } ?>
</table>
</body>
</html>
