import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import {useRef} from 'react';
import { useDispatch } from 'react-redux';
import { cartActions} from '../../../store/index';

const MealItemForm = props => {

    const amountRef = useRef();

    const dispatch = useDispatch();

    const submitHandler = event => {
        event.preventDefault();
        dispatch(cartActions.addToCart({...props.meal, qty : amountRef.current.getValue()}));
        //dispatch({type:'addToCart', meal:});
    }


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label='Amount' ref={amountRef} input={{id:props.id, type:'number', min:'1', max:'5', step:'1', defaultValue:'1'}}/>
            <button type='submit'>+ Add</button>
        </form>
    )
}

export default MealItemForm;