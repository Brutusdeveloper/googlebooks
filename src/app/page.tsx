"use client";

import { useState, useEffect, Fragment, useRef } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Pagination,
  SelectChangeEvent,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Book } from "../types/book";
import { Category } from "../types/category";
import BookCard from "../components/BookCard";
import styles from "../styles/Home.module.scss";
import HeaderSearch from "../components/HeaderSearch";
import Spinner from "../components/Spinner";

const categories: Category[] = [
  { categoryName: "Fiction", categoryValue: "fiction" },
  { categoryName: "History", categoryValue: "history" },
  { categoryName: "Comics", categoryValue: "comics" },
];

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(localStorage.getItem('searchTerm') || "");
  const [category, setCategory] = useState<string>(localStorage.getItem('category') || "fiction");
  const [page, setPage] = useState<number>(Number(localStorage.getItem('page')) || 1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false); // To track whether we're on the client
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('category', category);
    localStorage.setItem('page', String(page));
  }, [searchTerm, category, page]);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to delay the API call
    debounceTimeout.current = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setAllBooks([]);
        setBooks([]);
        return;
      }

      const fetchBooks = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&subject=${category}&startIndex=0&maxResults=30`
          );
          setAllBooks(response.data.items || []);
        } catch (error) {
          console.error("Error fetching books:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    }, 500); // 500ms debounce delay
  }, [searchTerm, category]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setCategory(e.target.value as string);
  };

  const booksPerPage = 7;
  const paginatedBooks = allBooks.slice((page - 1) * booksPerPage, page * booksPerPage);

  if (!isClient) {
    return <div className={styles.spinnerContainer}><div className={styles.spinner}></div></div>;
  }

  return (
    <Fragment>
      <HeaderSearch searchTerm={searchTerm} handleSearchChange={handleSearchChange} category= {category} handleCategoryChange = {handleCategoryChange} categories= {categories} />
      <div className={styles.container}>
        {/* Display Loading */}
        {loading 
        ? <Spinner/>
        : (
          <>
            {paginatedBooks.length > 0 ? (
              <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 12 }}>
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
