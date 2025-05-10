// Impor aset-aset gambar & ikon
import logo from './logo.png';
import searchIcon from './searchIcon.svg';
import userIcon from './userIcon.svg';
import calenderIcon from './calenderIcon.svg';
import locationIcon from './locationIcon.svg';
import starIconFilled from './starIconFilled.svg';
import arrowIcon from './arrowIcon.svg';
import starIconOutlined from './starIconOutlined.svg';
import instagramIcon from './instagramIcon.svg';
import facebookIcon from './facebookIcon.svg';
import twitterIcon from './twitterIcon.svg';
import linkendinIcon from './linkendinIcon.svg';
import freeWifiIcon from './freeWifiIcon.svg';
import freeBreakfastIcon from './freeBreakfastIcon.svg';
import roomServiceIcon from './roomServiceIcon.svg';
import mountainIcon from './mountainIcon.svg';
import poolIcon from './poolIcon.svg';
import homeIcon from './homeIcon.svg';
import closeIcon from './closeIcon.svg';
import locationFilledIcon from './locationFilledIcon.svg';
import heartIcon from './heartIcon.svg';
import badgeIcon from './badgeIcon.svg';
import menuIcon from './menuIcon.svg';
import closeMenu from './closeMenu.svg';
import guestsIcon from './guestsIcon.svg';
import roomImg1 from './roomImg1.png';
import roomImg2 from './roomImg2.png';
import roomImg3 from './roomImg3.png';
import roomImg4 from './roomImg4.png';
import regImage from './regImage.png';
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";

// Objek aset
export const assets = {
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
};

// Daftar kota pilihan
export const cities = ["Cirebon", "Majalengka", "Kuningan", "Indramayu"];

// Penawaran Eksklusif (data dummy)
export const exclusiveOffers = [
    {
        _id: 1,
        title: "Paket Liburan Musim Panas",
        description: "Nikmati satu malam gratis dan sarapan harian",
        priceOff: 25,
        expiryDate: "31 Agustus",
        image: exclusiveOfferCardImg1,
    },
    {
        _id: 2,
        title: "Liburan Romantis",
        description: "Paket spesial pasangan termasuk perawatan spa",
        priceOff: 20,
        expiryDate: "20 September",
        image: exclusiveOfferCardImg2,
    },
    {
        _id: 3,
        title: "Retret Mewah",
        description: "Pesan 60 hari sebelumnya dan hemat di properti mewah kami",
        priceOff: 30,
        expiryDate: "25 September",
        image: exclusiveOfferCardImg3,
    },
];

// Testimoni pengguna (data dummy)
export const testimonials = [
    {
        id: 1,
        name: "Herdi",
        address: "Gunung Jati, Cirebon",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
        rating: 5,
        review: "Saya pernah mencoba banyak platform booking, tapi InapQ sangat personal dan detail.",
    },
    {
        id: 2,
        name: "Alok",
        address: "Cirendang, Kuningan",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
        rating: 4,
        review: "InapQ luar biasa! Proses booking sangat mudah dan hotelnya mewah!",
    },
    {
        id: 3,
        name: "Kelly",
        address: "Garut",
        image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
        rating: 5,
        review: "Layanan luar biasa! Selalu dapat akomodasi terbaik lewat InapQ!",
    },
];

// Ikon fasilitas
export const facilityIcons = {
    "WiFi Gratis": assets.freeWifiIcon,
    "Sarapan Gratis": assets.freeBreakfastIcon,
    "Layanan Kamar": assets.roomServiceIcon,
    "Pemandangan Gunung": assets.mountainIcon,
    "Akses Kolam Renang": assets.poolIcon,
};

// Data umum kamar (untuk detail kamar)
export const roomCommonData = [
    {
        icon: assets.homeIcon,
        title: "Tinggal Bersih & Aman",
        description: "Ruang yang terawat dan higienis khusus untuk Anda.",
    },
    {
        icon: assets.badgeIcon,
        title: "Pembersihan Ekstra",
        description: "Host mengikuti standar kebersihan ketat dari Staybnb.",
    },
    {
        icon: assets.locationFilledIcon,
        title: "Lokasi Strategis",
        description: "90% tamu memberikan bintang 5 untuk lokasi.",
    },
    {
        icon: assets.heartIcon,
        title: "Check-In Lancar",
        description: "100% tamu memberikan rating 5 untuk check-in.",
    },
];

// Data pengguna dummy
export const userDummyData = {
    "_id": "user_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Zilong",
    "email": "zilong123@gmail.com",
    "image": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
    "role": "pemilikHotel",
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": ["Cirebon"]
};

