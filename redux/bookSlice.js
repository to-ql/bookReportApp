import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
    name: "book", // 리듀서 이름
    initialState: { // 데이터의 초기값
        books: [],
        selectedBook: null,
    }, 
    reducers: { // 상태가 변하면 어떻게 실행될지
        addBook: (state, action) => {
            const newBook = action.payload;
            const { authors, isbn, thumbnail, title, readingStatus } = newBook;
          
            const updatedBooks = [
              ...state.books,
              {
                authors,
                isbn,
                thumbnail,
                title,
                readingStatus,
              },
            ];
          
            state.books = updatedBooks;
        },

        deleteBook: (state, action) => {
            const isbn = action.payload;
            state.books = state.books.filter((book) => book.isbn !== isbn);
        },

        setSelectedBook: (state, action) => {
            state.selectedBook = action.payload;
        },

        addPreContent: (state, action) => {
            const { isbn, newReportData } = action.payload;
            const book = state.books.find((thisBook) => thisBook.isbn === isbn);

            if(book) {
                book.content = {
                    preContent : {
                        report: newReportData.preReport,
                        date: newReportData.date,
                    }
                }  
            }
        },

        addCurrContent: (state, action) => {
            const { isbn, newReportData } = action.payload;
            const book = state.books.find((thisBook) => thisBook.isbn === isbn);

            if(book) {
                book.content = {
                    ...book.content,
                    currContent: {
                      report: newReportData.currReport,
                      date: newReportData.date,
                    },
                  };
            }
        }
    },
});

export const { addBook, deleteBook, setSelectedBook, addPreContent, addCurrContent } = bookSlice.actions;
export default bookSlice.reducer;