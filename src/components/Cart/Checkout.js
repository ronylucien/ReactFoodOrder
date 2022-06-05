import classes from './Checkout.module.css';
import {useRef, useState} from 'react';


const isValid = value => { return value.trim().length>0 }

const Checkout = props => {

    const [inputValidity, setInputValidity] = useState({nameisValid : true, cityIsValid : true, streetIsValid : true, postalCodeisValid : true});

    const nameRef = useRef();
    const streetRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();


    const submitHandler = event => {
        event.preventDefault();
        const name = nameRef.current.value;
        const street = streetRef.current.value;
        const city = cityRef.current.value;
        const postalCode = postalCodeRef.current.value;

        const nameIsValid = isValid(name);
        const streetIsValid = isValid(street);
        const cityIsValid = isValid(city);
        const postalCodeIsValid = isValid(postalCode);

        if(nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid){
            props.onConfirm({name : name, street : street, city:city, postalCode : postalCode});
        }else{
            setInputValidity({nameisValid : nameIsValid, cityIsValid : cityIsValid, streetIsValid : streetIsValid, postalCodeisValid : postalCodeIsValid});
        }
    }


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={`${classes.control} ${!inputValidity.nameisValid?classes.invalid:''}`}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameRef}/>
                {!inputValidity.nameisValid && <p>Please Enter a valid name</p>}
            </div>
            <div className={`${classes.control} ${!inputValidity.streetIsValid?classes.invalid:''}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetRef}/>
                {!inputValidity.streetIsValid && <p>Please Enter a valid street</p>}
            </div>
            <div className={`${classes.control} ${!inputValidity.postalCodeisValid?classes.invalid:''}`}>
                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" id="postalCode" ref={postalCodeRef}/>
                {!inputValidity.postalCodeisValid && <p>Please Enter a valid postal code</p>}
            </div>
            <div className={`${classes.control} ${!inputValidity.cityIsValid?classes.invalid:''}`}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityRef}/>
                {!inputValidity.cityIsValid && <p>Please Enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;