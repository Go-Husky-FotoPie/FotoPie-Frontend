import { Box, Grid, Tab, Paper, Container, Avatar, IconButton } from '@mui/material';
import React, { ReactNode } from 'react';
import NavBar from '../NavBar/NavBar';
import { NavBarStyles } from "../../components/NavBar/NavbarBaseline.style"


type PageProps = {
  children: ReactNode;
};

function UploadPage({ children }: PageProps) {
    return (
    <>
    <NavBar isFixed={false} color="#000000" baseLine={NavBarStyles} />
    <Grid
      container
      component="main"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.7)), url(https://source.unsplash.com/random)',
        backgroundRepeat: 'non-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '95vh',
        minWidth:'50vh'
      }}
      >
      <Grid
        item
        xs={12}
        sm={10}
        md={9}
        lg={7}
        component={Paper}
        elevation={5}
        square
        sx={{
          position: 'relative', borderRadius: 8 }}
      >
        <Box />
                    
  
        {children}
      </Grid>
        </Grid>
        </>
  );
}

export default UploadPage;