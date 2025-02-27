import { useState } from 'react';
import { Cart } from './features/cart/Cart';
import { currencyFilter } from './features/filters/filters';
import { Inventory } from './features/inventory/Inventory';
import './App.css'
import { inventoryData } from './features/inventory/data';


function App(props: any) {

  const { state, dispatch } = props;
  
  return (
    <>
      <div className='mainApp'>
        <p>Infinity Store</p>
        <div id='featured-outfits'></div>

        <Inventory 
          inventory={state.inventory}
          currencyFilter={'USD'}
          
          // currencyFilter={state.currencyFilter}
          searchTerm={""}
          dispatch={dispatch}
        />

        <Cart 
          cart={state.cart}
          currencyFilter={'USD'}
          // currencyFilter={state.currencyFilter}
          dispatch={dispatch}
        />

      </div>
     
    </>
  )
}

export default App
