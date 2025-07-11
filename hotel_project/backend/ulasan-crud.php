<?php
include_once('../config/db.php');

$pesan = "";

// CREATE
if (isset($_POST['create'])) {
  $nama = $_POST['nama'];
  $rating = $_POST['rating'];
  $komentar = $_POST['komentar'];

  $stmt = $conn->prepare("INSERT INTO ulasan (nama, rating, komentar) VALUES (?, ?, ?)");
  $stmt->bind_param("sis", $nama, $rating, $komentar);

  if ($stmt->execute()) {
    $pesan = "✅ Ulasan berhasil ditambahkan.";
  } else {
    $pesan = "❌ Gagal menambahkan ulasan: " . $stmt->error;
  }

  $stmt->close();
}

// DELETE
if (isset($_GET['delete'])) {
  $id = $_GET['delete'];

  $stmt = $conn->prepare("DELETE FROM ulasan WHERE id=?");
  $stmt->bind_param("i", $id);

  if ($stmt->execute()) {
    $pesan = "🗑️ Ulasan berhasil dihapus.";
  } else {
    $pesan = "❌ Gagal menghapus ulasan: " . $stmt->error;
  }

  $stmt->close();
}

// UPDATE
if (isset($_POST['update'])) {
  $id = $_POST['id'];
  $nama = $_POST['nama'];
  $rating = $_POST['rating'];
  $komentar = $_POST['komentar'];

  $stmt = $conn->prepare("UPDATE ulasan SET nama=?, rating=?, komentar=? WHERE id=?");
  $stmt->bind_param("sisi", $nama, $rating, $komentar, $id);

  if ($stmt->execute()) {
    $pesan = "✏️ Ulasan berhasil diubah.";
  } else {
    $pesan = "❌ Gagal mengubah ulasan: " . $stmt->error;
  }

  $stmt->close();
}

// READ
$result = $conn->query("SELECT * FROM ulasan ORDER BY id DESC");
?>

<!DOCTYPE html>
<html>
<head>
  <title>CRUD Ulasan</title>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    input, textarea { margin: 5px; padding: 6px; width: 220px; }
    table { border-collapse: collapse; width: 100%; margin-top: 20px; }
    th, td { border: 1px solid gray; padding: 10px; text-align: left; }
    button { padding: 6px 12px; }
    .message { padding: 10px; margin-bottom: 15px; background: #f0f0f0; border-left: 5px solid #999; }
  </style>
</head>
<body>
  <h2>Tambah Ulasan</h2>

  <?php if ($pesan): ?>
    <div class="message"><?= htmlspecialchars($pesan) ?></div>
  <?php endif; ?>

  <form method="POST">
    <input type="text" name="nama" placeholder="Nama Anda" required>
    <input type="number" name="rating" min="1" max="5" placeholder="Rating (1-5)" required>
    <textarea name="komentar" placeholder="Komentar" rows="3" required></textarea>
    <button type="submit" name="create">Tambah</button>
  </form>

  <h2>Daftar Ulasan</h2>
  <table>
    <tr>
      <th>ID</th>
      <th>Nama</th>
      <th>Rating</th>
      <th>Komentar</th>
      <th>Aksi</th>
    </tr>
    <?php while ($row = $result->fetch_assoc()): ?>
      <tr>
        <form method="POST">
          <td>
            <?= $row['id'] ?>
            <input type="hidden" name="id" value="<?= $row['id'] ?>">
          </td>
          <td><input type="text" name="nama" value="<?= htmlspecialchars($row['nama']) ?>" required></td>
          <td><input type="number" name="rating" min="1" max="5" value="<?= htmlspecialchars($row['rating']) ?>" required></td>
          <td><textarea name="komentar" rows="2"><?= htmlspecialchars($row['komentar']) ?></textarea></td>
          <td>
            <button type="submit" name="update">Ubah</button>
            <a href="?delete=<?= $row['id'] ?>" onclick="return confirm('Yakin ingin menghapus ulasan ini?')">Hapus</a>
          </td>
        </form>
      </tr>
    <?php endwhile; ?>
  </table>
</body>
</html>

<?php $conn->close(); ?>
