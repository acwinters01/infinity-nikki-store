import React, { useState } from 'react';
import { Cart } from '../cart/Cart';
import { Inventory } from '../inventory/Inventory';
import { SearchTerm } from '../searchTerm/SearchTerm';
import { LabelFilter } from '../filters/labelFilter/LableFilter';
import { CurrencyFilter } from '../filters/currencyFilter/CurrencyFilter';
import './App.css'


function App(props: any) {

  const { state, dispatch } = props;
    const [filterMenu, setFilterMenu] = useState<boolean>(false)
  
  
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

        

        <SearchTerm 
          searchTerm={state.searchTerm}
          dispatch={dispatch}
        />

        <LabelFilter
          dispatch={dispatch}
          inventory={state.inventory}
        />
        
        <Inventory 
          inventory={state.inventory}
          currencyFilter={state.currencyFilter}
          searchTerm={state.searchTerm}
          selectedLabels={state.labelFilter.selectedLabels}
          dispatch={dispatch}
          filterMenu={filterMenu}
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
