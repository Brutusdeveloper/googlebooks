// hooks/useFetchBooks.ts
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Book } from "../types/book";

const useFetchBooks = (searchTerm: string, category: string) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (searchTerm.trim() === "") {
      setAllBooks([]);
      setBooks([]);
      return;
    }

    debounceTimeout.current = setTimeout(() => {
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

  return { books, allBooks, loading };
};

export default useFetchBooks;
