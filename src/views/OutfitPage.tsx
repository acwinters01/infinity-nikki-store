import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Cart } from '../components/cart/Cart';
import  { OutfitInventory } from '../components/outfitInventory/OutfitInventory';
import { SearchTerm } from '../components/searchTerm/SearchTerm';
import { AppDispatch, RootState } from '../store';


export const OutfitPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedOutfits = useSelector((state: RootState) => state.inventory.inventory);
    const searchTerm = useSelector((state: RootState) => state.searchTerm);
    const selectedLabels = useSelector((state: RootState) => state.labelFilter.selectedLabels);
    const currencyFilter = useSelector((state: RootState) => state.currencyFilter);
    const cart = useSelector((state: RootState) => state.cart);

    console.log(selectedOutfits)
    
    return (
        <div>
            <p>Outfit Page</p>

            <SearchTerm 
                searchTerm={searchTerm}
                dispatch={dispatch}
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

            <OutfitInventory 
                inventory={selectedOutfits}
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
    );
}

export default OutfitPage;