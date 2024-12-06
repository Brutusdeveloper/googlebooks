import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import styles from "../styles/Home.module.scss";
import { HeaderSearchProps } from "../types/headerSearch";

const HeaderSearch=({searchTerm, handleSearchChange, category, handleCategoryChange,categories }:HeaderSearchProps)=>{

    return(
        <div className={styles.headerLayer}>
        <div className={styles.iconLayer}>
          <img src="./pngtree.png" />
          <label className={styles.imglabel}>Book Search</label>
        </div>
        <div className={styles.searchfield}>
          <TextField
            size="small"
            label="Search Books"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <FormControl fullWidth className={styles.categorySelect}>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={handleCategoryChange} label="Category" size="small">
              {categories.map((category:any) => (
                <MenuItem key={category.categoryValue} value={category.categoryValue}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    )

}
export default HeaderSearch;