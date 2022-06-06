import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./ui-store";
import cartSlice from "./cart-store";
import authSlice from "./auth-store";

const store = configureStore({
    reducer : {
        modal : modalSlice.reducer, 
        cart : cartSlice.reducer, 
        auth : authSlice.reducer
    }
});

export default store;