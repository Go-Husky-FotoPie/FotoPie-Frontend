import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
    };
    
  const handleSubmit = (event) => {
    event.preventDefault();

    const baseURL = 'https://example.com/search?q=';
    const searchURL = `${baseURL}${encodeURIComponent(inputValue)}`;

    console.log('Search URL:', searchURL);
    window.location.href = searchURL;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs>
          <InputBase
            sx={{ ml: 1, width: '100%', minWidth: 250 }}
            placeholder="What type of photos can I look for you?"
            // inputProps={{ 'aria-label': 'search google maps' }}
            value={inputValue}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
}