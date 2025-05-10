import React, { useState } from 'react';
import Title from '../components/Title';
import { userBookingsDummyData, assets } from '../assets/assets';

const MyBookings = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
      <Title
        title='Reservasi Saya'
        subTitle='Kelola reservasi hotel Anda yang telah lalu, sedang berlangsung, dan akan datang dalam satu tempat. Rencanakan perjalanan Anda dengan mudah hanya dalam beberapa klik.'
        align='left'
      />

      <div className='max-w-6xl mt-8 w-full text-gray-800'>
        <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
          <div className='w-1/3'>Hotel</div>
          <div className='w-1/3'>Tanggal & Waktu</div>
          <div className='w-1/3'>Pembayaran</div>
        </div>

        {bookings.map((booking) => (
          <div
            key={booking._id}
            className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'
          >
            {/* Detail Hotel */}
            <div className='flex flex-col md:flex-row'>
              <img
                src={booking.room.images[0]}
                alt='hotel'
                className='w-44 rounded shadow object-cover'
              />
              <div className='flex flex-col gap-1.5 mt-3 md:ml-4'>
                <p className='font-playfair text-2xl'>
                  {booking.hotel.name}
                  <span className='font-inter text-sm'> ({booking.room.roomType})</span>
                </p>
                <div className='flex items-center gap-1 text-sm text-gray-500'>
                  <img src={assets.locationIcon} alt='ikon-lokasi' />
                  <span>{booking.hotel.address}</span>
                </div>
                <div className='flex items-center gap-1 text-sm text-gray-500'>
                  <img src={assets.guestsIcon} alt='ikon-tamu' />
                  <span>Tamu: {booking.guests}</span>
                </div>
                <p className='text-base'>Total: {formatRupiah(booking.totalPrice)}</p>
              </div>
            </div>

            {/* Tanggal & Waktu */}
            <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
              <div>
                <p>Check-In:</p>
                <p className='text-gray-500 text-sm'>
                  {new Date(booking.checkInDate).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p>Check-Out:</p>
                <p className='text-gray-500 text-sm'>
                  {new Date(booking.checkOutDate).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Status Pembayaran */}
            <div className='flex flex-col items-start justify-center pt-3'>
              <div className='flex items-center gap-2'>
                <div
                  className={`h-3 w-3 rounded-full ${
                    booking.isPaid ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
                <p
                  className={`text-sm ${
                    booking.isPaid ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {booking.isPaid ? 'Sudah Dibayar' : 'Belum Dibayar'}
                </p>
              </div>
              {!booking.isPaid && (
                <button className='px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer'>
                  Bayar Sekarang
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
