import { Cart } from '../components/cart/Cart';
import { Inventory } from '../components/inventory/Inventory';
import { SearchTerm } from '../components/searchTerm/SearchTerm';
import FeaturedOutfits from '../components/featuredOutfits/FeaturedOutfits';
import { CurrencyFilter } from '../components/currencyFilter/CurrencyFilter';
import { AppDispatch, RootState } from '../store';
import '../styles/App.css'

interface AppProps {
  state: RootState;
  dispatch: AppDispatch;
}

export const Home: React.FC<AppProps> = ({ state, dispatch }) => {
  return (
    <>
      <div className='mainApp'>
        <div id="header">
          <p id='title-page'>Infinity Store</p>
          <CurrencyFilter 
            dispatch={dispatch}
            currencyFilter={state.currencyFilter}
          />
          <FeaturedOutfits/>

        </div>

        <SearchTerm 
          searchTerm={state.searchTerm}
          dispatch={dispatch}
        />
        
        <Inventory 
          inventory={state.inventory}
          currencyFilter={state.currencyFilter}
          searchTerm={state.searchTerm}
          selectedLabels={state.labelFilter.selectedLabels}
          dispatch={dispatch}
        />

        <Cart 
          cart={state.cart}
          currencyFilter={state.currencyFilter}
          dispatch={dispatch}
        />
      </div>
    </>
  );
};

export default Home
