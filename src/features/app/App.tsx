import { useState } from 'react';
import { Cart } from '../cart/Cart';
import { Inventory } from '../inventory/Inventory';
import { SearchTerm } from '../searchTerm/SearchTerm';
import { currencyFilter } from '../filters/filtersSlice';
import './App.css'


function App(props: any) {

  const { state, dispatch } = props;
  
  return (
    <>
      <div className='mainApp'>
        <div id="header">
          <p>Infinity Store</p>
          <div className='featured-outfits'>
            <img src='./src/assets/featuredBanners/featuredOutfit-WishfulAurosa1.png'/>
          </div>
          <div className='tabs-container'>
            <ul id='all-tabs'>
              <li id="tab">Clothing</li>
              <li id="tab">Outfit</li>
              <li id="tab">Makeup</li>
              <li id="tab">Eureka</li>
            </ul>
          </div>
        </div>

        <SearchTerm 
          searchTerm={state.searchTerm}
          dispatch={dispatch}
        />
        
        <Inventory 
          inventory={state.inventory}
          currencyFilter={'USD'}
          // currencyFilter={state.currencyFilter}
          searchTerm={state.searchTerm}
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
