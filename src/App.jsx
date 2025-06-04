import React from 'react'
import { Routes, Route, Router } from 'react-router-dom'


import Header from './components/Header'
import SideBar from './components/SideBar'
import Home from './pages/Home'
import Wishlists from './pages/Wishlists'
import Setting from './pages/Setting'
import { Grid } from '@mui/material'
import Playlist from './pages/Playlist'

const App = () => {
  return (
    <>
      <Header />
      <Grid container spacing={2} sx={{  height: '100vh', overflow: 'hidden' }}>
        <Grid  size={2} sx={{
          position: 'relative',
          overflow: 'hidden',
        }}>
          <SideBar />
        </Grid>

        <Grid size={10} sx={{marginTop: 9, overflowY: 'auto', height: '100vh'}}>
          {/* <Item>size=4</Item> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/Wishlists" element={<Wishlists />} />
          <Route path="/playlist" element={<Playlist />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<Home />} /> {/* Fallback route */}
        </Routes>
        </Grid>
      </Grid>
    </>
  )
}

export default App