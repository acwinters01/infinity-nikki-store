import { Cart } from '../components/cart/Cart';
import { Inventory } from '../components/inventory/Inventory';
import { SearchTerm } from '../components/searchTerm/SearchTerm';
import FeaturedOutfits from '../components/featuredOutfits/FeaturedOutfits';
import { CurrencyFilter } from '../components/currencyFilter/CurrencyFilter';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import '../styles/App.css'


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
          <div className='tabs-container'>
                <ul id='all-tabs'>
                    <li id="tab">
                        <Link to="/">Home</Link>
                    </li>
                    <li id="tab">
                        <Link to="/OutfitPage">Outfits</Link>
                    </li>
                    <li id="tab">
                        <Link to="/EurekaPage">Eureka</Link>
                    </li>
                    <li id="tab">
                        <Link to="/Form">Form</Link>
                    </li>
                </ul>
          </div>
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
