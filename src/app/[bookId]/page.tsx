"use client";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../../redux/store';
import { loadSelectedBookFromStorage } from '../../redux/bookSlice';
import { Box, Typography, Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Image from 'next/image';
import styles from '../../styles/BookDetails.module.scss';
import Spinner from '../../components/Spinner';

const BookDetails: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedBook = useSelector((state: RootState) => state.book.selectedBook);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    dispatch(loadSelectedBookFromStorage());
  }, [dispatch]);

  if (!isClient || !selectedBook) {
    return <Spinner/>;
  }

  const { title, authors, description, imageLinks } = selectedBook.volumeInfo;

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Back Button */}
      <div className={styles.backButton}>
        <Button
          variant="outlined"
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => router.push('/')} 
        >
          Back Home
        </Button>
      </div>
      <div className={styles.bookDetailsContainer}>
        {/* Book Image */}
        {imageLinks?.thumbnail && (
          <div className={styles.imageWrapper}>
            <Image
              src={imageLinks.thumbnail}
              alt={title}
              width={400} 
              height={400} 
              className={styles.bookImage}
            />
          </div>
        )}
        <div className={styles.textContent}>
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
