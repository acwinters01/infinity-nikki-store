import { Cart } from '../components/cart/Cart';
import { Inventory } from '../components/inventory/Inventory';
import { SearchTerm } from '../components/searchTerm/SearchTerm';
import FeaturedOutfits from '../components/featuredOutfits/FeaturedOutfits';
import { CurrencyFilter } from '../components/currencyFilter/CurrencyFilter';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import '../styles/App.css'

interface AppProps {
  state: RootState;
  dispatch: AppDispatch;
}

export const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart)
  const inventory = useSelector((state: RootState) => state.inventory.inventory);
  const currencyFilter = useSelector((state: RootState) => state.currencyFilter);
  const searchTerm = useSelector((state: RootState) => state.searchTerm);
  const selectedLabels = useSelector((state: RootState) => state.labelFilter.selectedLabels);
  return (
    <>
      <div className='mainApp'>
        <div id="header">
          <p id='title-page'>Infinity Store</p>

          <CurrencyFilter 
            dispatch={dispatch}
            currencyFilter={currencyFilter}
          />

          <FeaturedOutfits/>

        </div>

        <SearchTerm 
          searchTerm={searchTerm}
          dispatch={dispatch}
        />
        
        <Inventory 
          inventory={inventory}
          currencyFilter={currencyFilter}
          searchTerm={searchTerm}
          selectedLabels={selectedLabels}
          dispatch={dispatch}
        />

        <Cart 
          cart={cart}
          currencyFilter={currencyFilter}
          dispatch={dispatch}
        />
      </div>
    </>
  );
};

export default Home
