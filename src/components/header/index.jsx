import React from 'react';
import './style.css'
import {Box, AppBar, Typography} from "@mui/material";

export const Header = () => {

  return (
    <Box className='header'>
      <AppBar position='static'>
        <Typography variant='h6' className='header__title'>
          About Movie
        </Typography>
      </AppBar>
    </Box>
  );
}