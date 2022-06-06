import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import React from 'react';
import Cart from "./components/Cart/Cart";
import {useSelector} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import Users from "./pages/Users";
import MealForm from "./pages/MealForm";

function App() {

  const showModal = useSelector(state => state.modal.showModal);
  
  return (
    <React.Fragment>
      {showModal && <Cart/>}
      <Header/>
      <main>
        <Switch>
        <Route path="/users"><Users/></Route>
        <Route path="/meals"><MealForm/></Route>   
        <Route path="/" exact><Meals/></Route>  
        </Switch>   
      </main>
    </React.Fragment>
  );
}

export default App;
