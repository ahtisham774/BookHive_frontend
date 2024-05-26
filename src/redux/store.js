import { configureStore } from "@reduxjs/toolkit";
import books from "./slices/books";
import users from "./slices/user";


const store = configureStore({
    reducer: {
        books,
        users
    }
})

export default store;