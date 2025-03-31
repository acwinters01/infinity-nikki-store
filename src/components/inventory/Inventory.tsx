import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LabelFilter from '../labelFilter/LabelFilter';
import { fetchInventory } from '../../reducers/inventorySlice';
import { addItem } from '../../reducers/cartSlice';
import { calculatePrice, getCurrencySymbol, getFilteredItems, 
    getFilteredLabels, Item, pricingItem, addCommas, styleLabels } from '../../utilities/utilities';
import { AppDispatch } from '../../store';
import '../../styles/inventory.css'


interface InventoryProps {
    inventory: Item[];        
    currencyFilter: string;  
    dispatch: AppDispatch;  
    searchTerm: string;
    selectedLabels: (string | number)[];
};


export const Inventory: React.FC<InventoryProps> = ({ inventory, currencyFilter, dispatch, searchTerm, selectedLabels }) => {
    
    let isSoldOut: boolean = false;
    useEffect(() => {
        dispatch(fetchInventory())
    }, [dispatch]);  

    if (inventory.length === 0) {
        return <p id="all-products-sold-label">Sorry we don't have anything to show just yet.</p>;
    };

    const filteredItems = getFilteredItems(inventory, searchTerm);
    let filteredItemsBySearch = getFilteredLabels(filteredItems, selectedLabels);

    /*
        console.log("FilteredItems: ", filteredItems)
        console.log('Selected Labels:',selectedLabels)
        console.log('Filtered Items By Search: ', filteredItemsBySearch)
        console.log('Total of Items: ', inventory.length);
        console.log('Total number of Filtered Items: ', filteredItemsBySearch.length)
    */

    return (
        <div className='inventory-wrap'>
            <div className='tabs-container'>
                <ul id='all-tabs'>
                    <li id="tab">
                        <Link to="/">Home</Link>
                    </li>
                    <li id="tab">
                        <Link to="/Outfits">Outfits</Link>
                    </li>
                    <li id="tab">
                        <Link to="/Makeup">Makeup</Link>
                    </li>
                    <li id="tab">
                        <Link to="/Eureka">Eureka</Link>
                    </li>
                </ul>
            </div>
            <div className='filter-inventory'>
                <LabelFilter
                    dispatch={dispatch}
                    inventory={inventory}
                />
                <ul id="inventory-container">
                    {filteredItemsBySearch.length !== 0 ? filteredItemsBySearch.map(createInventoryItem): filteredItems.map(createInventoryItem)}
                </ul>
            </div>
        </div>
    );

    function createInventoryItem(inventoryItem: Item) {

        const price = pricingItem(inventoryItem);
        const displayPrice = Number(calculatePrice(price, currencyFilter));
        // console.log(displayPrice)
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
            styleLabels.find((label) => {
                if (label.name === inventoryItem.style) {
                    styleImgUrl = label.url;
                    return true;
                }
                return false;
            })
        }

        console.log(inventoryItem.img)

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
                        {getCurrencySymbol(currencyFilter)} {addCommas(displayPrice)} {currencyFilter}
                        
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
    };

    function handleOnClick(inventoryItem: Item) {
        if (!isSoldOut) {
            dispatch(addItem(inventoryItem));
        } else {
            console.log('Item sold out: ', inventoryItem)
        } 
    };
};

export default Inventory;