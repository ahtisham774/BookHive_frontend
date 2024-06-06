import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, postWithoutForm, put } from "../../hooks/fetch";
import { url } from "../../routes/url";


export const fetchBooks = createAsyncThunk(
    "fetchAllBooks",
    async () => await get(url.ALL_BOOKS)
)



export const createBook = createAsyncThunk(
    "createBook",
    async (data) => await post(url.CREATE_BOOK, data)
)
export const updateBook = createAsyncThunk(
    "updateBook",
    async (data) => await post(url.UPDATE_BOOK, data)
)
export const deleteBook = createAsyncThunk(
    "deleteBook",
    async (data) => await put(url.DELETE_BOOK, data)
)

export const fetchUsers = createAsyncThunk(
    "fetchAllUsers",
    async () => await get(url.ALL_USERS)
)


export const verifyUser = createAsyncThunk(
    "verifyUser",
    async (data) => await postWithoutForm(url.VERIFY_USER, data)
)
export const verifyPost = createAsyncThunk(
    "verifyPost",
    async (data) => await postWithoutForm(url.VERIFY_POST, data)
)
export const updateProfile = createAsyncThunk(
    "updateProfile",
    async (data) => await post(url.UPDATE_PROFILE, data)
)
export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (data) => await put(url.DELETE_USER, data)
)