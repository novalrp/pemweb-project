import React from 'react'
import { assets, Kota } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col item-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroimage.jpg")] bg-no-repeat bg-cover bg-center h-screen'>
      
      {/* Badge Biru */}
      <div className="w-fit mt-20">
        <span className="inline-block bg-[#49B9FF]/50 px-3.5 py-1 rounded-full">
          Pengalaman Hotel Terbaik
        </span>
      </div>

      {/* Judul Utama */}
      <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4'>
        Temukan Destinasi Penginapan Impian Anda
      </h1>

      {/* Deskripsi */}
      <p className='max-w-130 mt-2 text-sm md:text-base'>
        Kemewahan dan kenyamanan luar biasa menanti Anda di hotel dan resor paling eksklusif di dunia. Mulailah perjalanan Anda hari ini.
      </p>

      {/* Form Pencarian */}
      <div className="mt-8 w-full max-w-3xl">
        <form className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

          {/* Tujuan */}
          <div>
            <div className='flex items-center gap-2'>
              <img src={assets.calenderIcon} alt="" className='h-4'/>
              <label htmlFor="destinationInput">Tujuan</label>
            </div>
            <input list='destinations' id="destinationInput" type="text" className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Ketik di sini" required />
            <datalist id='destinations'>
              {Kota.map((kota, index) => (
                <option value={kota} key={index} />
              ))}
            </datalist>
          </div>

          {/* Tanggal Check In */}
          <div>
            <div className='flex items-center gap-2'>
              <img src={assets.calenderIcon} alt="" className='h-4' />
              <label htmlFor="checkIn">Check-in</label>
            </div>
            <input id="checkIn" type="date" className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
          </div>

          {/* Tanggal Check Out */}
          <div>
            <div className='flex items-center gap-2'>
              <img src={assets.calenderIcon} alt="" className='h-4' />
              <label htmlFor="checkOut">Check-out</label>
            </div>
            <input id="checkOut" type="date" className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
          </div>

          {/* Jumlah Tamu */}
          <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
            <label htmlFor="guests">Tamu</label>
            <input min={1} max={4} id="guests" type="number" className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16" placeholder="0" />
          </div>

          {/* Tombol Cari */}
          <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1'>
            <img src={assets.searchIcon} alt="searchIcon" className='h-7' />
            <span>Cari</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Hero
