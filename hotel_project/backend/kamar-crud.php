<?php
include_once('../config/db.php');

// CREATE
if (isset($_POST['create'])) {
  $nama_kamar = $_POST['nama_kamar'];
  $tipe_kamar = $_POST['tipe_kamar'];
  $harga_per_malam = intval($_POST['harga_per_malam']);
  $deskripsi = $_POST['deskripsi'];
  $fasilitas = $_POST['fasilitas'];
  $foto = $_POST['foto'];

  $stmt = $conn->prepare("INSERT INTO kamar (nama_kamar, tipe_kamar, harga_per_malam, deskripsi, fasilitas, foto) VALUES (?, ?, ?, ?, ?, ?)");
  $stmt->bind_param("ssisss", $nama_kamar, $tipe_kamar, $harga_per_malam, $deskripsi, $fasilitas, $foto);
  $stmt->execute();
  $stmt->close();
}

// DELETE
if (isset($_GET['delete'])) {
  $id = intval($_GET['delete']);
  $stmt = $conn->prepare("DELETE FROM kamar WHERE id=?");
  $stmt->bind_param("i", $id);
  $stmt->execute();
  $stmt->close();
}

// UPDATE
if (isset($_POST['update'])) {
  $id = intval($_POST['id']);
  $nama_kamar = $_POST['nama_kamar'];
  $tipe_kamar = $_POST['tipe_kamar'];
  $harga_per_malam = intval($_POST['harga_per_malam']);
  $deskripsi = $_POST['deskripsi'];
  $fasilitas = $_POST['fasilitas'];
  $foto = $_POST['foto'];

  $stmt = $conn->prepare("UPDATE kamar SET nama_kamar=?, tipe_kamar=?, harga_per_malam=?, deskripsi=?, fasilitas=?, foto=? WHERE id=?");
  $stmt->bind_param("ssisssi", $nama_kamar, $tipe_kamar, $harga_per_malam, $deskripsi, $fasilitas, $foto, $id);
  $stmt->execute();
  $stmt->close();
}

// READ
$result = $conn->query("SELECT * FROM kamar");
?>

<!DOCTYPE html>
<html>
<head>
  <title>CRUD Kamar</title>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    input, textarea { margin: 4px; padding: 4px; }
    table { border-collapse: collapse; width: 100%; margin-top: 20px; }
    th, td { border: 1px solid gray; padding: 8px; text-align: left; }
  </style>
</head>
<body>
  <h2>Tambah Kamar</h2>
  <form method="POST">
    <input type="text" name="nama_kamar" placeholder="Nama Kamar" required>
    <input type="text" name="tipe_kamar" placeholder="Tipe Kamar" required>
    <input type="number" name="harga_per_malam" placeholder="Harga per Malam" required>
    <textarea name="deskripsi" placeholder="Deskripsi" required></textarea>
    <textarea name="fasilitas" placeholder="Fasilitas (pisahkan dengan koma)" required></textarea>
    <input type="text" name="foto" placeholder="Link Foto (opsional)">
    <button type="submit" name="create">Tambah</button>
  </form>

  <h2>Daftar Kamar</h2>
  <table>
    <tr>
      <th>ID</th>
      <th>Nama</th>
      <th>Tipe</th>
      <th>Harga</th>
      <th>Deskripsi</th>
      <th>Fasilitas</th>
      <th>Foto</th>
      <th>Aksi</th>
    </tr>
    <?php while ($row = $result->fetch_assoc()) { ?>
      <tr>
        <form method="POST">
          <td><?= $row['id'] ?><input type="hidden" name="id" value="<?= $row['id'] ?>"></td>
          <td><input type="text" name="nama_kamar" value="<?= htmlspecialchars($row['nama_kamar']) ?>"></td>
          <td><input type="text" name="tipe_kamar" value="<?= htmlspecialchars($row['tipe_kamar']) ?>"></td>
          <td><input type="number" name="harga_per_malam" value="<?= $row['harga_per_malam'] ?>"></td>
          <td><textarea name="deskripsi"><?= htmlspecialchars($row['deskripsi']) ?></textarea></td>
          <td><textarea name="fasilitas"><?= htmlspecialchars($row['fasilitas']) ?></textarea></td>
          <td><input type="text" name="foto" value="<?= htmlspecialchars($row['foto']) ?>"></td>
          <td>
            <button type="submit" name="update">Update</button>
            <a href="?delete=<?= $row['id'] ?>" onclick="return confirm('Yakin?')">Hapus</a>
          </td>
        </form>
      </tr>
    <?php } ?>
  </table>
</body>
</html>
