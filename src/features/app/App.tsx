import React from 'react';
import { Cart } from '../cart/Cart';
import { Inventory } from '../inventory/Inventory';
import { SearchTerm } from '../searchTerm/SearchTerm';
import { Filters } from '../filters/Filters';
import { CurrencyFilter } from '../filters/currencyFilter/CurrencyFilter';
import './App.css'


function App(props: any) {

  const { state, dispatch } = props;
  
  return (
    <>
      <div className='mainApp'>
        <div id="header">
          <p id='title-page'>Infinity Store</p>

          <CurrencyFilter 
            dispatch={dispatch}
            currencyFilter={state.currencyFilter}
          />

          <div className='tabs-container'>
              <ul id='all-tabs'>
                <li id="tab">Clothing</li>
                <li id="tab">Outfit</li>
                <li id="tab">Makeup</li>
                <li id="tab">Eureka</li>
              </ul>
          </div>
          <div className='featured-outfits'>
            <img src='./src/assets/featuredBanners/featuredOutfit-WishfulAurosa1.png'/>
          </div>
        </div>

        <Filters/>
        <SearchTerm 
          searchTerm={state.searchTerm}
          dispatch={dispatch}
        />
        
        <Inventory 
          inventory={state.inventory}
          currencyFilter={state.currencyFilter}
          searchTerm={state.searchTerm}
          dispatch={dispatch}
        />

        <Cart 
          cart={state.cart}
          currencyFilter={state.currencyFilter}
          dispatch={dispatch}
        />
      </div>
    </>
  )
}

export default App
