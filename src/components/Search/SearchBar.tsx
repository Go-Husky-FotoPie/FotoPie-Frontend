import React, { useState } from "react";
import { SxProps, Theme } from "@mui/system";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

interface SearchBarProps {
  sx?: SxProps<Theme>;
}

const SearchBar: React.FC<SearchBarProps> = ({ sx }) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      router.reload();
    } else {
    window.location.href =`/search/${encodeURIComponent(inputValue)}`;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={sx}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs>
          <InputBase
            sx={{ ml: 1, width: "100%", minWidth: 250, fontSize:{xs:"0.9rem",sm:"1.3rem"} }}
            placeholder="What type of photos can I look for you?"
            value={inputValue}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBar;
