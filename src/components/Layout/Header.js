import classes from './Header.module.css'
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'
import React from 'react';

const Header = props => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>React Food Order</h1>
                <HeaderCartButton onViewCart={props.onViewCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='A table full' />
            </div>
        </React.Fragment>

    )
}

export default Header;