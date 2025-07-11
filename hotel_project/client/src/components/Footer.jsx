import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer class="bg-[#f6F9FC] text-gray-500/80 pt-8 pb-12 px-6 md:px-12 lg:px-20 xl:px-24 mt-20 text-sm">

      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        {/* Kolom 1 - Logo & Deskripsi */}
        <div className="max-w-80">
          <img src={assets.logo} alt="logo" className="mb-4 h-9 invert opacity-80" />
          <p className="text-sm">
            Temukan tempat menginap paling luar biasa di dunia, mulai dari hotel butik hingga vila mewah dan pulau pribadi.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <img src={assets.instagramIcon} alt="instagram-icon" />
            <img src={assets.facebookIcon} alt="facebook-icon" />
            <img src={assets.twitterIcon} alt="twitter-icon" />
            <img src={assets.linkendinIcon} alt="linkedin-icon" />
          </div>
        </div>

        {/* Kolom 2 - Perusahaan */}
        <div>
          <p className="font-playfair text-lg text-gray-800">PERUSAHAAN</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li><a href="#">Tentang Kami</a></li>
            <li><a href="#">Karier</a></li>
            <li><a href="#">Berita</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Mitra</a></li>
          </ul>
        </div>

        {/* Kolom 3 - Dukungan */}
        <div>
          <p className="font-playfair text-lg text-gray-800">DUKUNGAN</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li><a href="#">Pusat Bantuan</a></li>
            <li><a href="#">Informasi Keamanan</a></li>
            <li><a href="#">Opsi Pembatalan</a></li>
            <li><a href="#">Hubungi Kami</a></li>
            <li><a href="#">Aksesibilitas</a></li>
          </ul>
        </div>

        {/* Kolom 4 - Berlangganan */}
        <div className="max-w-80">
          <p className="font-playfair text-lg text-gray-800">BERLANGGANAN</p>
          <p className="mt-3 text-sm">
            Berlangganan newsletter kami untuk inspirasi dan penawaran spesial.
          </p>
          <div className="flex items-center mt-4">
            <input
              type="text"
              className="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none"
              placeholder="Email Anda"
            />
            <button className="flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r">
              <img src={assets.arrowIcon} alt="arrow-icon" className="w-3.5 invert" />
            </button>
          </div>
        </div>
      </div>

      {/* Batas Garis */}
      <hr className="border-gray-300 mt-10" />

      {/* Bawah Footer */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-6 text-sm">
        <p>© {new Date().getFullYear()} InapQ. Semua hak dilindungi.</p>
        <ul className="flex items-center gap-4">
          <li><a href="#">Privasi</a></li>
          <li><a href="#">Syarat</a></li>
          <li><a href="#">Peta Situs</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
