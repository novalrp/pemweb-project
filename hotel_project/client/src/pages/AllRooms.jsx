import React, { useEffect, useState } from 'react'
import { assets, facilityIcons } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating'

const Checkbox = ({ label, selected = false, onchange = () => {} }) => (
  <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
    <input
      type='checkbox'
      checked={selected}
      onChange={e => onchange(e.target.checked, label)}
    />
    <span className='font-light select-none'>{label}</span>
  </label>
)

const RadioButton = ({ label, selected = false, onchange = () => {} }) => (
  <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
    <input
      type='radio'
      name='sortOptions'
      checked={selected}
      onChange={() => onchange(label)}
    />
    <span className='font-light select-none'>{label}</span>
  </label>
)

const AllRooms = () => {
  const navigate = useNavigate()
  const [openFilters, setOpenFilters] = useState(false)
  const [rooms, setRooms] = useState([])

  const roomTypes = [
    'Tempat Tidur Tunggal',
    'Tempat Tidur Ganda',
    'Kamar Mewah',
    'Suite Keluarga'
  ]
  const priceRanges = [
    '0 sampai 500.000',
    '500.000 sampai 1.000.000',
    '1.000.000 sampai 1.500.000',
    '1.500.000 sampai 5.000.000'
  ]
  const sortOptions = [
    'Harga Terendah ke Tertinggi',
    'Harga Tertinggi ke Terendah',
    'Terbaru Terlebih Dahulu'
  ]

  useEffect(() => {
    fetch('http://localhost/backend/api/kamar/read.php')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRooms(data)
        } else {
          console.error('Respon bukan array:', data)
        }
      })
      .catch(err => console.error('Gagal mengambil data kamar:', err))
  }, [])

  return (
    <div className='flex flex-col lg:flex-row items-start pt-28 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
      {/* Tombol Filter Mobile */}
      <div className='w-full mb-4 lg:hidden'>
        <button
          onClick={() => setOpenFilters(!openFilters)}
          className='w-full bg-gray-100 border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg shadow'
        >
          {openFilters ? 'Sembunyikan Filter' : 'Tampilkan Filter'}
        </button>
      </div>

      {/* Daftar Kamar */}
      <div className='flex flex-col gap-8 w-full lg:w-3/4'>
        <div className='flex flex-col items-start text-left mb-10'>
          <h1 className='font-playfair text-4xl md:text-[40px]'>Kamar Hotel</h1>
          <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-2xl'>
            Manfaatkan penawaran terbatas dan paket spesial kami untuk meningkatkan pengalaman menginap Anda.
          </p>
        </div>

        {/* Card List */}
        {rooms.map(room => (
          <div
            key={room.id}
            className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'
          >
            <img
              onClick={() => {
                navigate(`/rooms/${room.id}`)
                scrollTo(0, 0)
              }}
              src={`http://localhost/uploads/${room.foto}`}
              alt={room.nama_kamar}
              title='Lihat Detail Kamar'
              className='w-full md:w-[300px] h-[200px] rounded-xl shadow-md object-cover cursor-pointer'
            />

            <div className='flex flex-col text-left gap-1 md:pt-0'>
              <p className='text-gray-500 text-sm'>{room.tipe_kamar}</p>
              <p
                onClick={() => {
                  navigate(`/rooms/${room.id}`)
                  scrollTo(0, 0)
                }}
                className='text-gray-800 text-xl font-playfair cursor-pointer'
              >
                {room.nama_kamar}
              </p>

              <div className='flex items-center'>
                <StarRating />
                <p className='ml-2 text-sm'>300+ ulasan</p>
              </div>

              {/* Fasilitas */}
              <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                {(() => {
                  try {
                    const fasilitas = JSON.parse(room.fasilitas)
                    return Object.entries(fasilitas)
                      .filter(([_, isActive]) => isActive)
                      .map(([key], index) => (
                        <div
                          key={index}
                          className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5ff]/70'
                        >
                          {facilityIcons[key] && (
                            <img
                              src={facilityIcons[key]}
                              alt={key}
                              className='w-5 h-5'
                            />
                          )}
                          <p className='text-xs'>{key}</p>
                        </div>
                      ))
                  } catch (error) {
                    console.error('Fasilitas tidak bisa di-parse:', error)
                    return null
                  }
                })()}
              </div>

              <p className='text-xl font-medium text-gray-700'>
                Rp{parseInt(room.harga_per_malam).toLocaleString()}/Malam
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Filter */}
      <div className={`w-full lg:w-1/4 ${openFilters ? 'block' : 'hidden'} lg:block mt-10 lg:mt-0`}>
        <div className='bg-white w-full border border-gray-300 text-gray-600'>
          <div className='flex items-center justify-between px-5 py-2.5 border-b'>
            <p className='text-base font-medium text-gray-800'>FILTER</p>
            <div className='text-xs cursor-pointer'>
              <span className='hidden lg:block'>HAPUS</span>
            </div>
          </div>

          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Filter Populer</p>
            {roomTypes.map((room, index) => (
              <Checkbox key={index} label={room} />
            ))}
          </div>

          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Rentang Harga</p>
            {priceRanges.map((range, index) => (
              <Checkbox key={index} label={`Rp ${range}`} />
            ))}
          </div>

          <div className='px-5 pt-5 pb-5'>
            <p className='font-medium text-gray-800 pb-2'>Urutkan Berdasarkan</p>
            {sortOptions.map((option, index) => (
              <RadioButton key={index} label={option} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllRooms
