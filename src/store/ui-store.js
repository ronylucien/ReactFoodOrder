import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name : 'modal',
    initialState : {showModal : false},
    reducers : {
        toggle(state){
            state.showModal = !state.showModal;
        }
    }
});

export const modalActions = modalSlice.actions;

export default modalSlice;