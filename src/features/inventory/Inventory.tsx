import React, { useEffect } from 'react';
import { calculatePrice, getCurrencySymbol, getFilteredItems, Item } from '../../utilities/utilities';
import { loadData } from '../inventory/inventorySlice';
import { addItem } from '../cart/cartSlice';
import './inventory.css'



type InventoryProps = {
    inventory: Item[];    
    currencyFilter: string;  
    dispatch?: any;  
    searchTerm: string;
};


  
export const Inventory: React.FC<InventoryProps> = ({ inventory, currencyFilter, dispatch, searchTerm }) => {

    useEffect(() => {
        if (dispatch) {
            dispatch(loadData())
        }
    }, [dispatch])  

    const handleOnClick = (inventoryItem: Item) => {
        dispatch(addItem(inventoryItem));
    };

    if (inventory.length === 0) {
        return <p id="all-products-sold-label">SOLD OUT!</p>
    }

    const filteredItems = getFilteredItems(inventory, searchTerm);

    return (
        <ul id="inventory-container">
           {filteredItems.map(createInventoryItem)}
        </ul>
    );

    function createInventoryItem(inventoryItem: Item) {
        const { id, price, name, img, style } = inventoryItem;
        const displayPrice = calculatePrice(price, currencyFilter);

        return (
            <li key={id} className='item'>
                <img src={img} alt={''}/>
                <h3 className='item-name'>{name}</h3>
                <h3 className='price'>
                    {getCurrencySymbol(currencyFilter)}
                    {displayPrice.toFixed(2)} {currencyFilter}
                </h3>
                <h4 className='style-text'>{style}</h4>
                <button
                    onClick={() => handleOnClick(inventoryItem)}
                    className='add-to-cart-button'
                >
                    Add to Cart
                </button>
            </li>
        );
    }
};

