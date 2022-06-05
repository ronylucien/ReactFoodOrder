import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import React from 'react';
import Cart from "./components/Cart/Cart";
import {useSelector} from 'react-redux'

function App() {

  const showModal = useSelector(state => state.modal.showModal);
  
  return (
    <React.Fragment>
      {showModal && <Cart/>}
      <Header/>
      <main>
        <Meals/>
      </main>
    </React.Fragment>
  );
}

export default App;
