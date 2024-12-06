"use client";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../../redux/store';
import { setSelectedBook, loadSelectedBookFromStorage } from '../../redux/bookSlice';
import { Box, Typography, Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Image from 'next/image';
import styles from '../../styles/BookDetails.module.scss';

const BookDetails: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedBook = useSelector((state: RootState) => state.book.selectedBook);

  const [isClient, setIsClient] = useState(false);

  // Ensure that we are on the client-side by using useEffect
  useEffect(() => {
    setIsClient(true);

    // Load the book from localStorage if it's not already in the Redux store
    dispatch(loadSelectedBookFromStorage());
  }, [dispatch]);

  // If the component is not yet rendered on the client, or no book is selected, display a loading state
  if (!isClient || !selectedBook) {
    return <Typography variant="h6" style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</Typography>;
  }

  const { title, authors, description, imageLinks } = selectedBook.volumeInfo;

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Back Button */}
      <div className={styles.backButton}>
        <Button
          variant="outlined"
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => router.push('/')} // Navigate to the home page
        >
          Back Home
        </Button>
      </div>
      <div className={styles.bookContainer}>
        {/* Book Image */}
        {imageLinks?.thumbnail && (
          <div className={styles.imageContainer}>
            <Image
              src={imageLinks.thumbnail}
              alt={title}
              width={400} // Adjust the width for larger screens
              height={400} // Default height; maintain aspect ratio
              className={styles.bookImage}
            />
          </div>
        )}
        {/* Book Info */}
        <div>
          <Typography variant="h4" className={styles.bookTitle}>
            {title}
          </Typography>
          <Typography variant="h6" className={styles.bookAuthors}>
            <strong>{authors?.join(', ')}</strong>
          </Typography>
          <Typography variant="body1" className={styles.bookDescription}>
            {description}
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default BookDetails;
