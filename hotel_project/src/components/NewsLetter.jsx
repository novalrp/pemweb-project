import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center  max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-30 bg-gray-900 text-white">

        <Title
          title="Tetap Terinspirasi"
          subTitle="Bergabunglah dengan newsletter kami dan jadilah yang pertama mengetahui destinasi baru, penawaran eksklusif, dan inspirasi perjalanan."
        />

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">

        <input
          type="text"
          className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none max-w-66 w-full"
          placeholder="Masukkan email Anda"
        />
        <button className="flex items-center justify-center gap-2 group bg-black px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all">
          Berlangganan
          <img
            src={assets.arrowIcon}
            alt="ikon-panah"
            className="w-3.5 invert group-hover:translate-x-1 transition-all"
          />
        </button>
      </div>
      <p className="text-gray-500 mt-6 text-xs text-center">
        Dengan berlangganan, Anda menyetujui
        Kebijakan Privasi kami dan bersedia
        menerima pembaruan terbaru.
      </p>
    </div>
  )
}

export default NewsLetter
