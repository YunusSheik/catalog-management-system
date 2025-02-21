import React from "react";
import { TextField } from "@mui/material";

const SearchFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextField
      label="Search Products"
      variant="outlined"
      sx={{ width: "1250px" }}
      margin="normal"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchFilter;
