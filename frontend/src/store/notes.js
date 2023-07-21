import { createSlice } from "@reduxjs/toolkit";

const notes = createSlice({
    name: "notes",
    initialState: [],
    reducers: {
        addNotes: (state, action) => {
            state.push(action.payload);
            return state;
        },
        removeNote: (state, action) => {
            return state.filter((note) => note.id != action.payload)
        },
        sendNoteData: (state, action) => {
            return action.payload;
        },
    }
});

export const {addNotes, removeNote, sendNoteData} = notes.actions;

export default notes.reducer;