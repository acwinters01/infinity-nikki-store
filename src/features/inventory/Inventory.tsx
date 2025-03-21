import React, { useEffect } from 'react';
import { fetchInventory } from '../inventory/inventorySlice';
import { addItem } from '../cart/cartSlice';
import { calculatePrice, getCurrencySymbol, getFilteredItems, Item } from '../../utilities/utilities';
import { styleLabels } from '../../utilities/utilities';
import './inventory.css'



interface InventoryProps {
    inventory: Item[];    
    currencyFilter: string;  
    dispatch?: any;  
    searchTerm: string;
};


export const Inventory: React.FC<InventoryProps> = ({ inventory, currencyFilter, dispatch, searchTerm }) => {
    let isSoldOut: boolean = false;
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
        const displayPrice = Number(calculatePrice(inventoryItem.price, currencyFilter));
        //console.log("displayPrice:", displayPrice, typeof displayPrice);
        let styleImgUrl: string = '';
        let priceContent: React.ReactNode = <p id="empty-space">{``}</p>;

        if (inventoryItem.stock < 4 && inventoryItem.stock !== 0) {
            priceContent =  <div id="low-stock"> 
                                {inventoryItem.stock} left in stock, Buy Soon!
                            </div>; 
            isSoldOut = false;
            
        } else if (inventoryItem.stock === 0 ) {
            priceContent = <p id="sold-out">SOLD OUT!</p>
            isSoldOut = true;

        } else {
            isSoldOut = false;

        }

        if (inventoryItem.style) {
            styleLabels.find((label) => label.name === inventoryItem.style ? styleImgUrl = label.url : null)
        }
        return (
            <li key={inventoryItem.id} className={`item`} id={`${isSoldOut ? 'sold' : null}`}>
                <div id="item-titling">
                    <h3 className='item-name'>{inventoryItem.name}</h3>
                    <div className='labels'>
                        <img id="style-tag" src={`${styleImgUrl}`} />
                        {inventoryItem.labels.map((label, index) => label === "" ? null : <span key={index}>{label} </span>)}
                    </div>
                    </div>
                <img id='item-image' src={inventoryItem.img} alt={inventoryItem.style}/>
                <div id="item-pricing-container">
                    <h3 className='price'>
                        {priceContent}
                        {getCurrencySymbol(currencyFilter)} {displayPrice.toFixed(2)} {currencyFilter}
                        
                    </h3>
                    <p id="type-label">{inventoryItem.type}</p>
                    <div className='add-to-cart-button-container'>
                        <button
                            onClick={() => handleOnClick(inventoryItem)}
                            id='add-to-cart-button'
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </li>
        );
    }
};

