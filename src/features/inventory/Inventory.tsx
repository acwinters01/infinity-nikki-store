import React, { useEffect } from 'react';
import { calculatePrice, getCurrencySymbol, getFilteredItems, Item } from '../../utilities/utilities';
import { styleLabels } from './data';
import { fetchInventory } from '../inventory/inventorySlice';
import { addItem } from '../cart/cartSlice';
import './inventory.css'



type InventoryProps = {
    inventory: Item[];    
    currencyFilter: string;  
    dispatch?: any;  
    searchTerm: string;
};


export const Inventory: React.FC<InventoryProps> = ({ inventory, currencyFilter, dispatch, searchTerm }) => {
    let isSoldOut = false;

    useEffect(() => {
        dispatch(fetchInventory())
    }, [dispatch])  

    const handleOnClick = (inventoryItem: Item) => {

        if (!isSoldOut) {
            dispatch(addItem(inventoryItem));
        } else {
            <div className='add-cart-sold-item'>
                <h4>Sorry this item is sold out. Come back later!
                </h4>
            </div>
        } 
    };

    if (inventory.length === 0) {
        return <p id="all-products-sold-label">Sorry we don't have anything to show just yet.</p>
    }

    const filteredItems = getFilteredItems(inventory, searchTerm);

    return (
        <ul id="inventory-container">
           {filteredItems.map(createInventoryItem)}
        </ul>
    );

    function createInventoryItem(inventoryItem: Item) {
        const { id, price, name, img, style, labels, quantity, type } = inventoryItem;
        const displayPrice = Number(calculatePrice(price, currencyFilter));
        //console.log("displayPrice:", displayPrice, typeof displayPrice);
        let priceContent;
        let styleImgUrl = '';

        if (quantity < 4 && quantity !== 0) {
            priceContent =  <div id="low-stock"> 
                                {quantity} left in stock, Buy Soon!
                            </div>; 
            isSoldOut = false;
            
        } else if (quantity === 0 ) {
            priceContent = <p id="sold-out">SOLD OUT!</p>
            isSoldOut = true;

        } else {
            isSoldOut = false;
        }

        if (style) {
            styleLabels.find((label) => label.name === style ? styleImgUrl = label.url : null)
        }
        return (
            <li key={id} className={`item`} id={`${isSoldOut ? 'sold' : null}`}>
                <h3 className='item-name'>{name}</h3>
                <div className='labels'>
                    <img id="style-tag" src={`${styleImgUrl}`} />
                    {labels.map((label, index) => label === "" ? null : <span key={index}>{label} </span>)}
                </div>
                <img id='item-image' src={img} alt={style}/>
                
                <h3 className='price'>
                    {priceContent}
                    {getCurrencySymbol(currencyFilter)} {displayPrice.toFixed(2)} {currencyFilter}
                     
                </h3>
                <p id="type-label">{type}</p>
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

