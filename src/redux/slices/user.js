import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, fetchUsers, updateProfile, verifyUser } from "../thunks/books";


const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        }),
            builder.addCase(verifyUser.fulfilled, (state, action) => {

                const index = state.users.findIndex(user => user._id === action.payload._id);
                state.users[index] = action.payload;
            }),
            builder.addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user._id !== action.payload.id);
            }),
            builder.addCase(updateProfile.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user._id === action.payload.data._id);
                if (index >= 0) {

                    state.users[index] = action.payload.data;
                }
            })


    }
});

export default usersSlice.reducer;