import {createSlice} from "@reduxjs/toolkit";

const users = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
            return state;
        },
        removeUser: (state, action) => {
            return state.filter((user) => user.id != action.payload)
        },
        sendUserData: (state, action) => {
            return action.payload;
        },
    }
});

export const {addUser, removeUser, sendUserData} = users.actions;

export default users.reducer;