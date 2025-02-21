import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const CategoryFilter = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  return (
    <FormControl sx={{ width: "600px", marginRight: "50px" }} margin="normal">
      <InputLabel>Filter by Category</InputLabel>
      <Select
        value={selectedCategory}
        label="Filter by Category"
        onChange={(e) => setSelectedCategory(e.target.value)}
        displayEmpty
      >
        <MenuItem value=""></MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
