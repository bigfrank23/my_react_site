import { Box, Typography } from '@mui/material'
import React from 'react'

const Announcement = () => {
  return (
    <Box component='section' sx={{background: 'darkcyan', width: '100%', height: 20, position: 'fixed', top: 0, left: 0, zIndex: 200}}>
        <Typography variant='subtitle2' color='#fff' textAlign='center'>New Products Added!!!</Typography>
    </Box>
  )
}

export default Announcement