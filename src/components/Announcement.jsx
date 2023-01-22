import { Box, Typography } from '@mui/material'
import React from 'react'
import MovingComponent from 'react-moving-text';

const Announcement = () => {
  return (
    <Box component='section' sx={{background: 'darkcyan', width: '100%', height: 20, position: 'fixed', top: 0, left: 0, zIndex: 200}}>
        <Typography variant='subtitle2' color='#fff' textAlign='center'>
        <MovingComponent
          type="flash"
          duration="1000ms"
          delay="0s"
          direction="normal"
          timing="ease"
          iteration="20"
          fillMode="none">
            New Products Added!!!
        </MovingComponent>
        </Typography>
    </Box>
  )
}

export default Announcement