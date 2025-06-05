import React from 'react'
import { Routes, Route, Router } from 'react-router-dom'


import Header from './components/Header'
import SideBar from './components/SideBar'
import Home from './pages/Home'
import Wishlists from './pages/Wishlists'
import Setting from './pages/Setting'
import { Grid } from '@mui/material'
import Playlist from './pages/Playlist'
import Player from './components/Player'
import { useUser } from "./contexts/UserContext";


const App = () => {
  const { audioUrl ,songLoading,  } = useUser();
  return (
    <>
      <Header />
      <Grid container spacing={2} sx={{  overflow: 'hidden' }}>
        <Grid  size={2} sx={{
          position: 'relative',
          overflow: 'hidden',
        }}>
          <SideBar />
        </Grid>

        <Grid size={10} sx={{paddingTop: 9, overflowY: 'auto', height: '100vh'}}>
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
      {songLoading && (<Player  />)}
      {audioUrl && (<Player  />)}
    </>
  )
}

export default App