import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SortFilter = ({ sortOrder, setSortOrder }) => {
  return (
    <FormControl sx={{ width: "600px" }} margin="normal">
      <InputLabel>Sort By Price</InputLabel>
      <Select
        value={sortOrder}
        label="Sort By Price"
        onChange={(e) => setSortOrder(e.target.value)}
        displayEmpty
      >
        <MenuItem value=""></MenuItem>
        <MenuItem value="asc">Price: Low to High</MenuItem>
        <MenuItem value="desc">Price: High to Low</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortFilter;
