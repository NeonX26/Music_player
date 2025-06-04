import { Box } from '@mui/material'
import React from 'react'

import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PaidIcon from '@mui/icons-material/Paid';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {

  const navigate = useNavigate();

  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: 9,
      }}>
        <Box onClick={()=> navigate('/')} sx={{ padding: '10px', backgroundColor: '#fff', borderRadius: '5px', fontSize: '1.5rem', display:'flex' , cursor: 'pointer', '&:hover': { backgroundColor: '#e0e0e0' } }}>
          <HomeIcon  sx={{marginRight:2}}/>
          Home
        </Box>
        <Box onClick={()=> navigate('wishlists')} sx={{ padding: '10px', borderRadius: '5px', fontSize: '1.5rem', display:'flex' , cursor: 'pointer', '&:hover': { backgroundColor: '#e0e0e0' } }}>
          <FavoriteIcon sx={{marginRight:2}}/>
          Wishlists</Box>
        <Box onClick={()=> navigate('playlist')} sx={{ padding: '10px', borderRadius: '5px', fontSize: '1.5rem', display:'flex' , cursor: 'pointer', '&:hover': { backgroundColor: '#e0e0e0' } }}>
          <PaidIcon sx={{marginRight:2}}/>
          Playlist</Box>
        <Box onClick={()=> navigate('setting')} sx={{ padding: '10px', borderRadius: '5px', fontSize: '1.5rem', display:'flex' , cursor: 'pointer', '&:hover': { backgroundColor: '#e0e0e0' } }}>
          <SettingsIcon sx={{marginRight:2}}/>
          Setting</Box>
      </Box>

    </Box>
  )
}

export default SideBar