import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  assets,
  facilityIcons,
  roomCommonData,
  roomsDummyData
} from '../assets/assets'
import StarRating from '../components/StarRating'

const RoomDetails = () => {
  const { id } = useParams()
  const [room, setRoom] = useState(null)
  const [mainImage, setMainImage] = useState(null)

  useEffect(() => {
    const foundRoom = roomsDummyData.find(room => room._id === id)
    if (foundRoom) {
      setRoom(foundRoom)
      setMainImage(foundRoom.images[0])
    }
  }, [id])

  if (!room) return <div className='py-28 px-4'>Memuat data kamar...</div>

  return (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
        <h1 className='text-3xl md:text-4xl font-playfair'>
          {room.hotel.name}{' '}
          <span className='font-inter text-sm'>({room.roomType})</span>
        </h1>
        <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500'>
          Diskon 20%
        </p>
      </div>

      <div className='flex items-center gap-1 mt-2'>
        <StarRating />
        <p className='ml-2'>200+ ulasan</p>
      </div>

      <div className='flex items-center gap-1 text-gray-500 mt-2'>
        <img src={assets.locationIcon} alt='Ikon Lokasi' />
        <span>{room.hotel.address}</span>
      </div>

      <div className='flex flex-col lg:flex-row mt-6 gap-6'>
        <div className='lg:w-1/2 w-full'>
          <img
            src={mainImage}
            alt='Gambar Kamar'
            className='w-full rounded-xl shadow-lg object-cover'
          />
        </div>
        <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
          {room.images.length > 1 &&
            room.images.map((image, index) => (
              <img
                onClick={() => setMainImage(image)}
                key={index}
                src={image}
                alt='Thumbnail Kamar'
                className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                  mainImage === image
                    ? 'outline outline-3 outline-orange-500'
                    : ''
                }`}
              />
            ))}
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:justify-between mt-10'>
        <div className='flex flex-col'>
          <h1 className='text-3xl md:text-4xl font-playfair'>
            Nikmati Kemewahan Tak Tertandingi
          </h1>
          <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
            {room.amenities.map((item, index) => (
              <div
                key={index}
                className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'
              >
                <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                <span className='text-sm font-inter'>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className='text-2xl font-medium'>
          Rp{room.pricePerNight.toLocaleString('id-ID')}/malam
        </p>
      </div>

      {/* FORM PEMESANAN */}
      <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
        <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500 w-full'>
          <div className='flex flex-col w-full md:w-auto'>
            <label htmlFor='checkInDate' className='font-medium'>
              Tanggal Check-In
              <input
                type='date'
                id='checkInDate'
                className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none'
                required
              />
            </label>
          </div>

          <div className='flex flex-col w-full md:w-auto'>
            <label htmlFor='checkOutDate' className='font-medium'>
              Tanggal Check-Out
              <input
                type='date'
                id='checkOutDate'
                className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none'
                required
              />
            </label>
          </div>

          <div className='flex flex-col w-full md:w-auto'>
            <label htmlFor='guest' className='font-medium'>
              Jumlah Tamu
              <input
                type='number'
                id='guest'
                min='1'
                placeholder='Jumlah tamu'
                className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none'
                required
              />
            </label>
          </div>
        </div>

        <button
          type='submit'
          className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-10 py-3 md:py-4 text-base cursor-pointer mt-6 md:mt-0'
        >
          Pesan Sekarang
        </button>
      </form>
      <div className='mt-25 space-y-4'>
        {roomCommonData.map((spec, index) => (
          <div key={index} className='flex items-start gap-2'>
            <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
            <div>
              <p className='text-base'>{spec.title}</p>
              <p className='text-gray-500'>{spec.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
        <p>
          Tamu akan ditempatkan di lantai dasar sesuai ketersediaan.
          Anda akan mendapatkan apartemen dua kamar tidur yang nyaman dengan
          nuansa kota yang sesungguhnya. Harga yang dikutip adalah untuk dua
          tamu, di slot tamu harap tandai jumlah tamu untuk mendapatkan harga
          yang tepat untuk grup. Tamu akan ditempatkan di lantai dasar sesuai
          ketersediaan. Anda akan mendapatkan apartemen dua kamar tidur yang
          nyaman dengan nuansa kota yang sesungguhnya.
        </p>
      </div>
    </div>
  )
}

export default RoomDetails
