import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    nama_kamar: '',
    tipe_kamar: '',
    harga_per_malam: '',
    deskripsi: '',
    fasilitas: '',
    foto: null,
  });

  const fetchRooms = async () => {
    try {
      const res = await fetch('http://localhost/backend/api/kamar/read.php');
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost/backend/api/kamar/delete.php?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchRooms();
      }
    } catch (error) {
      console.error('Gagal menghapus:', error);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room.id);
    setFormData({
      nama_kamar: room.nama_kamar,
      tipe_kamar: room.tipe_kamar,
      harga_per_malam: room.harga_per_malam,
      deskripsi: room.deskripsi,
      fasilitas: room.fasilitas,
      foto: null,
    });
  };

  const handleUpdate = async () => {
    const data = new FormData();
    data.append('id', editingRoom);
    data.append('nama_kamar', formData.nama_kamar);
    data.append('tipe_kamar', formData.tipe_kamar);
    data.append('harga_per_malam', formData.harga_per_malam);
    data.append('deskripsi', formData.deskripsi);
    data.append('fasilitas', formData.fasilitas);
    if (formData.foto) data.append('foto', formData.foto);

    try {
      const res = await fetch('http://localhost/backend/api/kamar/update.php', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      alert(result.message || 'Update berhasil');
      setEditingRoom(null);
      fetchRooms();
    } catch (error) {
      alert('Gagal update');
    }
  };

  return (
    <div className="px-6 pb-32">
      <Title
        align="left"
        font="outfit"
        title="Daftar Kamar"
        subTitle="Lihat, ubah, atau kelola semua kamar yang terdaftar. Pastikan informasi selalu diperbarui untuk memberikan pengalaman terbaik bagi pengguna."
      />
      <div className="overflow-x-auto mt-10">
        <table className="w-full border text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Foto</th>
              <th className="px-4 py-2">Nama Kamar</th>
              <th className="px-4 py-2">Tipe</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Fasilitas</th>
              <th className="px-4 py-2">Deskripsi</th>
              <th className="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) =>
              editingRoom === room.id ? (
                <tr key={room.id} className="bg-white">
                  <td className="p-2">
                    <input
                      type="file"
                      onChange={(e) => setFormData({ ...formData, foto: e.target.files[0] })}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      className="border w-full p-1"
                      value={formData.nama_kamar}
                      onChange={(e) => setFormData({ ...formData, nama_kamar: e.target.value })}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      className="border w-full p-1"
                      value={formData.tipe_kamar}
                      onChange={(e) => setFormData({ ...formData, tipe_kamar: e.target.value })}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      className="border w-full p-1"
                      type="number"
                      value={formData.harga_per_malam}
                      onChange={(e) => setFormData({ ...formData, harga_per_malam: e.target.value })}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      className="border w-full p-1"
                      value={formData.fasilitas}
                      onChange={(e) => setFormData({ ...formData, fasilitas: e.target.value })}
                    />
                  </td>
                  <td className="p-2">
                    <textarea
                      className="border w-full p-1"
                      rows={2}
                      value={formData.deskripsi}
                      onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    />
                  </td>
                  <td className="p-2 text-center">
                    <button
                      className="bg-green-600 text-white text-xs px-2 py-1 rounded mr-2"
                      onClick={handleUpdate}
                    >
                      Simpan
                    </button>
                    <button
                      className="bg-gray-400 text-white text-xs px-2 py-1 rounded"
                      onClick={() => setEditingRoom(null)}
                    >
                      Batal
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={room.id} className="bg-white border-t">
                  <td className="p-2">
                    <img
                      src={`http://localhost/uploads/${room.foto}`}
                      className="w-16 h-12 object-cover rounded"
                      alt="foto"
                    />
                  </td>
                  <td className="p-2">{room.nama_kamar}</td>
                  <td className="p-2">{room.tipe_kamar}</td>
                  <td className="p-2">Rp{room.harga_per_malam}</td>
                  <td className="p-2">{room.fasilitas}</td>
                  <td className="p-2">{room.deskripsi}</td>
                  <td className="p-2 text-center">
                    <button
                      className="bg-yellow-500 text-white text-xs px-2 py-1 rounded mr-2"
                      onClick={() => handleEdit(room)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white text-xs px-2 py-1 rounded"
                      onClick={() => handleDelete(room.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
