import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack'

export default function Header() {

  return (

      <Stack
      component='div'
      sx={{ 
        flexGrow: 1,
        Height: 300,
        width: '100%',
      }}
      >

        <Box
          sx={{
            mt:8,
            ml:'auto',
            mr:'auto',
            display:'flex',
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'flex-start',
          }}
        >
          <Typography  
            variant="subtitle2" 
            align='center' 
            display='inline'  
            color='#FFFFFF'
            sx={{ fontSize: 22, fontFamily: 'inherit', textAlign: 'left'}}
          >
            Start shining.<br/>
            Start earning.<br/>
            With your beloved shots.
          </Typography>
          
          <Paper
            component="form"
            sx={{ 
              p: '2px 4px', 
              display: 'flex', 
              alignItems: 'center', 
              width: '100%', 
              mb: 15, 
              mt:2,
              '@media (min-width: 600px)': {
                width: 500,
              }
            }}
          >

            <InputBase
              sx={{ ml: 1, flex: 1}}
              placeholder="What type of photos can I look for you?"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>

          </Paper>
        </Box>
      </Stack>

  )
}
