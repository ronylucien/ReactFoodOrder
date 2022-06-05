
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : 'cart',
    initialState : {cartItems: [], updateCart : false},
    reducers : {
        addToCart(state, action){
            addToCart(state.cartItems, action.payload);
            state.updateCart = true;
        },
        removeFromCart(state, action){
            removeFromCart(state.cartItems, action.payload);
            state.updateCart = true;
        },
        clearCart(state){
            state.cartItems = [];
            state.updateCart = true;
        },
        initCart(state, action){
            state.cartItems = action.payload;
            state.updateCart = false;
        },

    }
});

const addToCart = (cartItems, meal) => { 
    const existingMealIndex = cartItems.findIndex( el => el.id === meal.id);
    if(existingMealIndex!==-1){
        cartItems[existingMealIndex].qty = parseInt(cartItems[existingMealIndex].qty) + parseInt(meal.qty);
    }else{
        cartItems.push(meal);
    }        
}

const removeFromCart = (cartItems, id) => {
    const existingMealIndex = cartItems.findIndex( el => el.id === id);
    if(existingMealIndex!==-1){
        if (+cartItems[existingMealIndex].qty === 1) {
            cartItems.splice(existingMealIndex);
        } else {
            cartItems[existingMealIndex].qty = cartItems[existingMealIndex].qty - 1;
        }
    }
}

export const cartActions = cartSlice.actions;

export default cartSlice;