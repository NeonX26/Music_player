import React from 'react';
import {
    AppBar,
    Avatar,
    Box,
    InputAdornment,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import logo from '../assets/images/Logo.png'; // Adjust the path to your logo image
import { useUser } from "../contexts/UserContext";


import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
    const { searchQuery, setSearchQuery, handleSearchAudio, audioUrl, meta } = useUser();

    const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Prevent form submission if inside a form
      event.preventDefault();
      handleSearchAudio()
    }
  };


    return (
        <AppBar position="fixed">
            <Toolbar sx={{ backgroundColor: '#1a1a1a' }}>

                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mx: 2 }}>
                    {/* Logo or Title */}
                    {/* <Typography variant="h4" noWrap component="h1" sx={{ cursor: 'pointer', color: '#fff' }}>
                        VMusic
                    </Typography> */}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <img src={logo} width={'100'} />
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Search Box */}
                    <Box sx={{ width: 500 }}>
                        {/* <TextField
                            fullWidth
                            size="small"
                            placeholder="Search for a song (e.g. Tum Hi Ho)"
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                backgroundColor: "#f0f0f0",
                                borderRadius: 2,
                                marginBottom: 1, // similar to your 10px marginBottom
                                padding: "8px",
                            }}
                        /> */}

                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search..."
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                backgroundColor: '#f0f0f0',
                                borderRadius: 2,
                            }}
                        />
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* User Profile Icon  */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                        <Avatar alt="Vishal" src="../assets/images/VJ-Mobile.jpg" sx={{ width: 34, height: 34 }} />
                    </Box>

                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
