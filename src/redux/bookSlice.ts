import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookState {
  selectedBook: any | null;
}

const initialState: BookState = {
  selectedBook: null,
};

// Create the slice
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setSelectedBook: (state, action: PayloadAction<any>) => {
      state.selectedBook = action.payload;
      // Persist the selected book in localStorage
      if (action.payload) {
        localStorage.setItem('selectedBook', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('selectedBook'); // Remove from localStorage if the book is unselected
      }
    },
    loadSelectedBookFromStorage: (state) => {
      // Check if there's a book in localStorage and set it as the selected book
      const storedBook = localStorage.getItem('selectedBook');
      if (storedBook) {
        state.selectedBook = JSON.parse(storedBook);
      }
    },
  },
});

// Export the actions
export const { setSelectedBook, loadSelectedBookFromStorage } = bookSlice.actions;

export default bookSlice.reducer;
