import { createSlice } from "@reduxjs/toolkit";
import { createBook, deleteBook, fetchBooks, updateBook, verifyPost } from "../thunks/books";


const booksSlice = createSlice({
    name: "books",
    initialState: {
        books: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.books = action.payload.data;
        }),
            builder.addCase(createBook.fulfilled, (state, action) => {
                state.books.push(action.payload.data)
            }),
            builder.addCase(updateBook.fulfilled, (state, action) => {
                const index = state.books.findIndex(book => book._id === action.payload.data._id);
                state.books[index] = action.payload.data;
            }),
            builder.addCase(deleteBook.fulfilled, (state, action) => {
                state.books = state.books.filter(book => book._id !== action.payload.id);
            }),
            builder.addCase(verifyPost.fulfilled, (state, action) => {
                const index = state.books.findIndex(book => book._id === action.payload.data._id);
                if (index >= 0) {

                    state.books[index] = action.payload.data;
                }
            })


    }
});

export default booksSlice.reducer;