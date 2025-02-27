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
        return <p id="all-products-sold-label">Sorry we don't have anything to show just yet.</p>
    }

    const filteredItems = getFilteredItems(inventory, searchTerm);

    const randomizeItems = (inventory: Item[]) => {
        return [...inventory.sort(() => Math.random() - 0.5)]
    }

    return (
        <ul id="inventory-container">
           {randomizeItems(filteredItems).map(createInventoryItem)}
        </ul>
    );

    function createInventoryItem(inventoryItem: Item) {
        const { id, price, name, img, style, labels, quantity } = inventoryItem;
        const displayPrice = calculatePrice(price, currencyFilter);

        return (
            <li key={id} className='item'>
                <img src={img} alt={''}/>
                <h3 className='item-name'>{name}</h3>
                <div className='labels'>
                    <h4>{style}</h4>
                    <p>{labels.map(label => `${label} `)}</p>
                </div>
                <h3 className='price'>
                    {quantity > 0
                    ? `${getCurrencySymbol(currencyFilter)} ${displayPrice.toFixed(2)} ${currencyFilter}`
                    : <p id='sold-out'>SOLD OUT</p>}
                </h3>
                
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

