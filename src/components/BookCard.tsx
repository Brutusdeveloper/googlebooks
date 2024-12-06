import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSelectedBook } from '../redux/bookSlice';

const BookCard = ({ book }: { book: any }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleViewDetails = () => {
        dispatch(setSelectedBook(book));
        router.push(`/${book.id}`);
    };

    return (
        <Card>
            <CardMedia
                component="img"
                alt={book.volumeInfo.title}
                height="250"
                image={book.volumeInfo.imageLinks?.thumbnail || "/default-book-image.jpg"}
            />
            <CardContent>
                <Typography variant="h6">{book.volumeInfo.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                </Typography>

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleViewDetails}
                >
                    View Details
                </Button>
            </CardContent>
        </Card>
    );
};

export default BookCard;
