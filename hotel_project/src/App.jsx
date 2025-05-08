import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Allrooms from './pages/Allrooms'

const App = () => {

  const isOwnerpath = useLocation().pathname.includes("owner")

  return (
    <div>
     {!isOwnerpath && <Navbar/>}
     <div className='min-h-[70vh]'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/rooms' element={<Allrooms/>} />
      </Routes>
     </div>
     <Footer />
    </div>
  )
}

export default App