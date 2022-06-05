import React, {useEffect, useMemo} from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import useHttp from '../../hooks/use-http';


const transformedData  = [];

const transformData = data => { 
    for(let key in data){
        transformedData.push({id : key, name:data[key].name, description : data[key].description, price: data[key].price});
    }
};

const AvailableMeals = props => {
    
    const reqConfig  = useMemo(() => {return {url:'https://reactcourse-92de6-default-rtdb.firebaseio.com/meals.json'}}, []);

    const {hasError, isLoading, sendRequest:fetchMeals} = useHttp(transformData);  
    

    useEffect(() => {
        fetchMeals(reqConfig);
    }, [fetchMeals, reqConfig]);

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