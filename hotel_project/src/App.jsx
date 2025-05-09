<<<<<<< HEAD
import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBooking";
import Experience from "./components/Experience";
import About from "./components/About";

// Owner pages
import Layout from "./pages/hotelOwner/Layout";
import Dashboard from "./pages/hotelOwner/Dashboard";
import AddRoom from "./pages/hotelOwner/AddRoom";
import ListRoom from "./pages/hotelOwner/ListRoom";
=======

import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Allrooms from './pages/Allrooms'
>>>>>>> d66a977bfc9e59db31070226b7e7aa9f815ebdff


const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {!isOwnerPath && <Navbar />}
<<<<<<< HEAD
      <div className="min-h-[70vh]">
        <Routes>
          {/* User routes */}
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/about" element={<About/>}/>

          {/* Owner routes (nested) */}
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      <Footer />
=======
    <div className='min-h-[70vh]'>
      <Routes>

        <Route path='/' element={<Home/>} />
        <Route path='/rooms' element={<Allrooms/>} />
      </Routes>
     </div>
     <Footer />

>>>>>>> d66a977bfc9e59db31070226b7e7aa9f815ebdff
    </div>
  );
};

export default App;
