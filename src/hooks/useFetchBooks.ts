import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Book } from "../types/book";

interface UseFetchBooksResult {
  books: Book[];
  allBooks: Book[];
  loading: boolean;
  fetchBooks: (searchTerm: string, category: string) => void;
}

const useFetchBooks = (): UseFetchBooksResult => {
  const [books, setBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchBooks = async (searchTerm: string, category: string) => {
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

  // Debounce the API request
  const handleDebouncedFetch = (searchTerm: string, category: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setAllBooks([]);
        setBooks([]);
        return;
      }
      fetchBooks(searchTerm, category);
    }, 500);
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return {
    books,
    allBooks,
    loading,
    fetchBooks: handleDebouncedFetch,
  };
};

export default useFetchBooks;
