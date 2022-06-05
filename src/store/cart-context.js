import React, { useState } from 'react';

const CartContext = React.createContext({
    showModal: false,
    viewCartHandler: () => { },
    hideCartHandler: () => { },
    cartItems: [],
    addToCartHandler: () => { },
    removeFromCartHandler: () => { },
    clearCartHandler : () => {}
});

export const CartContextProvider = props => {

    const [viewModal, setViewModal] = useState(false);
    const [cartItems, setCartItems] = useState([]);


    const viewCartHandler = () => {
        setViewModal(true);
    }

    const hideCartHandler = () => {
        setViewModal(false);
    }

    const clearCartHandler = () => {
        setCartItems([]);
    }

    const addToCartHandler = meal => {        
        const items = [...cartItems];
        const existingMealIndex = items.findIndex( el => el.id === meal.id);
        if(existingMealIndex!==-1){
            items[existingMealIndex].qty = parseInt(items[existingMealIndex].qty) + parseInt(meal.qty);
            setCartItems(items);
        }else{
            setCartItems([...cartItems, meal]);
        }        
    }

    const removeFromCartHandler = id => {
        const items = [...cartItems];
        const existingMealIndex = items.findIndex( el => el.id === id);
        if(existingMealIndex!==-1){
            if (+items[existingMealIndex].qty === 1) {
                items.splice(existingMealIndex);
            } else {
                items[existingMealIndex].qty = items[existingMealIndex].qty - 1;
            }
        }
        setCartItems(items);
    }

    return (
        <CartContext.Provider
            value={{
                showModal: viewModal,
                viewCartHandler: viewCartHandler,
                hideCartHandler: hideCartHandler,
                cartItems: cartItems,
                addToCartHandler: addToCartHandler,
                removeFromCartHandler: removeFromCartHandler,
                clearCartHandler : clearCartHandler
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext;