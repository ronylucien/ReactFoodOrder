import classes from './Input.module.css';
import React, { useRef, useImperativeHandle } from 'react';

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();
    const getValue = () => {
        return inputRef.current.value;
    }
    useImperativeHandle(ref , () => {
        return {getValue : getValue};
    })
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input} ref={inputRef}/>
        </div>
    )
});

export default Input;