import { configureStore, createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name : 'modal',
    initialState : {showModal : false},
    reducers : {
        toggle(state){
            state.showModal = !state.showModal;
        }
    }
});

const cartSlice = createSlice({
    name : 'cart',
    initialState : {cartItems: []},
    reducers : {
        addToCart(state, action){
            state.cartItems = addToCart(state.cartItems, action.payload);
        },
        removeFromCart(state, action){
            state.cartItems = removeFromCart(state.cartItems, action.payload);
        },
        clearCart(state){
            state.cartItems = [];
        },

    }
});

// const storeReducer = (state = initialState, action) => {
//     if(action.type === 'toggleModal'){
//         return {showModal: !state.showModal, cartItems : state.cartItems}
//     }

//     if(action.type === 'addToCart'){
//         const newItems = addToCart(state.cartItems, action.meal);
//         return {showModal: state.showModal, cartItems : newItems}
//     }

//     if(action.type === 'removeFromCart'){
//         const newItems = removeFromCart(state.cartItems, action.id);
//         return {showModal: state.showModal, cartItems : newItems}
//     }

//     if(action.type === 'clearCart'){
//         return {showModal: state.showModal, cartItems : []}
//     }

//     return state
// }

const addToCart = (cartItems, meal) => {  
    const items = [...cartItems];
    const existingMealIndex = items.findIndex( el => el.id === meal.id);
    if(existingMealIndex!==-1){
        items[existingMealIndex].qty = parseInt(items[existingMealIndex].qty) + parseInt(meal.qty);
        return items;
    }else{
        return [...cartItems, meal];
    }        
}

const removeFromCart = (cartItems, id) => {
    const items = [...cartItems];
    const existingMealIndex = items.findIndex( el => el.id === id);
    if(existingMealIndex!==-1){
        if (+items[existingMealIndex].qty === 1) {
            items.splice(existingMealIndex);
        } else {
            items[existingMealIndex].qty = items[existingMealIndex].qty - 1;
        }
    }
    return items;
}

//const store = createStore(storeReducer);

const store = configureStore({
    reducer : {modal : modalSlice.reducer, cart : cartSlice.reducer}
});

export const modalActions = modalSlice.actions;
export const cartActions = cartSlice.actions;

export default store;