// Data hotel dummy
export const hotelDummyData = {
    "_id": "67f76393197ac559e4089b72",
    "name": "InapQ",
    "address": "Jalan Utama No.123, Koloni 23",
    "contact": "+0123456789",
    "owner": userDummyData,
    "city": "Jakarta",
    "createdAt": "2025-04-10T06:22:11.663Z",
    "updatedAt": "2025-04-10T06:22:11.663Z",
    "__v": 0
};

// Data kamar dummy
export const roomsDummyData = [
    {
        "_id": "67f7647c197ac559e4089b96",
        "hotel": hotelDummyData,
        "roomType": "Ranjang Ganda",
        "pricePerNight": "1.000.000",
        "amenities": ["Layanan Kamar", "Pemandangan Gunung", "Akses Kolam Renang"],
        "images": [roomImg1, roomImg2, roomImg3, roomImg4],
        "isAvailable": true,
    },
    {
        "_id": "67f76452197ac559e4089b8e",
        "hotel": hotelDummyData,
        "roomType": "Ranjang Ganda",
        "pricePerNight": "1.500.000",
        "amenities": ["Layanan Kamar", "Pemandangan Gunung", "Akses Kolam Renang"],
        "images": [roomImg2, roomImg3, roomImg4, roomImg1],
        "isAvailable": true,
    },
    {
        "_id": "67f76406197ac559e4089b82",
        "hotel": hotelDummyData,
        "roomType": "Ranjang Ganda",
        "pricePerNight": "500.000",
        "amenities": ["WiFi Gratis", "Sarapan Gratis", "Layanan Kamar"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "isAvailable": true,
    },
    {
        "_id": "67f763d8197ac559e4089b7a",
        "hotel": hotelDummyData,
        "roomType": "Ranjang Tunggal",
        "pricePerNight": "200.000",
        "amenities": ["WiFi Gratis", "Layanan Kamar", "Akses Kolam Renang"],
        "images": [roomImg4, roomImg1, roomImg2, roomImg3],
        "isAvailable": true,
    },
];

// Data pemesanan user
export const userBookingsDummyData = [
    {
        "_id": "67f76839994a731e97d3b8ce",
        "user": userDummyData,
        "room": roomsDummyData[1],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-30T00:00:00.000Z",
        "checkOutDate": "2025-05-01T00:00:00.000Z",
        "totalPrice": "2.500.000",
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Stripe",
        "isPaid": true,
    },
    {
        "_id": "67f76829994a731e97d3b8c3",
        "user": userDummyData,
        "room": roomsDummyData[0],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-27T00:00:00.000Z",
        "checkOutDate": "2025-04-28T00:00:00.000Z",
        "totalPrice": "6.000.000",
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Bayar di Hotel",
        "isPaid": false,
    },
    {
        "_id": "67f76810994a731e97d3b8b4",
        "user": userDummyData,
        "room": roomsDummyData[3],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-11T00:00:00.000Z",
        "checkOutDate": "2025-04-12T00:00:00.000Z",
        "totalPrice": "1.000.000",
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Bayar di Hotel",
        "isPaid": false,
    }
];

// Data dashboard dummy
export const dashboardDummyData = {
    totalBookings: 500,
    totalRevenue: "897.000.000",
    bookings: userBookingsDummyData,
};


// assets/assets.js

export const teamMembers = [
  {
    id: 1,
    name: 'Noval Rizky Pratama',
    role: 'Pengusaha Sukses - Pemilik & Pengelola',
    image: assets.guestsIcon, // Ganti dengan URL foto Noval
    description: 'Noval adalah pengusaha sukses yang memiliki visi besar dalam dunia perhotelan, bertujuan memberikan pengalaman terbaik bagi setiap tamu.'
  },
  {
    id: 2,
    name: 'Herdiansyah Subakti',
    role: 'Pengusaha Sukses - Manajer Operasional',
    image: 'https://via.placeholder.com/150', // Ganti dengan URL foto Herdiansyah
    description: 'Herdiansyah berhasil mengembangkan dan mengelola operasional hotel dengan efisien, memastikan kualitas layanan yang konsisten tinggi.'
  },
  {
    id: 3,
    name: 'Mimif Miftahuddin',
    role: 'Pengusaha Sukses - Manajer Pemasaran',
    image: 'https://via.placeholder.com/150', // Ganti dengan URL foto Mimif
    description: 'Mimif telah membawa HotelQ ke tingkat yang lebih tinggi dalam hal pemasaran, menjadikan brand ini dikenal luas oleh pasar.'
  },
  {
    id: 4,
    name: 'Galih Akbar',
    role: 'Pengusaha Sukses - Manajer Layanan Pelanggan',
    image: 'https://via.placeholder.com/150', // Ganti dengan URL foto Galih
    description: 'Galih berfokus pada pemberian layanan pelanggan yang luar biasa, yang menjadikan tamu merasa istimewa dan selalu ingin kembali.'
  }
];

