"use client";
import { useState, useEffect, Fragment } from "react";
import { Box, Typography, Pagination, SelectChangeEvent } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Book } from "../types/book";
import BookCard from "../components/BookCard";
import styles from "../styles/Home.module.scss";
import HeaderSearch from "../components/HeaderSearch";
import Spinner from "../components/Spinner";
import { categories } from "../constants/categories";
import useFetchBooks from "../hooks/useFetchBooks"; // Import custom hook

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("fiction");
  const [page, setPage] = useState<number>(1);
  const [isClient, setIsClient] = useState(false); // To track whether we're on the client

  const { books, allBooks, loading } = useFetchBooks(searchTerm, category); // Use the custom hook

  // Load data from localStorage on client mount
  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      const savedSearchTerm = localStorage.getItem('searchTerm');
      const savedCategory = localStorage.getItem('category');
      const savedPage = localStorage.getItem('page');

      if (savedSearchTerm) setSearchTerm(savedSearchTerm);
      if (savedCategory) setCategory(savedCategory);
      if (savedPage) setPage(Number(savedPage));
    }
  }, []);

  // Save data to localStorage whenever the searchTerm, category, or page changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('searchTerm', searchTerm);
      localStorage.setItem('category', category);
      localStorage.setItem('page', String(page));
    }
  }, [searchTerm, category, page, isClient]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setCategory(e.target.value as string);
  };

  const booksPerPage = 8;
  const paginatedBooks = allBooks.slice((page - 1) * booksPerPage, page * booksPerPage);

  // Show loading spinner before client-side state is initialized
  if (!isClient) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <HeaderSearch 
        searchTerm={searchTerm} 
        handleSearchChange={handleSearchChange} 
        category={category} 
        handleCategoryChange={handleCategoryChange} 
        categories={categories} 
      />
      <div className={styles.container}>
        {/* Display Loading */}
        {loading ? (
          <Spinner />
        ) : (
          <>
            {paginatedBooks.length > 0 ? (
              <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 12 }} className={styles.gridContainer}>
                {paginatedBooks.map((book) => (
                  <Grid columns={{ xs: 4, sm: 4, md: 12 }} key={book.id}>
                    <BookCard book={book} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="h6" className={styles.noBooks}>
                No books found
              </Typography>
            )}
          </>
        )}

        {paginatedBooks.length > 0 && !loading && (
          <Box className={styles.paginationWrapper}>
            <Pagination
              count={Math.ceil(allBooks.length / booksPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              disabled={loading}
            />
          </Box>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
