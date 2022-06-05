import React, {useCallback, useEffect, useMemo} from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import useHttp from '../../hooks/use-http';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-store';


const transformedData  = [];

const transformData = data => { 
    for(let key in data){
        transformedData.push({id : key, name:data[key].name, description : data[key].description, price: data[key].price});
    }
};

let isFirstLoad = true;

const getPutReqConfig = (cartItems) => {
    return {
        url: 'https://reactcourse-92de6-default-rtdb.firebaseio.com/cart.json',
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: { items : cartItems }
    }
}

const AvailableMeals = () => {

    const cartItems = useSelector(state => state.cart.cartItems);
    const updateCart = useSelector(state => state.cart.updateCart);

    const { sendRequest: persistCart } = useHttp(useCallback(() => {}, []));
    
    useEffect(() => {
        console.log('Effect running', isFirstLoad, updateCart)
        if(!isFirstLoad && updateCart){
            persistCart(getPutReqConfig(cartItems));
        }else{            
            isFirstLoad = false;
        }
    }, [persistCart, cartItems, updateCart]);
    
    const dispatch = useDispatch();
    const reqConfig  = useMemo(() => {return {url:'https://reactcourse-92de6-default-rtdb.firebaseio.com/meals.json'}}, []);
    const reqConfigCart  = useMemo(() => {return {url:'https://reactcourse-92de6-default-rtdb.firebaseio.com/cart.json'}}, []);

    const onCartLoaded = useCallback( (data) => {
        dispatch(cartActions.initCart(data.items));
    }, [dispatch]);

    const {hasError, isLoading, sendRequest:fetchMeals} = useHttp(transformData);  
    const {sendRequest:fetchCart} = useHttp(onCartLoaded);  
    

    useEffect(() => {
        fetchMeals(reqConfig);
        fetchCart(reqConfigCart);
    }, [fetchMeals, fetchCart, reqConfig, reqConfigCart]);

    return (
        <section className={classes.meals}>
        <Card>
            <ul>
                {isLoading && <p>Loading Meals...</p>}
                {hasError && <p>Error Loading Data...</p>}
                {transformedData.length>0 && transformedData.map(meal => { return [ <MealItem key={meal.id} meal={meal}/> ] } )}
                {transformedData.length===0 && !isLoading && !hasError && <p>No Meals found</p>}
            </ul>
        </Card>
        </section>
    )
}

export default AvailableMeals;