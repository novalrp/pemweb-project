import React, { useEffect, useState } from 'react';
import Title from './Title';

const Testimonial = ({ userRole = 'user' }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [nama, setNama] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('http://localhost/backend/api/ulasan/read.php');
      const data = await res.json();
      setTestimonials(data.reverse());
    } catch (err) {
      console.error('❌ Gagal fetch testimoni:', err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === '' || nama.trim() === '') {
      alert('Harap isi nama, rating, dan komentar.');
      return;
    }

    const body = {
      nama,
      rating,
      komentar: comment,
    };

    const url = editId
      ? `http://localhost/backend/api/ulasan/update.php?id=${editId}`
      : `http://localhost/backend/api/ulasan/create.php`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('❌ Respon bukan JSON:', text);
        alert('Terjadi kesalahan pada server.');
        return;
      }

      alert(data.message);
      setNama('');
      setRating(0);
      setComment('');
      setEditId(null);
      fetchTestimonials();
    } catch (err) {
      console.error('❌ Gagal kirim komentar:', err);
      alert('Gagal terhubung ke server.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus komentar ini?')) return;

    try {
      const res = await fetch(
        `http://localhost/backend/api/ulasan/delete.php?id=${id}`,
        { method: 'DELETE' }
      );
      const data = await res.json();
      alert(data.message);
      fetchTestimonials();
    } catch (err) {
      console.error('❌ Gagal hapus komentar:', err);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setNama(item.nama);
    setRating(parseInt(item.rating));
    setComment(item.komentar);
  };

  const paginatedTestimonials = testimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-gradient-to-r from-cyan-100 via-purple-100 to-teal-100 pt-20 pb-30">
      <Title
        title="Apa Kata Tamu Kami"
        subTitle="Bagikan pengalamanmu atau lihat testimoni dari tamu lain."
      />

      {/* Form Komentar */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl mt-10 shadow-md w-full max-w-2xl"
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium">Nama:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Nama Anda"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Rating:</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                onClick={() => setRating(num)}
                className={`cursor-pointer text-xl ${
                  num <= rating ? 'text-yellow-400' : 'text-gray-400'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Komentar:</label>
          <textarea
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Bagikan pengalaman Anda..."
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark"
        >
          {editId ? 'Update Komentar' : 'Kirim Komentar'}
        </button>
      </form>

      {/* List Testimoni */}
      <div className="flex flex-wrap justify-center gap-6 mt-12">
        {paginatedTestimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-xl shadow-md max-w-xs relative"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.nama}`}
                alt="User"
              />
              <div>
                <p className="font-playfair text-lg">{item.nama}</p>
                <p className="text-gray-500 text-sm">Rating: {item.rating}/5</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-4">"{item.komentar}"</p>

            {userRole === 'admin' && (
              <div className="absolute top-2 right-2 flex gap-2 text-sm">
                <button onClick={() => handleEdit(item)} className="text-blue-500">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-red-500">
                  Hapus
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-full ${
                i + 1 === currentPage
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 border'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonial;
