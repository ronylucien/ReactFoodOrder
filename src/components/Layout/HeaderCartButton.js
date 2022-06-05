import { useState, useEffect } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {modalActions} from '../../store/index';

const HeaderCartButton = () => {
    
    const [highlightBtn, setHighlightBtn] = useState(false);

    const cartItems = useSelector(state => state.cart.cartItems);
    
    const btnClasses = `${classes.button} ${highlightBtn? classes.bump : ''}`;

    const dispatch = useDispatch();

    useEffect(() => {
        if(cartItems.length === 0){
            return;
        }
        setHighlightBtn(true);

        const timer = setTimeout(() => {
            setHighlightBtn(false);
        }, 300)

        return () => {
            clearTimeout(timer);
        }
    }, [cartItems]);

    const numberOfCartItems = cartItems.reduce((currentNumber, item) => {
        return currentNumber + parseInt(item.qty);
    }, 0);

    const viewCartHandler = () => {
        dispatch(modalActions.toggle());
    }

    return (
        
        <button className={btnClasses} onClick={viewCartHandler}>
            <span className={classes.icon}><CartIcon/></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>            
       
    )
}

export default HeaderCartButton;