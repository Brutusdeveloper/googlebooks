import React from 'react';
import styles from "../styles/pagination.module.scss"
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ page, setPage, totalPages }: { page: number; setPage: Function; totalPages: number }) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1); // Adjust for 0-indexed page
  };

  return <MuiPagination className={styles.paginationwrapper} count={totalPages} page={page + 1} onChange={handleChange} />;
};

export default Pagination;
