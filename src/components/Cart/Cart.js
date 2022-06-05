import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import { Fragment, useState } from 'react';
import CartItem from './CartItem';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../../store/ui-store';
import { cartActions } from '../../store/cart-store';

const getReqConfig = (userData, meals) => {
    return {
        url: 'https://reactcourse-92de6-default-rtdb.firebaseio.com/orders.json',
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: { ...userData, meals: meals }
    }
}



const Cart = () => {

    const [checkout, setCheckout] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const onRemoveHandler = id => {
        dispatch(cartActions.removeFromCart(id));
    }

    const onAddHandler = item => {
        dispatch(cartActions.addToCart({ ...item, qty: 1 }));
    }

    const hasItems = cartItems.length > 0;

    const cartItemsComp = (
        <ul className={classes['cart-items']}>
            {cartItems.map(item => { return <CartItem key={item.id} item={item} onRemove={onRemoveHandler.bind(null, item.id)} onAdd={onAddHandler.bind(null, item)} /> })}
        </ul>
    );

    const getTotalAmount = cartItems.reduce((currentNumber, meal) => {
        return currentNumber + meal.qty * meal.price;
    }, 0);

    const orderClickHandler = () => {
        setCheckout(true);
    }

    const cancelCheckoutHandler = () => {
        setCheckout(false);
    }

    const afterOrderConfirm = () => {
        dispatch(cartActions.clearCart());
        setSubmitted(true);
    }

    const closeModalHandler = event => {
        dispatch(modalActions.toggle());
    }

    const { hasError, isLoading, sendRequest: postOrder } = useHttp(afterOrderConfirm);

    const confirmCheckoutHandler = (userData) => {
        postOrder(getReqConfig(userData, cartItems));
    }

    const cartContent = (
        <Fragment>
            {cartItemsComp}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>$ {getTotalAmount.toFixed(2)}</span>
            </div>
            {!checkout &&
                <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={closeModalHandler}>Close</button>
                    {hasItems && <button className={classes['button']} onClick={orderClickHandler}>Order</button>}
                </div>
            }
            {checkout && <Checkout onCancel={cancelCheckoutHandler} onConfirm={confirmCheckoutHandler} />}
        </Fragment>
    );

    const submitContent = (
        <Fragment>
            <p>Your order has been submitted successfully ! Thanks for using our services !</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={closeModalHandler}>Close</button>
            </div>
        </Fragment>
    );


    return (
        <Modal>
            {isLoading && <p>Submitting your order</p>}
            {!isLoading && !hasError && !submitted && cartContent}
            {!isLoading && hasError && <p>An error occured while submitting your order</p>}
            {!isLoading && !hasError && submitted && submitContent}
        </Modal>
    )
}

export default Cart;