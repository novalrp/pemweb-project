<?php
include_once('../config/db.php');

// CREATE
if (isset($_POST['create'])) {
  $username = $_POST['username'];
  $email = $_POST['email'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $role = $_POST['role'];

  $stmt = $conn->prepare("INSERT INTO pengguna (username, email, password, role) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("ssss", $username, $email, $password, $role);
  $stmt->execute();
  $stmt->close();
}

// DELETE
if (isset($_GET['delete'])) {
  $id = $_GET['delete'];
  $stmt = $conn->prepare("DELETE FROM pengguna WHERE id=?");
  $stmt->bind_param("i", $id);
  $stmt->execute();
  $stmt->close();
}

// UPDATE
if (isset($_POST['update'])) {
  $id = $_POST['id'];
  $username = $_POST['username'];
  $email = $_POST['email'];
  $password = !empty($_POST['password']) ? password_hash($_POST['password'], PASSWORD_DEFAULT) : null;
  $role = $_POST['role'];

  if ($password) {
    $stmt = $conn->prepare("UPDATE pengguna SET username=?, email=?, password=?, role=? WHERE id=?");
    $stmt->bind_param("ssssi", $username, $email, $password, $role, $id);
  } else {
    $stmt = $conn->prepare("UPDATE pengguna SET username=?, email=?, role=? WHERE id=?");
    $stmt->bind_param("sssi", $username, $email, $role, $id);
  }
  $stmt->execute();
  $stmt->close();
}

// READ
$result = $conn->query("SELECT * FROM pengguna");
?>

<!DOCTYPE html>
<html>
<head>
  <title>CRUD Pengguna</title>
  <style>
    input, select { margin: 5px; padding: 5px; }
    table { border-collapse: collapse; width: 100%; margin-top: 20px; }
    th, td { border: 1px solid gray; padding: 8px; }
  </style>
</head>
<body>
<h2>Tambah Pengguna</h2>
<form method="POST">
  <input name="username" placeholder="Username" required>
  <input name="email" type="email" placeholder="Email" required>
  <input name="password" type="password" placeholder="Password" required>
  <select name="role" required>
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>
  <button name="create">Tambah</button>
</form>

<h2>Daftar Pengguna</h2>
<table>
  <tr>
    <th>ID</th>
    <th>Username</th>
    <th>Email</th>
    <th>Role</th>
    <th>Aksi</th>
  </tr>
  <?php while($r = $result->fetch_assoc()) { ?>
  <tr>
    <form method="POST">
      <td><?= $r['id'] ?><input type="hidden" name="id" value="<?= $r['id'] ?>"></td>
      <td><input name="username" value="<?= $r['username'] ?>"></td>
      <td><input type="email" name="email" value="<?= $r['email'] ?>"></td>
      <td>
        <select name="role">
          <option value="user" <?= $r['role'] === 'user' ? 'selected' : '' ?>>User</option>
          <option value="admin" <?= $r['role'] === 'admin' ? 'selected' : '' ?>>Admin</option>
        </select>
      </td>
      <td>
        <input name="password" type="password" placeholder="Password baru (opsional)">
        <button name="update">Ubah</button>
        <a href="?delete=<?= $r['id'] ?>" onclick="return confirm('Yakin dihapus?')">Hapus</a>
      </td>
    </form>
  </tr>
  <?php } ?>
</table>
</body>
</html>
