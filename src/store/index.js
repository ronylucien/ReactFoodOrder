import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./ui-store";
import cartSlice from "./cart-store";

const store = configureStore({
    reducer : {modal : modalSlice.reducer, cart : cartSlice.reducer}
});

export default store;